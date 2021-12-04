"use strict";
// Confluent Cloud Login Page: https://login.confluent.io/login?state=hKFo2SBzNVlTbkRMcVJoWnQxdWZHMmVaOXJLdkYyUzFZME5kTqFupWxvZ2luo3RpZNkgRGpBT1JBeENHMS1tZFpEWEdyY0JfMC1DZmVDNk0xcGSjY2lk2SBsMmhPcDBTMHRrU0IwVEZ0dklZZlpaOUVhS0Z2clNjNg&client=l2hOp0S0tkSB0TFtvIYfZZ9EaKFvrSc6&protocol=oauth2&response_type=id_token&redirect_uri=https%3A%2F%2Fconfluent.cloud%2Fauth_callback&redirect_path=%2Fenvironments%2Fenv-mdv6q%2Fclusters%2Flkc-7361o%2Ftopics%2Ftest%2Fschema%2Fkey&nonce=HG1XtM4rEn3v7IFzNL9XNVvrh6Pt0jsS&scope=openid%20profile%20email&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xNi4yIn0%3D
Object.defineProperty(exports, "__esModule", { value: true });
const username = 'JUJA6GJGJCDSUYOP';
// const username = 'ZZIPDXVO5AF4CG2D' // New Key Backup
const password = '1XIN/fry4johm7kHhZ+n88jeKc11xJR3G07QXzfRmtnKA/f+s7mcbdkdvRIi/ixc';
// const password = 'DDLPn6mQ+/pEmM9jdWprSHoeyEa3KwLOVc7dYcQcLxBU/4N0qvSihyhw9hzcjC8F' // New Key Backup
const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
const ssl = !!sasl;
const kafkaSettings = {
    topics: ['tripStatus', 'passengerInfo'],
    clientId: 'kafQL',
    brokers: ['pkc-lzvrd.us-west4.gcp.confluent.cloud:9092'],
    ssl,
    sasl,
    connectionTimeout: 3000,
    authenticationTimeout: 1000,
    reauthenticationThreshold: 10000,
};
module.exports = kafkaSettings;
