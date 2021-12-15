const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const AvroSchema = require('../../models/avro');
const {
  parseKafkaSchema,
  formatGQLSchema,
} = require('../../tools/coversionFuncs');

const avros = async (schemaIds) => {
  try {
    const avros = await AvroSchema.find({ _id: { $in: schemaIds } });
    avros.map((avro) => {
      return {
        ...avro._doc,
        creator: user.bind(this, avro.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const avro = async (schemaId) => {
  try {
    const avro = await AvroSchema.findById(schemaId);
    return {
      ...avro._doc,
      creator: user.bind(this, avro.creator),
    };
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdSchemas: avros.bind(this, user._doc.createdSchemas),
    };
  } catch (err) {
    throw err;
  }
};

const handleConversion = (avroString) => {
  const avroParsed = parseKafkaSchema(JSON.parse(avroString));
  const gqlFormatted = formatGQLSchema(avroParsed);
  return JSON.stringify(gqlFormatted);
};

const graphqlResolvers = {
  avroSchema: async (args) => {
    try {
      const avro = await AvroSchema.findById(args._id);
      return {
        ...avro._doc,
        creator: user.bind(this, avro.creator),
      };
    } catch (err) {
      throw err;
    }
  },

  avroSchemas: async () => {
    return AvroSchema.find()
      .then((avros) => {
        console.log(avros);
        return avros.map((avro) => {
          return {
            ...avro._doc,
            creator: user.bind(this, avro._doc.creator),
          };
        });
      })
      .catch((err) => console.error(err.message));
  },

  createSchema: (args) => {
    const avroStr = args.schemaInput.avro;
    let graphqlStr = handleConversion(JSON.stringify(avroStr));
    const avro = new AvroSchema({
      topic: args.schemaInput.topic,
      avro: avroStr,
      graphql: graphqlStr,
      creator: '61b64fb11a8d83fa78923900',
    });
    let createdSchema;
    console.log('here-->', avro);
    return avro
      .save()
      .then((result) => {
        createdSchema = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator),
        };
        return User.findById('61b64fb11a8d83fa78923900');
      })
      .then((user) => {
        if (!user) {
          throw new Error('User not found.');
        }
        user.createdSchemas.push(createdSchema);
        return user.save();
      })
      .then((result) => {
        return createdSchema;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  deleteSchema: async (args) => {
    try {
      const avro = await AvroSchema.findById(args.schemaId);

      const creator = avro._doc.creator;
      console.log(creator);
      const deletedSchema = await AvroSchema.findOneAndDelete({
        _id: args.schemaId,
      });
      await User.updateOne(
        { _id: creator },
        {
          $pullAll: {
            createdSchemas: [deletedSchema],
          },
        }
      );
      return deletedSchema;
    } catch (err) {
      throw err;
    }
  },

  createUser: async (args) => {
    return User.findOne({ username: args.userInput.username })
      .then((user) => {
        if (user) {
          throw new Error('User exists already.');
        }
        return bcrypt.hash(args.userInput.password, 10);
      })
      .then((hashedPassword) => {
        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        console.log(result);
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        console.error(err.message);
        throw err;
      });
  },
};

module.exports = graphqlResolvers;