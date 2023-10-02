const { STATUS_CODES } = require("./constant");

module.exports = {
    "001": {
        error: "Unknown error, during create document in db",
        success: false,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    "002": {
        error: "Unknown error, during get document from db",
        success: false,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    "003": {
        error: "Unprocessable Entity",
        success: false,
        statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY
    },
    "004": {
        error: "Required field are missing",
        success: false,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    "005": {
        error: "Unknown error, during update document in db",
        success: false,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    "006": {
        error: "Unknown error, during delete document from db",
        success: false,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    "007": {
        error: "No record found",
        success: false,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    "008": {
        error: "Unauthorized Error",
        success: false,
        statusCode: STATUS_CODES.UNAUTHORIZED
    },
    "009": {
        error: "Internal Server Error",
        success: false,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR
    },
    "010": {
        message: "Validation  Error",
        success: false,
        statusCode: STATUS_CODES.UNPROCESSABLE_ENTITY
    },
};