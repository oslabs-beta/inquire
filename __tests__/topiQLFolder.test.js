const initTopiQL = require('../testpkg/startTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  return initTopiQL();
});

it('should create a new directory if one does not already exist', () => {
  fs.existsSync.mockReturnValue(false);
  expect(fs.mkdirSync).toHaveBeenCalled();
});

it('should create a file inside the directory', () => {
  fs.existsSync.mockReturnValue(false);
  expect(fs.writeFileSync).toHaveBeenCalled();
});
