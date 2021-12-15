export {};
const { writeResolver } = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  writeResolver();
  return jest.resetAllMocks();
});

xdescribe('resolvers.js creation', () => {
  const resolversFileDir = (__dirname + 'server/topiQL/resolvers').replace(
    '__tests__',
    ''
  );
  xtest('can call the fs.writeFileSync function and create a new file', () => {
    fs.existsSync.mockReturnValue(false);

    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
