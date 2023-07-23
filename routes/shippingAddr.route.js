const {
  addAddressController,
  getAllAddressController,
  getAllAddressByUserIdController,
  getAddressByAIdAndUidController,
  updateAddressController,
  deleteAddressController,
} = require("../controllers/shippingAddr.controller");
const Authorize = require("../middlewares/Authorize.middleware");
const express = require("express");

const addressRouter = express.Router();

addressRouter.post("/", Authorize(["customer"]), addAddressController);
addressRouter.put("/:id", Authorize(["customer"]), updateAddressController);
addressRouter.delete("/:id", Authorize(["customer"]), deleteAddressController);
addressRouter.get("/", Authorize(["admin"]), getAllAddressController);
addressRouter.use(
  "/:id",
  Authorize(["admin", "customer"]),
  getAddressByAIdAndUidController
);
addressRouter.get(
  "/:id",
  Authorize(["admin", "customer"]),
  getAllAddressByUserIdController
);

module.exports = addressRouter;
