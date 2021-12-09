export {};
const { writeResolver } = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  return jest.resetAllMocks();
});

describe('resolvers.js creation', () => {
  const resolversFileDir = (__dirname + 'server/topiQL/resolvers').replace(
    '__tests__',
    ''
  );
  test('can call the fs.writeFileSync function and create a new file', () => {
    fs.existsSync.mockReturnValue(false);
    writeResolver();
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
