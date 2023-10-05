import { Router } from "express";
import {
   becomeMerchant,
   cartCount,
   getProduct,
   search,
   updateCart,
   viewCart,
} from "../controller/client.js";

const clientRouter = () => {
   const router = Router();
   router.route("/getProduct").get(getProduct);
   router.route("/viewCart").get(viewCart);
   router.route("/search/:searchTerm").get(search);
   router.route("/cartCount").get(cartCount);
   router.route("/updateCart").post(updateCart);
   router.route("/becomeMerchant").post(becomeMerchant);
   return router;
};

export default clientRouter;
