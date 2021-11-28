const avro = require ('avsc');
module.exports =  avro.Type.forSchema({
  "fields": [
    {
      "name": "category",
      "type": {
        "name": "categoryType",
        "symbols": [
          "DOG",
          "CAT"
        ],
        "type": "enum"
      }
    },
    {
      "name": "noise",
      "type": "string"
    }
  ],
  "name": "animals",
  "type": "record"
});
