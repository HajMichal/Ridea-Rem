import { bucket, s3 } from "./config";

export const downloadFileFromBucket = (fileName: string): string => {
  const params = {
    Bucket: bucket,
    Key: fileName,
    Expires: 60 * 30, // 30 minutes
  };
  const signedUrl = s3.getSignedUrl("getObject", params);
  return signedUrl;
};
