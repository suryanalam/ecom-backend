const {
  addAddressService,
  getAllAddressService,
  getAddressByAidService,
  getAllAddressByUserIdService,
  getAddressByAidAndUidService,
  updateAddressService,
  deleteAddressService,
} = require("../services/shippingAddr.service");

async function addAddressController(req, res) {
  console.log("inside addAddressController");

  const { street, city, state, country, pincode, mobileNo, altMobileNo } =
    req.body;

  if (!street || !city || !state || !country || !pincode || !mobileNo) {
    return res.status(400).send({
      success: false,
      message: "⚠️Please enter all the required fields",
    });
  }

  let user = req.user._id;
  const newAddressData = {
    user,
    street,
    city,
    state,
    country,
    pincode,
    mobileNo,
    altMobileNo,
  };

  const serviceData = await addAddressService(newAddressData);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function getAllAddressController(req, res) {
  console.log("inside getAllAddressController");

  const serviceData = await getAllAddressService();
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function getAddressByAIdAndUidController(req, res, next) {
  const aid = req.params.id;
  const uid = req.user._id;
  console.log("inside getAddressByAIdAndUidController");

  const isAddressExist = await getAddressByAidService(aid);

  //if no address is found with the given id then it will go to next middleware to check if the id belongs to userId
  if (!isAddressExist.success) {
    console.log("moving to next middleware");
    return next();
  }

  // if address is found and the user is admin then it will return the address
  if (req.user.role == "admin") {
    return res.status(200).send({
      success: true,
      message: isAddressExist.message,
      data: isAddressExist.data,
    });
  }

  //if address is found and the user is customer then it will check if the address belongs to the user
  const serviceData = await getAddressByAidAndUidService(aid, uid);
  console.log("serviceData in getAddressByAIdAndUidController ", serviceData);

  if (serviceData.success) {
    console.log("success from getAddressByAIdAndUidController");
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    console.log("failure from getAddressByAIdAndUidController");
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function getAllAddressByUserIdController(req, res) {
  const uid = req.params.id;
  console.log("inside getAllAddressByUserIdController");

  //if the user is customer and accessing another details:
  if (req.user.role == "customer" && uid !== req.user._id) {
    return res.status(401).send({
      success: false,
      message: "⚠️Unauthorized access",
    });
  }

  const serviceData = await getAllAddressByUserIdService(uid);
  console.log("serviceData in getAllAddressByUserIdController:", serviceData);

  if (serviceData.success) {
    console.log("success from getAllAddressByUserIdController");
    return res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    console.log("failure from getAllAddressByUserIdController");
    return res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function updateAddressController(req, res) {
  const id = req.params.id;
  const uid = req.user._id;
  console.log("inside updateAddressController");

  const validAddressDetails = await getAddressByAidAndUidService(id, uid);

  if (!validAddressDetails.success) {
    return res.status(400).send({
      success: false,
      message: "⚠️Invalid address id",
    });
  }

  const { street, city, state, country, pincode, mobileNo, altMobileNo } =
    req.body;

  let updatedAddressData = {};

  if (street) updatedAddressData.street = street;
  if (city) updatedAddressData.city = city;
  if (state) updatedAddressData.state = state;
  if (country) updatedAddressData.country = country;
  if (pincode) updatedAddressData.pincode = pincode;
  if (mobileNo) updatedAddressData.mobileNo = mobileNo;
  if (altMobileNo) updatedAddressData.altMobileNo = altMobileNo;

  const serviceData = await updateAddressService(id, updatedAddressData);
  console.log("serviceData in controller ", serviceData);

  if (serviceData.success) {
    res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

async function deleteAddressController(req, res) {
  const id = req.params.id;
  const uid = req.user._id;
  console.log("inside deleteAddressController");

  const validAddressDetails = await getAddressByAidAndUidService(id, uid);

  if (!validAddressDetails.success) {
    return res.status(400).send({
      success: false,
      message: "⚠️Invalid address id",
    });
  }

  const serviceData = await deleteAddressService(id);

  if (serviceData.success) {
    res.status(200).send({
      success: true,
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      success: false,
      message: serviceData.message,
    });
  }
}

module.exports = {
  addAddressController,
  getAllAddressController,
  getAllAddressByUserIdController,
  getAddressByAIdAndUidController,
  updateAddressController,
  deleteAddressController,
};
