const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Import your user model
const User = require("./models/User");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Routes: auth, payments, accounts
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const accountRoutes = require("./routes/account");
const adminRoutes = require("./routes/admin");
//const zarinpalRoutes = require("./routes/zarinpal"); // Import Zarinpal routes
////////////
const currencyRoutes = require("./routes/currency");
app.use("/api/currencies", currencyRoutes);

app.use("/api", require("./routes/stripeRoutes"));

//////////////////////

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/accounts", accountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
