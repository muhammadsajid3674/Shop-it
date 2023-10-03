import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

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

export const login = asyncErrorHandler(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email }).select("+password");
   if (user && (await user.comparePassword(password))) {
      const finalObj = user.toObject();
      delete finalObj.password;
      const token = jwt.sign(finalObj, process.env.JWT_SECRET_KEY);
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });
      res.status(200).json({
         success: true,
         message: "Account LoggedIn successfully",
      });
   } else {
      return next(new ErrorHandler("User not found", 400));
   }
});

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
