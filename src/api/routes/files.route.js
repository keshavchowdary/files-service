const { multerUpload } = require("../../utils/multer.util");
const { getFiles, uploadFile, downloadFile } = require("../controllers/files.controller");
const {
  validateFileUpload,
  validateFilesListParams,
} = require("../middlewares/files.middleware");

function filesRoutes(app) {
  app.post("/files/list", validateFilesListParams, getFiles);
  app.post(
    "/files/upload",
    multerUpload.single("file"),
    validateFileUpload,
    uploadFile
  );
  app.get("/files/download", downloadFile);
}

module.exports = filesRoutes;
