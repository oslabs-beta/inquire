interface Position {
  lat: number;
  lon: number;
}

interface TripInfo {
  statusId: string;
  tripId: string;
  vehicleId: string;
  position: Position;
  batteryLevel: number;
  distance: number;
  timestamp: string;
}

interface PassengerInfo {
  name: string;
  street: string;
}

interface KafkaSettings {
  topics: string[];
  clientId: string;
  brokers: string[];
  ssl: boolean;
  sasl: SASLSetting | null;
  connectionTimeout: number;
  authenticationTimeout: number;
  reauthenticationThreshold: number;
}

interface SASLSetting {
  username: string;
  password: string;
  mechanism: string;
}

