import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      read_at: notification.readAt,
      created_at: notification.createdAt,
      canceled_at: notification.canceledAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.read_at,
        canceledAt: raw.canceled_at,
        createdAt: raw.created_at,
      },
      raw.id,
    );
  }

  static toArrayDomain(raw: RawNotification[]): Notification[] {
    const notifications = raw.map(
      (notification) =>
        new Notification(
          {
            category: notification.category,
            content: new Content(notification.content),
            recipientId: notification.recipientId,
            readAt: notification.read_at,
            canceledAt: notification.canceled_at,
            createdAt: notification.created_at,
          },
          notification.id,
        ),
    );

    return notifications;
  }
}
