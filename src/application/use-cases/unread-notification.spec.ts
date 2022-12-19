import { makeNotificationFactory } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notitification';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('UnreadNotification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotificationFactory({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('Should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
