import { Module } from '@nestjs/common';
import { NotificationsController } from '../notifications.controller';

@Module({
  imports: [],
  controllers: [NotificationsController],
})
export class HttpModule {}
