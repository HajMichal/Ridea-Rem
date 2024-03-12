import AWS from "aws-sdk";

export const s3 = new AWS.S3();
const bucket = "ridearem";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});
export const setFileToBucket = (fileContent: Buffer | string, key: string) => {
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

export const getAllFilesFromBucket = async (key: string) => {
  const params = {
    Bucket: bucket,
    Prefix: key,
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
