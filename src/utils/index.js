module.exports = {
  STATUS_CODES: Object.freeze({
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  }),
  ERROR_MESSAGE: require("./error"),
  ENV: require("./env-variable"),
  upload: require("./upload"),

  responseJsonHandler: (error, data, expressResponse) => {
    let obj = { error: error, data: data };
    if (obj.error) {
      expressResponse.status(400).json(obj.error);
    } else {
      expressResponse.status(200).json(obj.data);
    }
  },
};
