import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Merchant from "../models/Merchant.js";

const authMiddleware = {
   // * Token Authorization
   authenticate: asyncErrorHandler(async (req, res, next) => {
      let token;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         token = req.headers.authorization.split(" ")[1];
         const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
         // * Check in DB
         const user = await User.findById(userData._id);
         if (user) {
            req.userId = userData._id;
            return next();
         }
         return next(new ErrorHandler("Only merchants are allowed", 401));
      } else {
         return next(new ErrorHandler("Token not found", 404));
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
      next(new ErrorHandler("Only merchants are allowed", 401));
   }),
   // * API Authorization
   authorize: (req, res, next) => {
      let authKey;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         authKey = req.headers.authorization.split(" ")[1];
         if (!authKey || authKey !== process.env.AUTHKEY) {
            return next(new ErrorHandler("Unauthorized", 401));
         }
         next();
      } else {
         return next(new ErrorHandler("API Key not found", 404));
      }
   },
};

export default authMiddleware;
