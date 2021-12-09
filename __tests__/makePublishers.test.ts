export {};
const { writePublisher } = require('../testpkg/makeTopiQL');
const fs = require('fs');
jest.mock('fs');

beforeEach(() => {
  return jest.resetAllMocks();
});

describe('kafKaPublisher.js creation', () => {
  const publisherFileDir = (
    __dirname + 'server/topiQL/kafkaPublisher.js'
  ).replace('__tests__', '');
  test('can call the fs.writeFileSync function and create a new file', () => {
    fs.existsSync.mockReturnValue(false);
    writePublisher();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
