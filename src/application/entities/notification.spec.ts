import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('Should create a notification', () => {
    const notification = new Notification({
      recipientId: 'any_recipient_id',
      content: new Content('any_content'),
      category: 'any_category',
    });

    expect(notification).toBeTruthy();
  });
});
