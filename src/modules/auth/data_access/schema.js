const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: [true, "is required field"],
         unique: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: [true, "is required field"],
         select: false,
      },
      reset_token: {
         type: String,
      },
      token_expired_at: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = userSchema;
