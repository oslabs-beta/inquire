const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type User {
      _id: ID!
      username: String!
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

    input SchemaInput {
      topic: String!
      avro: String!
    }

    input UserInput {
      username: String!
      email: String!
      password: String!
    }

    type RootQuery {
      avroSchemas: [AvroSchema]
      avroSchema(_id: ID!): AvroSchema!
    }

    type RootMutation {
      createSchema(schemaInput: SchemaInput): AvroSchema
      createUser(userInput: UserInput): User
      modifySchema(schemaInput: SchemaInput): AvroSchema
      deleteSchema(schemaId: ID!): AvroSchema
    }

    schema {
      query:RootQuery
      mutation:RootMutation
    }
`);

module.exports = graphqlSchema;
