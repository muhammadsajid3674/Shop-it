const { responseJsonHandler } = require("../../utils");
const Login = require("./services/login");
const Signup = require("./services/signup");
const ForgetPassword = require("./services/forgetPassword");
const ChangePassword = require("./services/changePassword");

module.exports = (repository) => {
  const login = (req, res) => {
    Login(repository)
      .execute(req.body)
      .then((result) => responseJsonHandler(null, result, res))
      .catch((err) => {
        responseJsonHandler(err, null, res);
      });
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
  return { login, signup, forgetPassword, changePassword };
};
