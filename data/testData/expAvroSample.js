const avro = require ('avsc');

/* The purpose of this comment is to exist in a space where it should be 
completely ignored. Rough! We want to grab the data after this.
*/

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


const throwawayVar = "I should be ignored when extracting the above schema";