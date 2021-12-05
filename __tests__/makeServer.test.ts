export {};
const { makeServer } = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  return jest.resetAllMocks();
});

describe('server.js creation', () => {
  const serverFileDir = (__dirname + 'server/server.js').replace(
    '__tests__',
    ''
  );
  test('can call fs.writeFileSync function and create a new file', () => {
    fs.existsSync.mockReturnValue(false);
    makeServer();
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
