const { default: mongoose } = require("mongoose");
const userSchema = require("./schema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//? Encrypting password before saving user
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   console.log("hello :>> ", this.password);

   this.password = await bcrypt.hash(this.password, 10);
});

//? Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

//? Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
   //* Generate token
   const resetToken = crypto.randomBytes(20).toString("hex");

   //* Hash and set to resetPasswordToken field
   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

   //* Set token expire time
   this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

   return resetToken;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
