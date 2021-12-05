let { initTopiQL, result } = require('../testpkg/startTopiQL');
const fs = require('fs');
const { tmpdir } = require('os');
jest.mock('fs');

beforeEach(() => {
  jest.resetAllMocks();
  return initTopiQL();
});

describe('initTopiQL process succeeds', () => {
  const topiQLFolderDir = (__dirname + 'server/topiQL').replace(
    '__tests__',
    ''
  );
  describe('initTopiQL folder generation', () => {
    it('should call the fs.mkdirSync function and create a new directory if one does not already exist', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    });

    it('should be utilize the directory .server/topiQL', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.mkdirSync).toBeCalledWith(topiQLFolderDir);
    });
  });

  describe('config file generation', () => {
    const configFileDir = (__dirname + 'server/topiQL/config.js').replace(
      '__tests__',
      ''
    );

    it('should call fs.writeFileSync to create a file inside the directory', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it('should utilize the topiQL folder directory to create the file called config.js', () => {
      fs.existsSync.mockReturnValue(false);
      expect(fs.writeFileSync).toBeCalledWith(configFileDir, result);
    });
  });
});
