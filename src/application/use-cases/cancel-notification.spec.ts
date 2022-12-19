import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotificationFactory } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notitification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('CancelNotification', () => {
  it('Should be able to send notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotificationFactory();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
