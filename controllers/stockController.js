const axios = require("axios");
const db = require("../config/database");

// Variable to track the last fetch timestamp
let lastApiFetchTime = null;

// Helper function to fetch stock data from API
const fetchStockDataFromAPI = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (apiError) {
    console.error("API fetch error:", apiError);
    throw new Error("Error fetching data from API");
  }
};

// Helper function to fetch stock data from database
const fetchStockDataFromDatabase = async () => {
  try {
    const queryResult = await db.query(
      "SELECT * FROM stocks ORDER BY fetch_timestamp DESC LIMIT 20"
    );
    return queryResult[0];
  } catch (dbError) {
    console.error("Database query error:", dbError);
    throw new Error("Database query error");
  }
};

// Helper function to save stock data to database
const saveStockDataToDatabase = async (stockData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("DELETE FROM stocks");

    const fetchTimestamp = new Date().toISOString();
    const topStocks = stockData.slice(0, 20);

    for (const stock of topStocks) {
      const {
        title: name,
        form_type: type,
        cik: price,
        date: timestamp,
      } = stock;

      if (!name || !type || !price || !timestamp) {
        console.error(
          "Invalid or missing data for stock:",
          JSON.stringify(stock, null, 2)
        );
        continue;
      }

      await connection.query(
        "INSERT INTO stocks (name, type, price, timestamp, fetch_timestamp) VALUES (?, ?, ?, ?, ?)",
        [name, type, price, timestamp, fetchTimestamp]
      );
    }

    await connection.commit();
    return topStocks;
  } catch (dbError) {
    await connection.rollback();
    console.error("Error inserting stock data:", dbError);
    throw new Error("Error processing stock data");
  } finally {
    connection.release();
  }
};

const fetchAndSaveStockData = async (req, res, next) => {
  try {
    const currentTime = new Date();

    if (lastApiFetchTime && currentTime - lastApiFetchTime < 5 * 60 * 1000) {
      const topStocks = await fetchStockDataFromDatabase();
      console.log(
        "Returning data from database:",
        JSON.stringify(topStocks, null, 2)
      );
      return res.status(200).json({
        message: "Stock data fetched from database",
        data: topStocks,
      });
    }

    const apiUrl = process.env.STOCK_API_URL;
    const stockData = await fetchStockDataFromAPI(apiUrl);

    console.log("Fetched stock data:", JSON.stringify(stockData, null, 2));

    if (!Array.isArray(stockData)) {
      console.error("Unexpected API response format:", stockData);
      return res
        .status(500)
        .json({ message: "Unexpected API response format" });
    }

    const topStocks = await saveStockDataToDatabase(stockData);
    lastApiFetchTime = currentTime;

    res.status(200).json({
      message: "Stock data fetched and saved successfully",
      data: topStocks,
    });
  } catch (error) {
    console.error("Error in fetchAndSaveStockData function:", error);
    next(error);
  }
};

module.exports = {
  fetchAndSaveStockData,
};
