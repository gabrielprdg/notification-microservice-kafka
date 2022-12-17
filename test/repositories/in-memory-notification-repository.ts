import { NotificationRepository } from '@application/protocols/db/notification/notifications-repository';
import { Notification } from '@application/entities/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
