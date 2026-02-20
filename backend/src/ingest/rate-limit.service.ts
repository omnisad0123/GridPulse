import { Injectable } from '@nestjs/common';
import { RateLimitException } from '../common/exceptions/gridpulse.exception';

interface Bucket {
  count: number;
  resetAt: number;
}

@Injectable()
export class RateLimitService {
  private readonly buckets = new Map<string, Bucket>();
  private nowProvider = () => Date.now();

  assertAllowed(entityType: 'meter' | 'vehicle', entityId: string, limit = 60) {
    const now = this.nowProvider();
    this.cleanup(now);
    const key = `${entityType}:${entityId}`;
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + 60_000 });
      return;
    }
    if (bucket.count >= limit) {
      throw new RateLimitException(entityType, entityId, limit);
    }
    bucket.count += 1;
  }

  reset() {
    this.buckets.clear();
    this.nowProvider = () => Date.now();
  }

  setNowProvider(provider: () => number) {
    this.nowProvider = provider;
  }

  private cleanup(now: number) {
    for (const [key, bucket] of this.buckets.entries()) {
      if (bucket.resetAt <= now) {
        this.buckets.delete(key);
      }
    }
  }
}
