import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/protocols/db/notification/notifications-repository';
import { PrismaService } from '../../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        read_at: notification.readAt,
        created_at: notification.createdAt,
      },
    });
  }
}
