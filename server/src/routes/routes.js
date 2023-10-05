import { Router } from "express";
import authRouter from "./auth.js";
import authMiddleware from "../middleware/auth.js";
import clientRouter from "./client.js";
import merchantRouter from "./merchant.js";

const Routes = () => {
   const router = Router();
   router.use("/auth", authMiddleware.authorize, authRouter());
   router.use("/client", authMiddleware.authenticate, clientRouter());
   router.use(
      "/merchant",
      authMiddleware.authenticate,
      authMiddleware.authenticateMerchant,
      merchantRouter()
   );
   return router;
};

export default Routes;
