export {};
const modePrompt = jest.fn(() => {
  return Promise.resolve('1');
});
const dataPrompt = jest.fn(() => {
  return Promise.resolve('./__mocks__/mockUser');
});
const { initTopiQL } = require('../testpkg/startTopiQL');
const fs = require('fs');
const readline = require('readline');
jest.mock('fs');
jest.mock('readline');

// beforeEach(() => {
//   jest.resetAllMocks();
//   return initTopiQL();
// });

// xdescribe('initTopiQL process', () => {
//   const topiQLFolderDir = (__dirname + 'server/topiQL').replace(
//     '__tests__',
//     ''
//   );
//   xdescribe('initTopiQL folder generation', () => {
//     xtest('can call the fs.mkdirSync function and create a new directory', () => {
//       fs.existsSync.mockReturnValue(false);
//       expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
//     });

//     xtest('can utilize input path to make directory', () => {
//       fs.existsSync.mockReturnValue(false);
//       expect(fs.mkdirSync).toBeCalledWith(topiQLFolderDir);
//     });
//   });

//   xdescribe('config file generation', () => {
//     const configFileDir = (__dirname + 'server/topiQL/config.js').replace(
//       '__tests__',
//       ''
//     );

//     xtest('can call the fs.writeFileSync function and create a new file', () => {
//       fs.existsSync.mockReturnValue(false);
//       expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
//     });

//     xtest('can utilize provided path and content to create config file', () => {
//       fs.existsSync.mockReturnValue(false);
//       expect(fs.writeFileSync).toBeCalledWith(configFileDir, result);
//     });
//   });
// });

test('modePrompt and dataPrompt are called', () => {
  initTopiQL().then(() => {
    expect(modePrompt).toHaveBeenCalledTimes(1);
    expect(dataPrompt).toHaveBeenCalledTimes(1);
    expect(readline).toHaveBeenCalled();
  });
});
