"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avro = require('avsc');
module.exports = avro.Type.forSchema({
    type: 'record',
    name: 'Status',
    fields: [
        {
            name: 'statusId',
            type: 'string',
        },
        {
            name: 'tripId',
            type: { type: 'enum', symbols: ['trip1', 'trip2'] },
        },
        {
            name: 'vehicleId',
            type: { type: 'enum', symbols: ['car1', 'car2'] },
        },
        {
            name: 'position',
            type: {
                type: 'record',
                name: 'Position',
                fields: [
                    {
                        name: 'lat',
                        type: 'float',
                    },
                    {
                        name: 'lon',
                        type: 'float',
                    },
                ],
            },
        },
        {
            name: 'batteryLevel',
            type: 'int',
        },
        {
            name: 'distance',
            type: 'int',
        },
        {
            name: 'timestamp',
            type: 'string',
        },
    ],
});
