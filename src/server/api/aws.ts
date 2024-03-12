import AWS from "aws-sdk";

export const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});

export const setFileToBucket = (fileContent: Buffer | string, key: string) => {
  const params = {
    Bucket: "ridearem",
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
