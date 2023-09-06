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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    type: String,
    unique: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    type: String, // Assuming this is the User's Snowflake ID
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
