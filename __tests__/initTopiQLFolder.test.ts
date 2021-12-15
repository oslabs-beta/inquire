export {};
const modePrompt = jest.fn(() => {
  return Promise.resolve('1');
});
const dataPrompt = jest.fn(() => {
  return Promise.resolve('./__mocks__/mockUser');
});
const { initInquire } = require('../testpkg/startInquire');
const fs = require('fs');
const readline = require('readline');
jest.mock('fs');
jest.mock('readline');

beforeEach(() => {
  return jest.resetAllMocks();
});
describe('startInquire process', () => {
  test('modePrompt and dataPrompt are called', () => {
    initInquire().then(() => {
      expect(modePrompt).toHaveBeenCalledTimes(1);
      expect(dataPrompt).toHaveBeenCalledTimes(1);
    });
  });
});
