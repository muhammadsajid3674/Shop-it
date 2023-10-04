import { Router } from "express";
import { addProduct, getProducts } from "../controller/merchant.js";

const merchantRouter = () => {
   const router = Router();
   router.route("/addProduct").post(addProduct);
   router.route("/getProduct").get(getProducts);
   return router;
};

export default merchantRouter;
