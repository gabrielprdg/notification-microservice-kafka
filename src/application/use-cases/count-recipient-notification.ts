import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

type CountRecipientNotificationResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    notificationData: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = notificationData;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
