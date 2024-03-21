import { s3, bucket, prefix } from "./config";
import { setFileToBucket } from "./documents/setFileToBucket";
import { downloadFileFromBucket } from "./documents/downloadFileFromBucket";
import { removeFileFromBucket } from "./documents/removeFileFromBucket";
import { getAllFilesFromBucket } from "./documents/getAllFilesFromBucket";

export {
  s3,
  bucket,
  prefix,
  setFileToBucket,
  downloadFileFromBucket,
  removeFileFromBucket,
  getAllFilesFromBucket,
};
