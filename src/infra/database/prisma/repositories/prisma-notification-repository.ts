import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from '../../../../../src/application/protocols/db/notification/notifications-repository';
import { PrismaService } from '../../prisma.service';

export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        content: notification.content,
        category: notification.category,
        recipientId: notification.recipientId,
        read_at: notification.readAt,
        created_at: notification.createdAt,
      },
    });
  }
}
