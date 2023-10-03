const { responseJsonHandler } = require("../../utils");
const BecomeMerchant = require("./services/becomeMerchant");

module.exports = (repository) => {
   const becomeMerchant = (req, res) => {
      BecomeMerchant(repository)
         .execute(req, res, next)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => {
            responseJsonHandler(err, null, res);
         });
   };
   return { becomeMerchant };
};
