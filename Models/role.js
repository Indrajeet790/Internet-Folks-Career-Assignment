const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const roleSchema = new mongoose.Schema({
  roleId: {
    type: String,
    default: Snowflake.generate,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Role= mongoose.model('Role', roleSchema);
module.exports=Role;
