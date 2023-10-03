const { default: mongoose } = require("mongoose");

const merchantSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
      },
      licenseId: {
         type: String,
         required: [true, "License Id is required"],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = merchantSchema;
