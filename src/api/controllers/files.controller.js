const { successResponse, errorResponse } = require("../../utils/response.util");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require("../constants/files.constant");
const { uploadFileService, getFilesService, downloadFileService } = require("../services/files.service");

async function getFiles(req, res) {
  try {
    const { page, pageSize, type } = req.body;
    const data = await getFilesService({ page, pageSize, type });
    return successResponse({
      res,
      data,
      message: SUCCESS_MESSAGES.FILES_FETCHED,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: ERROR_MESSAGES.FILES_FETCHED,
      error,
    });
  }
}

async function uploadFile(req, res) {
  try {
    const { file } = req;
    const { makePublic } = req.query;
    const data = await uploadFileService({
      file,
      makePublic: JSON.parse(makePublic),
    });
    return successResponse({
      res,
      data,
      message: SUCCESS_MESSAGES.FILE_UPLOADED,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: ERROR_MESSAGES.FILE_UPLOADED,
      error,
    });
  }
}

async function downloadFile(req, res) {
  try {
    const { fileId } = req.query;
    const fileStream = await downloadFileService({ fileId });
    res.setHeader("Content-Disposition", `attachment; filename="${fileId}"`);
    fileStream.pipe(res);
  } catch (error) {
    return errorResponse({
      res,
      message: ERROR_MESSAGES.FILE_DOWNLOADED,
      error,
    });
  }
}

module.exports = {
  getFiles,
  uploadFile,
  downloadFile,
};
