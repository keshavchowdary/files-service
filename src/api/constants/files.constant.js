const SUCCESS_MESSAGES = {
  FILE_UPLOADED: "File uploaded successfully",
  FILES_FETCHED: "Files fetched successfully",
  FILE_DOWNLOADED: "File downloaded successfully",
};

const ERROR_MESSAGES = {
  FILE_UPLOADED: "File upload failed",
  FILES_FETCHED: "Files fetch failed",
  FILE_DOWNLOADED: "File download failed",
  FILE_NOT_FOUND: "File not found",
};

const VALIDATION_MESSAGES = {
  FILE_REQUIRED: "File is required",
  FILE_SIZE_EXCEEDS: "File size exceeds limit. Select file less than 5MB",
  MAKE_PUBLIC_BOOLEAN: "makePublic should be a boolean",
  INVALID_PAGE: "Invalid page number",
  INVALID_PAGE_SIZE: "Invalid page size",
  INVALID_FILE_TYPE: "Invalid file type",
};

const FILE_TYPES = {
  IMAGE: "image",
  PDF: "pdf",
  VIDEO: "video",
  AUDIO: "audio",
  DOCUMENT: "document",
  OTHER: "other",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

const DOCUMENT_MIME_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];

const BYTES_IN_KB = 1024;

module.exports = {
  FILE_TYPES,
  DOCUMENT_MIME_TYPES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  BYTES_IN_KB,
  VALIDATION_MESSAGES,
  MAX_FILE_SIZE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
};
