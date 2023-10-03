const { Router } = require("express");
const ClientRepository = require("./repository");
const ClientController = require("./controller");
const ProductModel = require("./data_access/model");

const clientRoutes = () => {
   const model = ProductModel;
   const repository = new ClientRepository(model);
   const router = Router();
   const controller = ClientController(repository);

   router.route("/getProduct").get(controller.getProduct);
   router.route("/addProduct").post(controller.addProduct);
   router.route("/deleteProduct").delete(controller.deleteProduct);
   return router;
};

module.exports = clientRoutes;
