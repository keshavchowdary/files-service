const { uploadFileToS3, downloadFileFromS3 } = require("./s3.service");
const FileModel = require("../../database/models/files.model");
const {
  FILE_TYPES,
  DOCUMENT_MIME_TYPES,
  BYTES_IN_KB,
  ERROR_MESSAGES,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} = require("../constants/files.constant");
const { paginate } = require("../../utils/pagination.util");

function detectFileType(mimeType) {
  if (mimeType.startsWith("image/")) return FILE_TYPES.IMAGE;
  if (mimeType === "application/pdf") return FILE_TYPES.PDF;
  if (mimeType.startsWith("video/")) return FILE_TYPES.VIDEO;
  if (mimeType.startsWith("audio/")) return FILE_TYPES.AUDIO;
  if (DOCUMENT_MIME_TYPES.includes(mimeType)) return FILE_TYPES.DOCUMENT;
  return FILE_TYPES.OTHER;
}

async function uploadFileService({ file, makePublic = false }) {
  const s3Data = await uploadFileToS3({ file, makePublic });
  const { Location: s3Url, Key: s3Key, Bucket: s3Bucket } = s3Data;
  const { originalname, mimetype, size } = file;
  const type = detectFileType(mimetype);
  const sizeInKb = Math.round(size / BYTES_IN_KB);
  const document = new FileModel({
    type,
    name: originalname,
    originalName: originalname,
    sizeInKb,
    mimeType: mimetype,
    s3Url,
    s3Bucket,
    s3Key,
  });
  const newFile = await document.save();
  return newFile;
}

async function getFilesService({
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  type,
}) {
  const { skip, limit } = paginate({ page, pageSize });
  const findQuery = {};
  if (type) {
    findQuery.type = type;
  }
  const projection = {
    s3Url: 1,
    originalName: 1,
    sizeInKb: 1,
    createdAt: 1,
    type: 1,
  };
  const files = await FileModel.find(findQuery, projection)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const paginationInfo = { page, pageSize };
  if (page === 1) {
    const totalRecords = await FileModel.countDocuments(findQuery);
    paginationInfo.totalRecords = totalRecords;
    paginationInfo.totalPages = Math.ceil(totalRecords / pageSize);
  }
  return {
    files,
    paginationInfo,
  };
}

async function downloadFileService({ fileId }) {
  const findQuery = { _id: fileId };
  const projection = { s3Key: 1, s3Bucket: 1 };
  const file = await FileModel.findOne(findQuery, projection);
  if (!file) {
    throw new Error(ERROR_MESSAGES.FILE_NOT_FOUND);
  }
  const { s3Key, s3Bucket } = file;
  return downloadFileFromS3({
    key: s3Key,
    bucket: s3Bucket,
  });
}

module.exports = {
  uploadFileService,
  getFilesService,
  downloadFileService,
};
