import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('SendNotification', () => {
  it('Should be able to send notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'any_content',
      category: 'any_category',
      recipientId: 'any_recipient_id',
    });
    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
