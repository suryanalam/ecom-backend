const mongoose = require("mongoose");

const shippingAddrSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  altMobileNo: {
    type: String,
  },
});

const AddressModel = mongoose.model("Address", shippingAddrSchema);
module.exports = AddressModel;
