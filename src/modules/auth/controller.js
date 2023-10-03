const { responseJsonHandler } = require("../../utils");
const Login = require("./services/login");
const Signup = require("./services/signup");
const ForgetPassword = require("./services/forgetPassword");
const ChangePassword = require("./services/changePassword");
const ResetPassword = require("./services/resetPassword");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");

module.exports = (repository) => {
   const login = (req, res, next) => {
      asyncErrorHandler(Login(repository).execute(req, res, next));
   };
   const signup = (req, res) => {
      Signup(repository)
         .execute(req.body)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => {
            responseJsonHandler(err, null, res);
         });
   };
   const forgetPassword = (req, res) => {
      ForgetPassword(repository)
         .execute(req.body)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => responseJsonHandler(err, null, res));
   };
   const changePassword = (req, res) => {
      ChangePassword(repository)
         .execute(req.body)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => responseJsonHandler(err, null, res));
   };
   const resetPassword = (req, res) => {
      ResetPassword(repository)
         .execute(req.body)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => responseJsonHandler(err, null, res));
   };
   return { login, signup, forgetPassword, changePassword, resetPassword };
};
