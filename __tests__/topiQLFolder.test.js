const initTopiQL = require('../testpkg/startTopiQL');
const fs = require('fs');

jest.mock('fs');

it('should create a new topiQL directory if one does not already exist', () => {
  fs.existsSync.mockReturnValue(false);
  initTopiQL();
  expect(fs.mkdirSync).toHaveBeenCalled();
});
