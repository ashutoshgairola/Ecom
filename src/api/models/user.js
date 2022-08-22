const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    default: "User",
  },
  designation: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
