const { default: mongoose } = require("mongoose");
const productSchema = require("./schema");

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
