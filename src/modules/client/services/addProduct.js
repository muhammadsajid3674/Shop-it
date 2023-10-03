const { STATUS_CODES, ERROR_MESSAGE } = require("../../../utils");
const asyncErrorHandler = require("../../../utils/asyncErrorHandler");

module.exports = (repository) => {
   async function execute(req, res, next) {
      const { userId } = req;
      const { name, category, description, price, imageUrl } = req.body;
      console.log("userId :>> ", userId);
      if (userId) {
         repository
            .create({ name, category, description, price, imageUrl, userId })
            .then((user) => {
               res.json({
                  message: "Password change successfully",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: user,
               });
            });
      }
      next(createHttpError(401, "Request not allowed"));
   }
   return { execute };
};
