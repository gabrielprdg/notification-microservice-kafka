import { Module } from '@nestjs/common';
import { NotificationRepository } from '@application/protocols/db/notification/notifications-repository';
import { PrismaService } from './prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
