const db = require('../config/database');

const findUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (username, email, hashedPassword) => {
  const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
  return result.insertId;
};

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
};
