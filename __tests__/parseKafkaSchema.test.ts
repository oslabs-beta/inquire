const { parseKafkaSchema } = require('../testpkg/tools/graphqlSchemaTool.js');

const mockTripData1 = `{
  "type": "record",
  "name": "Trip",
  "fields": [
    {
      "name": "id",
      "type": "string"
    },
    {
      "name": "vehicleId",
      "type": "string"
    }
  ]
}`;

console.log(parseKafkaSchema(mockTripData1));

let parsedAvroSchema1 = '';

beforeEach(() => {
  return (parsedAvroSchema1 = parseKafkaSchema(mockTripData1));
});

describe('parsing avro schema', () => {
  describe('parsed data object type', () => {
    test('datatype as array', () => {
      expect(Array.isArray(parsedAvroSchema1)).toBeTruthy;
    });
  });
});
