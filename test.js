import 'babel-polyfill'
import { expect } from 'chai'

import { validPhn } from './lib/index'

describe('validPhn', () => {
  [
    ['abcde1234', false],
    ['0001234567891', false],
    ['1234567891', false],
    [1234567891, false],
    [9999999999, false],
    [9123947242, false],
    ['0009123947241', true],
    ['9123947241', true],
    [9123947241, true],
  ].forEach((assertion) => {
    it(`should be ${assertion[1]} for ${assertion[0]}`, () => {
      expect(validPhn(assertion[0])).to.equal(assertion[1]);
    });
  })
});
