const distanceFunc = getDistance();
const batteryFunc = getBattery();

function queueTripInfo() {
  const tripId = getRandomTripId();
  const statusId = getStatusId(tripId);
  const vehicleId = getVehicleId(tripId);
  const distance = distanceFunc(tripId);
  const batteryLevel = batteryFunc(tripId);
  const position = getPosition();
  const now = new Date();
  const timestamp = now.toString();

  return {
    statusId,
    tripId,
    vehicleId,
    position,
    batteryLevel,
    distance,
    timestamp,
  };
}

function getStatusId(tripId) {
  if (tripId === 'trip1') return 'status1';
  if (tripId === 'trip2') return 'status2';
}

function getPosition() {
  const lat = 40 + Math.random();
  const lon = -(70 + Math.random());
  return {
    lat: lat,
    lon: lon,
  };
}

function getRandomTripId() {
  const trips = ['trip1', 'trip2'];
  return trips[Math.floor(Math.random() * trips.length)];
}

function getVehicleId(tripId) {
  if (tripId === 'trip1') return 'car1';
  if (tripId === 'trip2') return 'car2';
}

function getDistance() {
  const cache = {};
  return function innerFunc(tripId) {
    if (cache[tripId]) {
      cache[tripId] = cache[tripId] + Math.floor(Math.random() * 10);
      return cache[tripId];
    } else {
      cache[tripId] = Math.floor(Math.random() * 10);
      return cache[tripId];
    }
  };
}

function getBattery() {
  const cache = {};
  return function innerFunc(tripId) {
    if (cache[tripId]) {
      cache[tripId] = cache[tripId] - 1;
      return cache[tripId];
    } else {
      cache[tripId] = Math.floor(Math.random() * 10) + 85;
      return cache[tripId];
    }
  };
}

module.exports = queueTripInfo;
