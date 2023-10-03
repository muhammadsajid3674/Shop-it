const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const MerchantModel = require("../modules/merchant/data_access/model");
const UserModel = require("../modules/auth/data_access/model");
const dotenv = require("dotenv");
const createHttpError = require("http-errors");

dotenv.config();

exports.authorize = (req, res, next) => {
   const authKey = req.headers.authorization;

   if (!authKey || authKey !== process.env.AUTHKEY) {
      return next(createHttpError(401, "Unauthorized"));
   }
   next();
};

exports.authenticate = asyncErrorHandler(async (req, res, next) => {
   console.log('token :>> ', req.cookies);
   const token = req.cookies.ezToken;
   if (token) {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await UserModel.findById(userData._id);
      if (user) {
         req.userId = userData._id;
         return next();
      }
   }
   next(createHttpError(401, "Only merchants are allowed"));
});

exports.authenticateMerchant = asyncErrorHandler(async (req, res, next) => {
   const { userId } = req;
   console.log("userId :middleware>> ", userId);

   // * Check in DB
   const merchant = await MerchantModel.findOne({ userId });
   if (merchant) {
      console.log("merchant :middleware>> ", merchant);
      return next();
   }
   next(createHttpError(401, "Only merchants are allowed"));
});
