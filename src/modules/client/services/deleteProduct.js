const { STATUS_CODES, ERROR_MESSAGE } = require("../../../utils");
const asyncErrorHandler = require("../../../utils/asyncErrorHandler");

module.exports = asyncErrorHandler((repository) => {
   async function execute(req, res, next) {
      return new Promise((resolve, reject) => {
         const { userId } = req;
         const { productId } = req.body;
         if (userId) {
            repository.delete({ _id: productId, userId }).then((res) => {
               resolve({
                  message: "Product deleted",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
               });
            });
         }
         next(createHttpError(401, "Request not allowed"));
      });
   }
   return { execute };
});
