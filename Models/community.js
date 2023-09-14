const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const communitySchema = new mongoose.Schema({
  id: {
    type:String,
    default: Snowflake.generate(),
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  owner: {
    type:  String,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
