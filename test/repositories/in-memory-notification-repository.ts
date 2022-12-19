import { NotificationRepository } from '@application/protocols/db/notification/notifications-repository';
import { Notification } from '@application/entities/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.filter(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }
    return notification[0];
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications;
  }
}
