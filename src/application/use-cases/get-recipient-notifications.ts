import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

type GetRecipientNotificationResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotifications {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    notificationData: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = notificationData;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
