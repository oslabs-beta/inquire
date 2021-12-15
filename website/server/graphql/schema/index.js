const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type User {
      _id: ID!
      email: String!
      password: String
      createdSchemas: [AvroSchema!]
    }

    type AvroSchema {
      _id: ID!
      topic: String!
      avro: String!
      graphql: String!
      creator: User!
    }

    type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input SchemaInput {
      topic: String!
      avro: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      avroSchemas: [AvroSchema]
      avroSchema(_id: ID!): AvroSchema!
      login(email: String!, password: String!): User      
    }

    type RootMutation {
      createSchema(schemaInput: SchemaInput): AvroSchema
      createUser(userInput: UserInput): User 
      deleteSchema(schemaId: ID!): AvroSchema
    }

    schema {
      query:RootQuery
      mutation:RootMutation
    }
`);

module.exports = graphqlSchema;

// login(email: String!, password: String!): AuthData!
// modifySchema(schemaInput: SchemaInput): AvroSchema
