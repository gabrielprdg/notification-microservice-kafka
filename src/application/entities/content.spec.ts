import { Content } from './content';

describe('ContentModel', () => {
  it('Should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma notificação de desafio!');
    expect(content).toBeTruthy();
  });

  it('Should throws if content is less than 5 characters', () => {
    expect(() => new Content('Voc')).toThrow();
  });

  it('Should throws if content is more than 200 characters', () => {
    expect(() => new Content('V'.repeat(300))).toThrow();
  });
});
