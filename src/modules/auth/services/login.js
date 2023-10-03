const jwt = require("jsonwebtoken");

const { ERROR_MESSAGE, STATUS_CODES } = require("../../../utils");

module.exports = (repository) => {
   async function execute(req, res) {
      const { email, password } = req.body;
      return new Promise(async (resolve, reject) => {
         const user = await repository.getByEmail(email);
         if (user) {
            if (await user.comparePassword(password)) {
               const result = user.toObject();
               delete result.password;
               const token = jwt.sign(result, process.env.JWT_SECRET_KEY);
               res.cookie("ezToken", token, { maxAge: 900000, httpOnly: true });
               console.log("object :>> ", token);
               return resolve({
                  message: "User logged in successfully",
                  statusCode: STATUS_CODES.SUCCESS,
                  success: true,
                  data: res,
               });
            } else {
               ERROR_MESSAGE["001"].message = "Invalid Password";
               return reject(ERROR_MESSAGE["001"]);
            }
         } else {
            ERROR_MESSAGE["001"].message = "User not found";
            return reject(ERROR_MESSAGE["001"]);
         }
      });
   }
   return { execute };
};
