"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avro = require('avsc');
module.exports = avro.Type.forSchema({
    "type": "record",
    "name": "Passenger",
    "fields": [
        {
            "name": "name",
            "type": { "type": "enum", "name": "nameType", "symbols": [
                    "Carla",
                    "Joseph",
                    "Megan",
                    "Roland",
                    "Stacey",
                    "Maria",
                    "Henry",
                    "Peter"
                ] }
        },
        {
            "name": "street",
            "type": { "type": "enum", "name": "emailType", "symbols": [
                    "CherryLane",
                    "FifthAvenue",
                    "FourteenthStreet",
                    "PerlmanRoad",
                    "BroadStreet",
                    "SecondAvenue",
                    "BleekerStreet",
                    "LexingtonAvenue"
                ] }
        }
    ]
});
