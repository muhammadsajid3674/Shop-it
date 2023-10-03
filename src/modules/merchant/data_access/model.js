const { default: mongoose } = require("mongoose");
const merchantSchema = require("./schema");

const MerchantModel = mongoose.model("Merchant", merchantSchema);

module.exports = MerchantModel;
