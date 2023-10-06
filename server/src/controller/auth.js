import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import Merchant from "../models/Merchant.js";

// * @desc User Registration
// * @route POST /api/auth/register
// * @access Private
export const signup = asyncErrorHandler(async (req, res, next) => {
   const { name, email, password } = req.body;
   const user = new User({ name, email, password });
   const result = await user.save();
   const finalObj = result.toObject();
   delete finalObj.password;
   const token = jwt.sign(finalObj, process.env.JWT_SECRET_KEY);
   res.cookie("token", token, { maxAge: 900000, httpOnly: true });
   res.status(200).json({
      success: true,
      message: "Account Registered successfully",
   });
});

// * @desc User Login
// * @route POST /api/auth/login
// * @access Private
export const login = asyncErrorHandler(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email }).select("+password");
   if (user) {
      if (await user.comparePassword(password)) {
         const finalObj = user.toObject();
         const checkMerchant = await Merchant.findOne({
            userId: user._id,
         });
         const licenseId = checkMerchant?.licenseId || 0;
         delete finalObj.password;
         const token = jwt.sign(finalObj, process.env.JWT_SECRET_KEY);
         res.cookie("token", token, { maxAge: 900000, httpOnly: true });
         res.status(200).json({
            success: true,
            licenseId,
            ...finalObj,
            token,
         });
      } else {
         return next(new ErrorHandler("User not found", 404));
      }
   } else {
      return next(new ErrorHandler("User not found", 404));
   }
});

// * @desc Forgot Password Email Send
// * @route POST /api/auth/forgotPassword
// * @access Private
export const forgotPassword = asyncErrorHandler(async (req, res, next) => {
   const { email } = req.body;
   const user = await User.findOne({ email }).select("+password");
   if (!user) {
      return next(new ErrorHandler("User not found with this email", 404));
   }
   const resetToken = await user.getResetPasswordToken();
   await user.save({ validateBeforeSave: false });
   const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;
   const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;
   try {
      await sendEmail({
         email: user.email,
         subject: "BookIT Password Recovery",
         message,
      });
      res.status(200).json({
         success: true,
         message: `Email sent to: ${user.email}`,
      });
   } catch (error) {
      return next(new ErrorHandler(error.message, 500));
   }
});

// * @desc Reset Password
// * @route POST /api/auth/resetPassword
// * @access Private
export const resetPassword = asyncErrorHandler(async (req, res, next) => {
   const { password, confirmPassword } = req.body;
   const { token } = req.query;
   // * Hash URL token
   const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
   const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
   });
   if (!user) {
      return next(
         new ErrorHandler(
            "Password reset token is invalid or has been expired",
            400
         )
      );
   }
   if (password !== confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
   }
   // * Setup the new password
   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;
   await user.save();
   res.status(200).json({
      success: true,
      message: "Password updated successfully",
   });
});
