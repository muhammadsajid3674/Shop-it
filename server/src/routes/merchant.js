import { Router } from "express";
import {
   addProduct,
   deleteProduct,
   getProducts,
} from "../controller/merchant.js";

const merchantRouter = () => {
   const router = Router();
   router.route("/addProduct").post(addProduct);
   router.route("/getProduct").get(getProducts);
   router.route("/deleteProduct").delete(deleteProduct);
   return router;
};

export default merchantRouter;
