const { STATUS_CODES, ERROR_MESSAGE } = require("../../../utils");
const asyncErrorHandler = require("../../../utils/asyncErrorHandler");

module.exports = asyncErrorHandler((repository) => {
   async function execute(req, res, next) {
      return new Promise((resolve, reject) => {
         const { userId } = req;
         const { page: pageNumber, limit } = req.params;
         if (userId) {
            repository.getAllPaginate(userId, pageNumber, limit).then((res) => {
               resolve({
                  message: "Password change successfully",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: res,
               });
            });
         }
         next(createHttpError(401, "Request not allowed"));
      });
   }
   return { execute };
});
