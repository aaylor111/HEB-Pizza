import { BadRequestError } from './bad-request-error';

describe('BadRequestError', () => {
  it('should create an instance', () => {
    expect(new BadRequestError()).toBeTruthy();
  });
});
