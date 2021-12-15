export {};
const { toGraphQL, writeGraphQLSchema } = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

// beforeEach(async () => {
//   jest.resetAllMocks();
//   return await writeGraphQLSchema();
// });

xdescribe('typeDefs.js creation', () => {
  const typeDefsFileDir = (__dirname + 'server/topiQL/typeDefs.js').replace(
    '__tests__',
    ''
  );
  xtest('can call the readdir function', () => {
    expect(fs.readdirSync).toHaveBeenCalled();
  });

  xtest('can call the writeFile function and create a new file', () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
