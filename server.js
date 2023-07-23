//core packages:
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const config = require("./config/config");

//Routes:
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const cartRouter = require("./routes/cart.route");
const addressRouter = require("./routes/shippingAddr.route");
const orderRouter = require("./routes/order.route");
const paymentRouter = require("./routes/payment.route");

//variables:
const app = express();
const PORT = config.PORT;
const MONGO_URI = config.MONGO_URI;

//Middleware:
app.use(express.json());
app.use(cors());

//DB Connection:
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("error while connecting db : ", err);
    process.exit(1);
  });

//API Routes:
app.use(userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

//if no api route found:
app.use((req, res) => {
  res.status(404).send({
    message: "API endpoint not found.",
  });
});

//Server:
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});