export {};
let { initTopiQL, result } = require('../testpkg/startTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  jest.resetAllMocks();
  return initTopiQL();
});

describe('initTopiQL process', () => {
  const topiQLFolderDir = (__dirname + 'server/topiQL').replace(
    '__tests__',
    ''
  );
  describe('initTopiQL folder generation', () => {
    test('can call the fs.mkdirSync function and create a new directory', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    });

    test('can utilize input path to make directory', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.mkdirSync).toBeCalledWith(topiQLFolderDir);
    });
  });

  describe('config file generation', () => {
    const configFileDir = (__dirname + 'server/topiQL/config.js').replace(
      '__tests__',
      ''
    );

    test('can call the fs.writeFileSync function and create a new file', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    test('can utilize provided path and content to create config file', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.writeFileSync).toBeCalledWith(configFileDir, result);
    });
  });
});
