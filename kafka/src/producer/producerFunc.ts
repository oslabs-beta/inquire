export {}; // This line of code prevents TS error 'Cannot redeclare block-scoped variable' in unrelated files

// GENERATE TRIP STATUS
function queueTripInfo() : TripInfo {
  const tripId : string = getRandomTripId();
  const statusId : string = getStatusId(tripId);
  const vehicleId : string = getVehicleId(tripId);
  const position : Position = getPosition();
  const batteryLevel : number = batteryFunc(tripId);
  const distance : number = distanceFunc(tripId);
  const now : Date = new Date();
  const timestamp : string = now.toString();

  const tripInfo : TripInfo = {
    statusId,
    tripId,
    vehicleId,
    position,
    batteryLevel,
    distance,
    timestamp,
  }

  return tripInfo;
}

function getStatusId(tripId : string) : string {
  if (tripId === 'trip1') return 'status1';
  if (tripId === 'trip2') return 'status2';
  else return 'noStatusId'
}

function getRandomTripId() : string {
  const trips = ['trip1', 'trip2'];
  return trips[Math.floor(Math.random() * trips.length)];
}

function getVehicleId(tripId : string) : string {
  if (tripId === 'trip1') return 'car1';
  if (tripId === 'trip2') return 'car2';
  else return 'noTripId'
}

function getPosition() : Position {
  const lat = 40 + Math.random();
  const lon = -(70 + Math.random());
  const position : Position = {
    lat: lat,
    lon: lon,
  }
  return position;
}


function getBattery() : Function {
  const cache : {[key : string] : number} = {};
  function innerFunc(tripId : string) {
    if (cache[tripId]) {
      cache[tripId] = cache[tripId] - 1;
      return cache[tripId];
    } else {
      cache[tripId] = Math.floor(Math.random() * 10) + 85;
      return cache[tripId];
    }
  };
  return innerFunc
}
const batteryFunc = getBattery();

function getDistance() : Function {
  const cache : {[key : string] : number} = {};
  function innerFunc(tripId : string) {
    if (cache[tripId]) {
      cache[tripId] = cache[tripId] + Math.floor(Math.random() * 10);
      return cache[tripId];
    } else {
      cache[tripId] = Math.floor(Math.random() * 10);
      return cache[tripId];
    }
  };
  return innerFunc;
}
const distanceFunc = getDistance();

// GENERATE PASSENGER INFO
function passengerInfo() : PassengerInfo {
  const name : string = getRandomPassenger();
  const street : string = getPassengerAddress(name);

  const passengerInfo : PassengerInfo = {
    name,
    street,
  }
  return passengerInfo;
}

const passengerNames : string[] = [
  "Carla",
  "Joseph",
  "Megan",
  "Roland",
  "Stacey",
  "Maria",
  "Henry",
  "Peter"
]

const addressBook : {[key: string] : string} = {
  "Carla": "CherryLane",
  "Joseph" : "FifthAvenue",
  "Megan" : "FourteenthStreet",
  "Roland" : "PerlmanRoad",
  "Stacey" : "BroadStreet",
  "Maria" : "SecondAvenue",
  "Henry" : "BleekerStreet",
  "Peter" : "LexingtonAvenue"
}

function getRandomPassenger() : string {
  const index = Math.floor(Math.random() * 8)
  return passengerNames[index];
}
function getPassengerAddress(name : string) : string {
  return addressBook[name];
}

module.exports = { queueTripInfo, passengerInfo };
