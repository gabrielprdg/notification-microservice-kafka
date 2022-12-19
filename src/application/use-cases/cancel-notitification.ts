import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    notificationData: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = notificationData;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    console.log(notification);
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    console.log('d', notification);

    await this.notificationRepository.save(notification);
  }
}
