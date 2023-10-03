import { Router } from "express";
import authRouter from "./routers/auth.js";
import authMiddleware from "./middleware/auth.js";

const Routes = () => {
   const router = Router();
   router.use("/auth", authMiddleware.authorize, authRouter());
   return router;
};

export default Routes;
