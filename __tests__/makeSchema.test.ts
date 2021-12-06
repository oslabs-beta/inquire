export {};
const { toGraphQL, writeSchemaFile } = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  return jest.resetAllMocks();
});

describe('typeDefs.js creation', () => {
  const typeDefsFileDir = (__dirname + 'server/topiQL/typeDefs.js').replace(
    '__tests__',
    ''
  );
  test('can call the readFile function and create a new file', async () => {
    const data = await toGraphQL();
    expect(fs.readFile).toHaveBeenCalledTimes(1);
  });

  test('can call the writeFile function and create a new file', () => {
    writeSchemaFile();
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });

  it('should 1', () => {
    const add = (a: number, b: number) => a + b;
    const mockAdd = jest.fn() as jest.MockedFunction<typeof add>;
    mockAdd.mockImplementation((a: number, b: number) => a + b);
    expect(mockAdd(2, 3)).toBe(5);
  });
});
