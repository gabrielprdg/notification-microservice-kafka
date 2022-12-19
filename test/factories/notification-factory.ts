import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationModel,
} from '@application/entities/notification';

type Override = Partial<NotificationModel>;

export const makeNotificationFactory = (override: Override = {}) => {
  return new Notification({
    recipientId: 'any_recipient',
    content: new Content('any_content'),
    category: 'social',
    ...override,
  });
};
