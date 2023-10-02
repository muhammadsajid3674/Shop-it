const express = require("express");
const authRoutes = require("./modules/auth/route");

const Routes = () => {
  const router = express.Router();
  router.use("/auth", authRoutes());
  return router;
};

module.exports = Routes;
