import { SendNotification } from '@application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type SendNotificationsPayload = {
  content: string;
  category: string;
  recipientId: string;
};

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { content, category, recipientId }: SendNotificationsPayload,
  ) {
    await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
  }
}
