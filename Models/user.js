const mongoose = require("mongoose");
const { Snowflake } = require('@theinternetfolks/snowflake');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: Snowflake.generate, // Use Snowflake to generate a unique ID
      unique: true,
    },
      name: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
     
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;