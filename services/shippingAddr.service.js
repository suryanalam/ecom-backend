const AddressModel = require("../models/shippingAddr.model");

async function findAddrByMailService(email) {
  const user = await AddressModel.findOne({ email });

  if (user) {
    return {
      success: true,
      message: "✅ Valid Email",
      data: user,
    };
  } else {
    return {
      success: false,
      message: "⚠️Invalid Email",
    };
  }
}

async function addAddressService(newAddressData) {
  const address = await AddressModel.create(newAddressData);
  if (address) {
    return {
      success: true,
      message: "✅Address added successfully",
      data: address,
    };
  } else {
    return {
      success: false,
      message: "⚠️Address not added",
    };
  }
}

async function getAllAddressService() {
  const addresses = await AddressModel.find().populate(
    "user",
    "name email mobile"
  );

  if (addresses.length) {
    return {
      success: true,
      message: "✅All Addresses found",
      data: addresses,
    };
  } else {
    return {
      success: false,
      message: "⚠️No Addresses found",
    };
  }
}

async function getAddressByAidService(aid) {
  const address = await AddressModel.findOne({ _id: aid });

  if (address) {
    return {
      success: true,
      message: "✅Address found",
      data: address,
    };
  } else {
    return {
      success: false,
      message: "⚠️Address not found",
    };
  }
}

async function getAllAddressByUserIdService(uid) {
  const address = await AddressModel.find({ user: uid }).populate(
    "user",
    "name email mobile"
  );

  if (address.length) {
    return {
      success: true,
      message: "✅Address found",
      data: address,
    };
  } else {
    return {
      success: false,
      message: "⚠️Address not found",
    };
  }
}

async function getAddressByAidAndUidService(aid, uid) {
  const address = await AddressModel.findOne({ _id: aid, user: uid }).populate(
    "user",
    "name email mobile"
  );

  if (address) {
    return {
      success: true,
      message: "✅Address found",
      data: address,
    };
  } else {
    return {
      success: false,
      message: "⚠️Address not found",
    };
  }
}

async function updateAddressService(id, updatedAddressData) {
  const updatedAddress = await AddressModel.findByIdAndUpdate(
    id,
    updatedAddressData,
    { new: true }
  );

  if (updatedAddress) {
    return {
      success: true,
      message: "✅Address is updated",
      data: updatedAddress,
    };
  } else {
    return {
      success: false,
      message: "⚠️Address not updated",
    };
  }
}

async function deleteAddressService(id) {
  const deletedAddress = await AddressModel.findByIdAndDelete(id);
  if (deletedAddress) {
    return {
      success: true,
      message: "✅Address is deleted",
      data: deletedAddress,
    };
  } else {
    return {
      success: false,
      message: "⚠️Address not deleted",
    };
  }
}

module.exports = {
  findAddrByMailService,
  addAddressService,
  getAllAddressService,
  getAddressByAidService,
  getAllAddressByUserIdService,
  getAddressByAidAndUidService,
  updateAddressService,
  deleteAddressService,
};
