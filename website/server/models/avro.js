const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvroSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    avro: {
      type: String,
      required: true,
    },
    graphql: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('avroSchema', AvroSchema);
