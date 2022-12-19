import { makeNotificationFactory } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notitification';
import { CountRecipientNotifications } from './count-recipient-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('CountRecipientNotification', () => {
  it('Should be able to count notifications by recipientId', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotificationFactory({ recipientId: 'any_recipient' }),
    );

    await notificationRepository.create(
      makeNotificationFactory({ recipientId: 'any_recipient' }),
    );

    await notificationRepository.create(
      makeNotificationFactory({ recipientId: 'other_recipient' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'any_recipient',
    });

    expect(count).toBe(2);
  });
});
