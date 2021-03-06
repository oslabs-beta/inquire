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

interface KafkaSettingsCloud {
  topics: string[];
  clientId: string;
  brokers: (string | undefined)[];
  ssl: boolean;
  sasl: SASLSetting | null;
  connectionTimeout: number;
  authenticationTimeout: number;
  reauthenticationThreshold: number;
}

interface KafkaSettingsDocker {
  topics: string[];
  clientId: string;
  brokers: (string | undefined)[];
  connectionTimeout: number;
  authenticationTimeout: number;
  reauthenticationThreshold: number;
}

interface SASLSetting {
  username: string;
  password: string;
  mechanism: string;
}

