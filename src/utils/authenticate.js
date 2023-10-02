import dotenv from "dotenv";
import createHttpError from "http-errors";

dotenv.config();

export const authenticate = (req, res, next) => {
   const authKey = req.headers.authorization;

   if (!authKey || authKey !== process.env.AUTHKEY) {
      return next(createHttpError(401, "Unauthorized"));
   }
   next();
};
