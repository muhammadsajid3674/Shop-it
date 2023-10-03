import { Schema, model } from "mongoose";

const merchantSchema = new Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
      },
      licenseId: {
         type: String,
         required: [true, "License Id is required"],
      },
   },
   { timestamps: true }
);

const Merchant = model("merchant", merchantSchema);

export default Merchant;
