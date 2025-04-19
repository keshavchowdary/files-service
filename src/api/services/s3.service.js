const AWS = require("aws-sdk");
const { initConfig } = require("../../app.config");
const { AWS_ACCESS_METHODS } = require("../constants/s3.constant");
initConfig();
const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET } = process.env;

const s3 = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: S3_REGION,
});

async function uploadFileToS3({ file, makePublic }) {
  const { originalname, mimetype, buffer } = file;
  const params = {
    Bucket: S3_BUCKET,
    Key: `${Date.now()}-${originalname}`,
    Body: buffer,
    ContentType: mimetype,
    ACL: AWS_ACCESS_METHODS.PRIVATE,
  };
  return s3.upload(params).promise();
}

async function downloadFileFromS3({ key, bucket }) {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  return s3.getObject(params).createReadStream();
}

module.exports = {
  uploadFileToS3,
  downloadFileFromS3,
};
