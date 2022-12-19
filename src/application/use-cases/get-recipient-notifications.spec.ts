import { makeNotificationFactory } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('GetRecipientNotification', () => {
  it('Should be able to get notifications by recipientId', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'any_recipient',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'any_recipient' }),
        expect.objectContaining({ recipientId: 'any_recipient' }),
      ]),
    );
  });
});
