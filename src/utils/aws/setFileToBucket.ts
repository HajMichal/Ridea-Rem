import { bucket, s3 } from "./config";

export const setFileToBucket = (
  fileContent: Buffer | string,
  key: string
): void => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: fileContent,
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File uploaded successfully. ETag: ${data.ETag}`);
    }
  });
};
