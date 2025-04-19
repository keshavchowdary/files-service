function isValidString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function errorValidation({ message = "Invalid input", code = 400 }) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

module.exports = {
  isValidString,
  errorValidation,
};
