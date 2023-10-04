import { Router } from "express";
import {
   forgotPassword,
   login,
   resetPassword,
   signup,
} from "../controller/auth.js";

const authRouter = () => {
   const router = Router();
   router.route("/register").post(signup);
   router.route("/login").post(login);
   router.route("/forgotPassword").post(forgotPassword);
   router.route("/resetPassword").post(resetPassword);
   return router;
};

export default authRouter;
