const { successResponse, errorResponse } = require("../../utils/response.util");

function checkHealth(req, res) {
  try {
    return successResponse({
      res,
      data: { status: "UP" },
      message: "Service is running",
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Service is down",
    });
  }
}

module.exports = {
  checkHealth,
};
