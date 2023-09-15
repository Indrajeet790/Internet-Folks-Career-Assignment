const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const memberSchema = new mongoose.Schema({
  id: {
    type: String,
    default: Snowflake.generate,
    unique: true,
    required: true,
  },
  community: {
    type: String,
    ref: 'Community',
    required: true,
  },
  user: {
    type: String,
    ref: 'User',
    unique: true,
  },
  role: {
    type: String, // Assuming this is the User's Snowflake ID
    ref: 'Role',
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

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
