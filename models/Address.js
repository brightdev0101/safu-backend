const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  token: {
    type: String,
  },
  launchpad: {
    type: String,
  },
  chainID:{
    type: Number
  }
});

module.exports = Address = mongoose.model("launchpad", AddressSchema);
