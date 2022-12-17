import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';
import { SendNotification } from './send-notification';

const mockNotificationRepository = () => {
  class NotificationRepositoryStub implements NotificationRepository {
    async create(notification: Notification): Promise<void> {
      return Promise.resolve();
    }
  }

  return new NotificationRepositoryStub();
};

//sut -> System Under Test
type SutTypes = {
  sut: SendNotification;
  notificationRepositoryStub: NotificationRepository;
};

const makeSut = (): SutTypes => {
  const notificationRepositoryStub = mockNotificationRepository();
  const sut = new SendNotification(notificationRepositoryStub);

  return {
    notificationRepositoryStub,
    sut,
  };
};

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
