import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InvalidPayloadException } from '../common/exceptions/gridpulse.exception';
import { NotificationChannel, NotificationPreview, NotificationRoute } from './dto/notification.dto';

const CHANNELS: NotificationChannel[] = ['email', 'sms', 'webhook'];
const SEVERITY_SCORE = { low: 1, medium: 2, high: 3 };

@Injectable()
export class NotificationsService {
  private readonly routes = new Map<string, NotificationRoute>();

  createRoute(body: any): NotificationRoute {
    const channel = body?.channel as NotificationChannel;
    const minSeverity = body?.minSeverity ?? 'medium';
    if (!body?.name || !CHANNELS.includes(channel) || !body?.target || !(minSeverity in SEVERITY_SCORE)) {
      throw new InvalidPayloadException('Notification route requires name, channel, target, and supported minSeverity');
    }
    const route: NotificationRoute = {
      id: randomUUID(),
      name: String(body.name),
      channel,
      target: String(body.target),
      minSeverity,
      enabled: body.enabled !== false,
      createdAt: new Date(),
    };
    this.routes.set(route.id, route);
    return route;
  }

  listRoutes(): NotificationRoute[] {
    return [...this.routes.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  preview(body: any): NotificationPreview[] {
    const severity = body?.severity ?? 'medium';
    if (!(severity in SEVERITY_SCORE) || !body?.title || !body?.message) {
      throw new InvalidPayloadException('Notification preview requires severity, title, and message');
    }
    return this.listRoutes().map((route) => ({
      routeId: route.id,
      channel: route.channel,
      target: route.target,
      subject: `[GridPulse] ${body.title}`,
      body: `${body.message}\n\nSeverity: ${severity}\nRoute: ${route.name}`,
      wouldSend: route.enabled && SEVERITY_SCORE[severity] >= SEVERITY_SCORE[route.minSeverity],
    }));
  }
}
