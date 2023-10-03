import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema(
   {
      name: { type: String, required: [true, "is required field"] },
      email: {
         type: String,
         required: [true, "is required field"],
         unique: true,
         lowercase: true,
         validate: [validator.isEmail, "Please enter valid email address"],
      },
      password: {
         type: String,
         required: [true, "is required field"],
         select: false,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
   },
   { timestamps: true }
);

// * Encrypting password before saving user
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});

// * Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

// * Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
   // ? Generate token
   const resetToken = crypto.randomBytes(20).toString("hex");

   // ? Hash and set to resetPasswordToken field
   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

   // ? Set token expire time
   this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

   return resetToken;
};

const User = model("user", userSchema);

export default User;
