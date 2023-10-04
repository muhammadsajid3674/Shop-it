import { Router } from "express";
import { becomeMerchant, getProduct } from "../controller/client.js";

const clientRouter = () => {
   const router = Router();
   router.route("/becomeMerchant").post(becomeMerchant);
   router.route("/getProduct").get(getProduct);
   return router;
};

export default clientRouter;
