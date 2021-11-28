// Confluent Cloud Login Page: https://login.confluent.io/login?state=hKFo2SBzNVlTbkRMcVJoWnQxdWZHMmVaOXJLdkYyUzFZME5kTqFupWxvZ2luo3RpZNkgRGpBT1JBeENHMS1tZFpEWEdyY0JfMC1DZmVDNk0xcGSjY2lk2SBsMmhPcDBTMHRrU0IwVEZ0dklZZlpaOUVhS0Z2clNjNg&client=l2hOp0S0tkSB0TFtvIYfZZ9EaKFvrSc6&protocol=oauth2&response_type=id_token&redirect_uri=https%3A%2F%2Fconfluent.cloud%2Fauth_callback&redirect_path=%2Fenvironments%2Fenv-mdv6q%2Fclusters%2Flkc-7361o%2Ftopics%2Ftest%2Fschema%2Fkey&nonce=HG1XtM4rEn3v7IFzNL9XNVvrh6Pt0jsS&scope=openid%20profile%20email&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xNi4yIn0%3D

// Login: anna.falvello@gmail.com
// Password: Password11

// Fetching information from the Schema Registry:
// List all subjects in your Schema Registry
// curl -s -u <API_KEY>:<API_SECRET> GET https://psrc-q8qx7.us-central1.gcp.confluent.cloud/subjects

// Fetch the latest version of the schema registered under subject “kafka-value”
// curl -s -u <API_KEY>:<API_SECRET> GET https://psrc-q8qx7.us-central1.gcp.confluent.cloud/subjects/kafka-value/versions/latest

// Specific commands for this cluster instance:
// List all subjects
// curl -s -u QYNK56V7RGVKVPAP:fc9MQL2zQ/cjkIftGgIz7jYeePz3yBAqwbKwNzg2dHgY/o9rp96KtSmJ0NfSzlRN GET https://psrc-q8qx7.us-central1.gcp.confluent.cloud/subjects >> ./schemaNames.json
// Fetch latest version of schema
// curl -s -u QYNK56V7RGVKVPAP:fc9MQL2zQ/cjkIftGgIz7jYeePz3yBAqwbKwNzg2dHgY/o9rp96KtSmJ0NfSzlRN GET https://psrc-q8qx7.us-central1.gcp.confluent.cloud/subjects/animals/versions/latest >> ./schema.json

const username = 'JUJA6GJGJCDSUYOP'
const password = '1XIN/fry4johm7kHhZ+n88jeKc11xJR3G07QXzfRmtnKA/f+s7mcbdkdvRIi/ixc'

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

module.exports = {
  topics: ['test'],
  clientId: 'kafQL',
  brokers: ['pkc-lzvrd.us-west4.gcp.confluent.cloud:9092'],
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};