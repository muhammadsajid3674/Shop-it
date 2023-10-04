import colors from "colors";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import Database from "./config/db.js";
import dotenv from "dotenv";
import Routes from "./routes/routes.js";
import error from "./middleware/error.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();
app.use(cookieParser()); // * parsing the incoming cookies
app.use(express.json({ limit: "10mb" })); // * parsing the incoming data
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({ origin: "*", credentials: true }));

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET,
});

// * For development environment only
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.get("/", (req, res) => res.send("Server is healthy! 💪"));

// * Routes
app.use("/api", Routes());

// * Error handler
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
