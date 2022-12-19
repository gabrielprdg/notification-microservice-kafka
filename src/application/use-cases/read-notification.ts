import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../protocols/db/notification/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    notificationData: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = notificationData;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
