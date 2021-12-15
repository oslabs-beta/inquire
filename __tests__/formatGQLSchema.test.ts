const { formatGQLSchema } = require('../testpkg/tools/buildGQLTool.js');

const mockParsedKafkaTrip = [
  [
    'Trip',
    { name: 'id', type: 'string' },
    { name: 'vehicleId', type: 'string' },
  ],
];

console.log(formatGQLSchema(mockParsedKafkaTrip));

let gqlSchema1 = '';
beforeEach(() => {
  return (gqlSchema1 = formatGQLSchema(mockParsedKafkaTrip));
});

describe('converting to graphql schema', () => {
  describe('data type of the converted graphql schema', () => {
    test('datatype as array', () => {
      expect(typeof gqlSchema1).toBe('string');
    });
    test('it begins with word type', () => {
      expect(gqlSchema1.slice(0, 4)).toStrictEqual('type');
    });
  });
});
