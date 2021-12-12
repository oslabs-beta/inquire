const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdSchemas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'AvroSchema',
    },
  ],
});

module.exports = mongoose.model('user', User);
