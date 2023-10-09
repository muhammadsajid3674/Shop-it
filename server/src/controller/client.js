import Cart from "../models/Cart.js";
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
   const query = Product.find()
      .sort({ createdAt: -1 })
      .skip((Number(pageNumber) - 1) * Number(limit))
      .limit(Number(limit));
   const product = await query.exec();
   res.json({ success: true, product });
});

// * @desc Add to cart
// * @route GET /api/client/
// * @access Private
export const updateCart = asyncErrorHandler(async (req, res, next) => {
   const { userId } = req;
   const { productId, quantity } = req.body;
   if (userId) {
      if (quantity === 0) {
         await Cart.findOneAndDelete({ userId, productId });
         return res.json({
            success: true,
            message: "Product Removed",
         });
      }
      const updateCart = await Cart.findOneAndUpdate(
         { productId, userId },
         { $inc: { quantity } },
         { new: true }
      );
      if (updateCart) {
         return res.json({ success: true, updateCart });
      }
      const cart = new Cart({ productId, userId, quantity });
      const result = await cart.save();
      return res.json({ success: true, result });
   }
   next(new ErrorHandler("User not found", 404));
});

// * @desc Aggregate Query to view the cart
// * @route GET /api/client/
// * @access Private
export const viewCart = asyncErrorHandler(async (req, res, next) => {
   const { userId } = req;
   if (userId) {
      const cart = await Cart.aggregate([
         {
            $lookup: {
               from: "products",
               localField: "productId",
               foreignField: "_id",
               as: "productData",
            },
         },
      ]);
      return res.json({ success: true, cart });
   }
   next(new ErrorHandler("User not found", 404));
});

// * @desc Get total number of cart items
// * @route GET /api/client/
// * @access Private
export const cartCount = asyncErrorHandler(async (req, res, next) => {
   const { userId } = req;
   if (userId) {
      const count = await Cart.countDocuments({ userId });
      return res.json({ success: true, count });
   }
   next(new ErrorHandler("User not found", 404));
});

// * @desc search through name and description
// * @route GET /api/client/
// * @access Private
export const search = asyncErrorHandler(async (req, res, next) => {
   const { searchTerm } = req.params;
   const result = await Product.find({
      $or: [
         { name: { $regex: searchTerm, $options: "i" } },
         { description: { $regex: searchTerm, $options: "i" } },
      ],
   }).exec();
   return res.json({ success: true, result });
});

// TODO: Add to wishList
// TODO: Remove from wishlist
// TODO: Product rating
// TODO: Product Reviews
