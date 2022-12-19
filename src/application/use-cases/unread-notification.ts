import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    notificationData: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = notificationData;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
