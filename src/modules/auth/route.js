const { Router } = require("express");
const UserModel = require("./data_access/model");
const AuthRepository = require("./repository");
const AuthController = require("./controller");

const authRoutes = () => {
   const model = UserModel;
   const repository = new AuthRepository(model);
   const router = Router();
   const controller = AuthController(repository);

   router.route("/").get(controller.login).post(controller.signup);
   router.route("/forgotPassword").post(controller.forgetPassword);
   router.route("/changePassword").post(controller.changePassword);
   router.route("/resetPassword").post(controller.resetPassword);
   return router;
};

module.exports = authRoutes;
