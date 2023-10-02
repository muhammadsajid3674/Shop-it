const express = require("express");
const authRoutes = require("./modules/auth/route");
const { authenticate } = require("./utils/authenticate");

const Routes = () => {
   const router = express.Router();
   router.use("/auth", authenticate, authRoutes());
   return router;
};

module.exports = Routes;
