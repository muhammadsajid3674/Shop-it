const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const Routes = require("./routes");
const middleware = require("./middleware/errorHandler");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();
app.use(express.json()); // * parsing the incoming data
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

if (process.env.NODE_ENV === "developement") {
   app.use(morgan("dev"));
}

app.get("/", (req, res) => res.send("<h1>Server is healthy! 💪<h1/>"));

app.use("/api", Routes());

app.use(middleware.errorHandler);

module.exports = app;
