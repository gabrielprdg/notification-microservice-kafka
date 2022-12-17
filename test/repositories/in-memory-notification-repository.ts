import { NotificationRepository } from 'src/application/protocols/db/notification/notifications-repository';
import { Notification } from '../../src/application/entities/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
