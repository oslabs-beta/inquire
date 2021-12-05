export {};
let { initTopiQL, result } = require('../testpkg/startTopiQL');
const fs = require('fs');
const { tmpdir } = require('os');
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
      expect(fs.mkdirSync).toHaveBeenCalled();
    });

    test('can utilize input path', () => {
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

    // it('should save the config text in config.js', () => {
    //   const mockInitTopiQL = jest.fn() as jest.MockedFunction<
    //     typeof initTopiQL
    //   >;
    //   const tempFolderDir: string = tmpdir();
    //   console.log(tempFolderDir);
    //   console.log(`${tempFolderDir}/config.js`);

    //   mockInitTopiQL.mockImplementation(() => {
    //     fs.mkdirSync(tempFolderDir);
    //     fs.writeFileSync(`${tempFolderDir}/config.js`, result);
    //   });

    //   let da: string = fs.readFileSync(`/Users/yingliu/Desktop/123.txt`, {
    //     encoding: 'ASCII',
    //   });
    //   expect(da).toEqual('222');
    // });
  });
});
