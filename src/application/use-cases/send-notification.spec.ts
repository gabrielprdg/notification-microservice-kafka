import { Content } from '../entities/content';
import { Notification, NotificationModel } from '../entities/notification';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';
import { SendNotification } from './send-notification';
import mockdate from 'mockdate';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';

const mockNotificationRepository = () => {
  class NotificationRepositoryStub implements NotificationRepository {
    async create(notification: Notification): Promise<void> {
      return Promise.resolve();
    }
  }

  return new NotificationRepositoryStub();
};

export const mockNotificationParams = (): any => ({
  props: {
    content: new Content('any_content'),
    category: 'any_category',
    recipientId: 'any_recipient_id',
    createdAt: new Date(),
  },
});

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
  beforeAll(() => {
    mockdate.set(new Date());
  });

  afterAll(() => {
    mockdate.reset();
  });
  it('Should call Notification Repository with correct values', async () => {
    const { sut, notificationRepositoryStub } = makeSut();
    const notificationSpy = jest.spyOn(notificationRepositoryStub, 'create');
    await sut.execute({
      content: 'any_content',
      category: 'any_category',
      recipientId: 'any_recipient_id',
    });

    expect(notificationSpy).toHaveBeenCalledWith(mockNotificationParams());
  });

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
