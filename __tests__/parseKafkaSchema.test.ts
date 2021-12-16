const { parseKafkaSchema } = require('../testpkg/tools/buildGQLTool.js');

const mockTripData = `{
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

let parsedAvroSchema = '';

beforeEach(() => {
  return (parsedAvroSchema = parseKafkaSchema(mockTripData));
});

describe('parsing avro schema', () => {
  describe('data type of the parsed avro schema', () => {
    test('datatype as array', () => {
      expect(Array.isArray(parsedAvroSchema)).toBeTruthy;
    });
    test('datatype has a length of 3', () => {
      expect(parsedAvroSchema[0].length).toBe(3);
    });
  });
  describe('topic name and fields', () => {
    test('topic name is Trip', () => {
      expect(parsedAvroSchema[0][0]).toEqual('Trip');
    });
    test('type of topic field 1 results in an object', () => {
      expect(typeof parsedAvroSchema[0][1]).toBe('object');
    });
    test('type of topic field 1 has a key id', () => {
      expect(parsedAvroSchema[0][1]).toStrictEqual({
        name: 'id',
        type: 'string',
      });
    });
    test('type of topic field 2 results in an object', () => {
      expect(typeof parsedAvroSchema[0][2]).toBe('object');
    });
    test('type of topic field 2 has a key vehicleId', () => {
      expect(parsedAvroSchema[0][2]).toStrictEqual({
        name: 'vehicleId',
        type: 'string',
      });
    });
  });
});
