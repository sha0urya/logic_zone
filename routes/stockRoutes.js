const express = require("express");
const { fetchAndSaveStockData } = require("../controllers/stockController");

const router = express.Router();

router.get("/fetch-stock-data", fetchAndSaveStockData);

module.exports = router;
