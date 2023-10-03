const { Router } = require("express");
const MerchantRepository = require("./repository");
const MerchantController = require("./controller");
const MerchantModel = require("./data_access/model");

const merchantRoutes = () => {
   const model = MerchantModel;
   const repository = new MerchantRepository(model);
   const router = Router();
   const controller = MerchantController(repository);

   router.route("/becomeMerchant").post(controller.becomeMerchant);
   return router;
};

module.exports = merchantRoutes;
