const { HTTP } = require("./constants/statusCodes.constant");

function successResponse({
  res,
  data = {},
  message = "Success",
  code = HTTP.OK,
  serverTime = true,
}) {
  res.send({
    code,
    data,
    message,
    ...(serverTime && { serverTime: new Date().toISOString() }),
  });
}

function errorResponse({
  res,
  data = {},
  message = "Error",
  code = HTTP.INTERNAL_SERVER_ERROR,
  serverTime = true,
  error,
}) {
  console.log(error);
  res.send({
    code,
    data,
    message,
    ...(serverTime && { serverTime: new Date().toISOString() }),
  });
}

module.exports = {
  successResponse,
  errorResponse,
};
