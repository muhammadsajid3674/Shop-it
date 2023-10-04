import Merchant from "../models/Merchant.js";
import Product from "../models/Product.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";

// * @desc Change client role to merchant
// * @route POST /api/client/becomeMerchant
// * @access Private
export const becomeMerchant = asyncErrorHandler(async (req, res, next) => {
   const { userId } = req;
   const { licenseId } = req.body;
   const merchantExist = await Merchant.findOne({ userId });
   if (!merchantExist) {
      if (userId) {
         const merchant = new Merchant({ userId, licenseId });
         const result = await merchant.save();
         const finalObj = result.toObject();
         return res.status(201).json({ success: true, ...finalObj });
      }
   } else {
      return res
         .status(200)
         .json({ success: true, message: "Already a merchant" });
   }
   next(new ErrorHandler("Request not allowed", 401));
});

// * @desc Get Product Items
// * @route GET /api/client/getProduct
// * @access Private
export const getProduct = asyncErrorHandler(async (req, res) => {
   const { category, page: pageNumber = 1, limit = 4 } = req.query;
   const query = Product.find({ category })
      .sort({ createdAt: -1 })
      .skip((Number(pageNumber) - 1) * Number(limit))
      .limit(Number(limit));
   const product = await query.exec();
   res.json({ success: true, product });
});

