const dotenv = require("dotenv");
const createHttpError = require("http-errors");

dotenv.config();

exports.authenticate = (req, res, next) => {
   const authKey = req.headers.authorization;

   if (!authKey || authKey !== process.env.AUTHKEY) {
      return next(createHttpError(401, "Unauthorized"));
   }
   next();
};
