import { Invoice } from './invoice.model';

describe('Order', () => {
  it('should create an instance', () => {
    expect(new Invoice()).toBeTruthy();
  });
});
