const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const { errorHandler } = require('./middlewares/errorMiddleware.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world, let's go Cloud");
});

app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
