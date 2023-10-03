import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Merchant from "../models/Merchant.js";

const authMiddleware = {
   // * Token Authorization
   authenticate: asyncErrorHandler(async (req, res, next) => {
      const token = req.headers.authorization;
      if (token) {
         const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
         console.log("userData :>> ", userData);
         // * Check in DB
         const user = await User.findById(userData._id);
         if (user) {
            req.userId = userData._id;
            return next();
         }
         return next(ErrorHandler("Only merchants are allowed", 401));
      } else {
         return next(ErrorHandler("Token not found", 404));
      }
   }),
   // * Merchant Authorization
   authenticateMerchant: asyncErrorHandler(async (req, res, next) => {
      const userId = req.userId;

      // * Check in DB
      const merchant = await Merchant.findOne({ userId });

      if (merchant) {
         return next();
      }
      next(ErrorHandler("Only merchants are allowed", 401));
   }),
   // * API Authorization
   authorize: (req, res, next) => {
      const authKey = req.headers.authorization.split(" ")[1];

      if (!authKey || authKey !== process.env.AUTHKEY) {
         return next(createHttpError(401, "Unauthorized"));
      }
      next();
   },
};

export default authMiddleware;
