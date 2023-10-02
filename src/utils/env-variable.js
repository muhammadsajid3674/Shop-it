require("dotenv").config();

const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGO_CONNECTION_STRING;
let GMAIL_USER = process.env.GMAIL_USER;
let GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

module.exports = {
  MONGODB_URI,
  PORT,
  GMAIL_USER,
  GMAIL_PASSWORD,
};
