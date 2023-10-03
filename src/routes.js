const express = require("express");
const authRoutes = require("./modules/auth/route");
const merchantRoutes = require("./modules/merchant/route");
const clientRoutes = require("./modules/client/route");
const authMiddleware = require("./middleware/auth.middleware");

const Routes = () => {
   const router = express.Router();
   router.use("/auth", authMiddleware.authorize, authRoutes());
   router.use(
      "/merchant",
      authMiddleware.authenticate,
      authMiddleware.authenticateMerchant,
      merchantRoutes()
   );
   router.use("/client", authMiddleware.authenticate, clientRoutes());
   return router;
};

module.exports = Routes;
