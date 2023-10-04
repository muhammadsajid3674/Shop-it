import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { v4 as uuidv4 } from "uuid";
import uploadImage from "../utils/uploadImage.js";
import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/Product.js";

// * @desc Add Product Items
// * @route POST /api/merchant/addProduct
// * @access Private
export const addProduct = asyncErrorHandler(async (req, res) => {
   const { userId } = req;
   const { name, category, description, price, base64Image } = req.body;
   const imageId = uuidv4().split("-")[0];
   console.log("imageId :>> ", imageId);

   const imageUrl = await uploadImage(base64Image, imageId);
   if (typeof imageUrl !== "string") {
      return next(new ErrorHandler("Unknown error occured", 500));
   }
   if (userId) {
      const product = new Product({
         name,
         category,
         description,
         price,
         imageUrl,
         userId,
      });
      const result = await product.save();
      return res.json({ success: true, result });
   }
   return next(new ErrorHandler("Request not allowed", 401));
});

// * @desc Get Product Items
// * @route GET /api/client/getProduct
// * @access Private
export const getProducts = asyncErrorHandler(async (req, res, next) => {
   const userId = req.userId;
   const { pageNumber, limit } = req.params;
   const query = Product.find({ userId })
      .sort({ createdAt: -1 })
      .skip((Number(pageNumber) - 1) * Number(limit))
      .limit(Number(limit));
   const products = await query.exec();
   res.json({ success: true, products });
});
