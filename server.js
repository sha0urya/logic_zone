const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const stockRoutes = require("./routes/stockRoutes.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);

app.get("/", (req, res) => {
  res.send("Hello world, let's go Cloud");
});

app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => console.log(`Server runs on port ${PORT}`));
