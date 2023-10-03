const { default: mongoose } = require("mongoose");

const productCategories = [
   "Clothes",
   "Consumables",
   "Jewellery",
   "Home appliance",
   "Handbags",
];

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Product Name is required"],
         // maxlength: 30,
      },
      category: {
         type: String,
         required: [true, "Product category is required"],
         enum: productCategories,
      },
      description: {
         type: String,
         required: [true, "Product Description is required"],
         // maxlength: 100,
      },
      imageUrl: {
         type: String,
         required: [true, "Image is required"],
      },
      price: {
         type: Number,
         required: [true, "Product Price is required"],
         min: 0,
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user", // Reference to the User model
         required: [true, "User ID is required"],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = productSchema;
