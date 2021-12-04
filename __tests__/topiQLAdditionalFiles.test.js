const {
  toGraphQL,
  makeResolvers,
  makePublishers,
  makeServer,
} = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

test('can generate a resolver file inside the directory', () => {
  fs.existsSync.mockReturnValue(false);
  makeResolvers();
  expect(fs.writeFileSync).toHaveBeenCalled();
});

test('can generate a publisher file inside the directory', () => {
  fs.existsSync.mockReturnValue(false);
  makePublishers();
  expect(fs.writeFileSync).toHaveBeenCalled();
});

test('can generate a server file inside the directory', () => {
  fs.existsSync.mockReturnValue(false);
  makeServer();
  expect(fs.writeFileSync).toHaveBeenCalled();
});
