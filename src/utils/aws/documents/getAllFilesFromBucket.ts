import { bucket, s3 } from "../config";

export const getAllFilesFromBucket = async (
  prefix: "documents" | "specification"
): Promise<string[]> => {
  const params = {
    Bucket: bucket,
    Prefix: prefix,
  };

  try {
    const contents: string[] = [];
    const data = await s3.listObjectsV2(params).promise();
    data.Contents?.map((file) => {
      if (file.Size! > 0) contents.push(file.Key!);
    });
    return contents;
  } catch (error) {
    throw error;
  }
};
