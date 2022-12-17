import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from './http/dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
  }
}
