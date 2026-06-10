export type NotificationChannel = 'email' | 'sms' | 'webhook';

export interface NotificationRoute {
  id: string;
  name: string;
  channel: NotificationChannel;
  target: string;
  minSeverity: 'low' | 'medium' | 'high';
  enabled: boolean;
  createdAt: Date;
}

export interface NotificationPreview {
  routeId: string;
  channel: NotificationChannel;
  target: string;
  subject: string;
  body: string;
  wouldSend: boolean;
}
