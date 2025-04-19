const { errorValidation } = require("../../utils/validation.util");
const { VALIDATION_MESSAGES, MAX_FILE_SIZE, FILE_TYPES } = require("../constants/files.constant");

function validateFileUpload(req, res, next) {
  const { file } = req;
  const { makePublic } = req.query;
  if (!file) {
    errorValidation({
      message: VALIDATION_MESSAGES.FILE_REQUIRED,
    });
  }
  if (file.size > MAX_FILE_SIZE) {
    errorValidation({
      message: VALIDATION_MESSAGES.FILE_SIZE_EXCEEDS,
    });
  }
  if (typeof JSON.parse(makePublic) !== "boolean") {
    errorValidation({
      message: VALIDATION_MESSAGES.MAKE_PUBLIC_BOOLEAN,
    });
  }
  next();
}

function validateFilesListParams(req, res, next) {
  const { page, pageSize, type } = req.body;
  if (page && (isNaN(page) || page <= 0)) {
    errorValidation({
      message: VALIDATION_MESSAGES.INVALID_PAGE,
    });
  }
  if (pageSize && (isNaN(pageSize) || pageSize <= 0)) {
    errorValidation({
      message: VALIDATION_MESSAGES.INVALID_PAGE_SIZE,
    });
  }
  const validTypes = Object.values(FILE_TYPES);
  if (type && !validTypes.includes(type)) {
    return errorValidation({
      message: VALIDATION_MESSAGES.INVALID_FILE_TYPE,
    });
  }
  next();
}

module.exports = {
  validateFileUpload,
  validateFilesListParams,
};
