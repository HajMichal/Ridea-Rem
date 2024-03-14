import { bucket, s3 } from "./config";

export const removeFileFromBucket = async (fileName: string): Promise<void> => {
  const params = {
    Bucket: bucket,
    Key: fileName,
  };
  try {
    await s3.deleteObject(params).promise();
    console.log(`File ${fileName} was deleted properly`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};
