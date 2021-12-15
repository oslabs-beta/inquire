"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GENERATE TRIP STATUS
function queueTripInfo() {
    const tripId = getRandomTripId();
    const statusId = getStatusId(tripId);
    const vehicleId = getVehicleId(tripId);
    const position = getPosition();
    const batteryLevel = batteryFunc(tripId);
    const distance = distanceFunc(tripId);
    const now = new Date();
    const timestamp = now.toString();
    const tripInfo = {
        statusId,
        tripId,
        vehicleId,
        position,
        batteryLevel,
        distance,
        timestamp,
    };
    return tripInfo;
}
function getStatusId(tripId) {
    if (tripId === 'trip1')
        return 'status1';
    if (tripId === 'trip2')
        return 'status2';
    else
        return 'noStatusId';
}
function getRandomTripId() {
    const trips = ['trip1', 'trip2'];
    return trips[Math.floor(Math.random() * trips.length)];
}
function getVehicleId(tripId) {
    if (tripId === 'trip1')
        return 'car1';
    if (tripId === 'trip2')
        return 'car2';
    else
        return 'noTripId';
}
function getPosition() {
    const lat = 40 + Math.random();
    const lon = -(70 + Math.random());
    const position = {
        lat: lat,
        lon: lon,
    };
    return position;
}
function getBattery() {
    const cache = {};
    function innerFunc(tripId) {
        if (cache[tripId]) {
            cache[tripId] = cache[tripId] - 1;
            return cache[tripId];
        }
        else {
            cache[tripId] = Math.floor(Math.random() * 10) + 85;
            return cache[tripId];
        }
    }
    ;
    return innerFunc;
}
const batteryFunc = getBattery();
function getDistance() {
    const cache = {};
    function innerFunc(tripId) {
        if (cache[tripId]) {
            cache[tripId] = cache[tripId] + Math.floor(Math.random() * 10);
            return cache[tripId];
        }
        else {
            cache[tripId] = Math.floor(Math.random() * 10);
            return cache[tripId];
        }
    }
    ;
    return innerFunc;
}
const distanceFunc = getDistance();
// GENERATE PASSENGER INFO
function passengerInfo() {
    const name = getRandomPassenger();
    const street = getPassengerAddress(name);
    const passengerInfo = {
        name,
        street,
    };
    return passengerInfo;
}
const passengerNames = [
    "Carla",
    "Joseph",
    "Megan",
    "Roland",
    "Stacey",
    "Maria",
    "Henry",
    "Peter"
];
const addressBook = {
    "Carla": "CherryLane",
    "Joseph": "FifthAvenue",
    "Megan": "FourteenthStreet",
    "Roland": "PerlmanRoad",
    "Stacey": "BroadStreet",
    "Maria": "SecondAvenue",
    "Henry": "BleekerStreet",
    "Peter": "LexingtonAvenue"
};
function getRandomPassenger() {
    const index = Math.floor(Math.random() * 8);
    return passengerNames[index];
}
function getPassengerAddress(name) {
    return addressBook[name];
}
module.exports = { queueTripInfo, passengerInfo };
