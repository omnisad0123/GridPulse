export class GridPulseException extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly code: string,
    readonly details: Record<string, unknown> = {},
  ) {
    super(message);
  }
}

export class InvalidPayloadException extends GridPulseException {
  constructor(message: string, details: Record<string, unknown> = {}) {
    super(message, 400, 'INVALID_PAYLOAD', details);
  }
}

export class EntityNotFoundException extends GridPulseException {
  constructor(entity: string, id: string) {
    super(`${entity} not found`, 404, 'ENTITY_NOT_FOUND', { entity, id });
  }
}

export class RateLimitException extends GridPulseException {
  constructor(entityType: string, entityId: string, limit: number) {
    super(`Rate limit exceeded for ${entityType} ${entityId}`, 429, 'RATE_LIMIT_EXCEEDED', {
      entityType,
      entityId,
      limit,
      windowSeconds: 60,
    });
  }
}
