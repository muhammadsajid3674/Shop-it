const { responseJsonHandler } = require("../../utils");
const AddProduct = require("./services/addProduct");
const GetProduct = require("./services/getProduct");
const DeleteProduct = require("./services/deleteProduct");

module.exports = (repository) => {
   const addProduct = (req, res, next) => {
      AddProduct(repository)
         .execute(req, res, next)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => {
            responseJsonHandler(err, null, res);
         });
   };
   const getProduct = (req, res, next) => {
      GetProduct(repository)
         .execute(req, res, next)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => {
            responseJsonHandler(err, null, res);
         });
   };
   const deleteProduct = (req, res, next) => {
      DeleteProduct(repository)
         .execute(req, res, next)
         .then((result) => responseJsonHandler(null, result, res))
         .catch((err) => {
            responseJsonHandler(err, null, res);
         });
   };
   return { addProduct, getProduct, deleteProduct };
};
