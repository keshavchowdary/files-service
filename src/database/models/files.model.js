const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "pdf", "video", "audio", "document", "other"],
      default: "other",
    },
    name: { type: String, required: true },
    originalName: { type: String, required: true },
    sizeInKb: { type: Number, required: true },
    mimeType: { type: String, required: true },
    s3Url: { type: String, required: true },
    s3Bucket: { type: String, required: true },
    s3Key: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);
