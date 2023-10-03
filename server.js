import colors from "colors";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import Database from "./config/db.js";
import dotenv from "dotenv";
import Routes from "./routes.js";
import error from "./middleware/error.js";

dotenv.config();
const app = express();
app.use(cookieParser()); // * parsing the incoming cookies
app.use(express.json({ limit: "10mb" })); // * parsing the incoming data
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.get("/", (req, res) => res.send("Server is healthy! 💪"));

// ? Routes
app.use("/api", Routes());

// ? Error handler
app.use(error);

new Database(process.env.MONGODB_URI) // * connects to the database using MONGODB cluster URL
   .then(() => {
      app.listen(process.env.PORT, () => {
         console.log(
            `Server is running on ${process.env.NODE_ENV} on http://localhost:${process.env.PORT}`
               .yellow.bold
         );
      });
   })
   .catch((err) => console.error(err));
