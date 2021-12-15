const { formatGQLSchema } = require('../testpkg/tools/buildGQLTool.js');

const mockParsedKafkaTrip = [
  [
    'Trip',
    { name: 'id', type: 'string' },
    { name: 'vehicleId', type: 'string' },
  ],
];

let gqlSchema1 = '';
beforeEach(() => {
  return (gqlSchema1 = formatGQLSchema(mockParsedKafkaTrip));
});

describe('converting to graphql schema', () => {
  describe('data type of the converted graphql schema', () => {
    test('datatype as array', () => {
      expect(typeof gqlSchema1).toBe('string');
    });
    test('schema begins with word type', () => {
      expect(gqlSchema1.slice(0, 4)).toStrictEqual('type');
    });
  });
  test('stringified schema result to equal expected', () => {
    expect(JSON.stringify(gqlSchema1)).toEqual(
      '"type Trip { \\n  id: String \\n  vehicleId: String \\n}\\n"'
    );
  });
});
