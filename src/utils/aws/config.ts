import AWS from "aws-sdk";

export const s3 = new AWS.S3();
export const bucket = process.env.BUCKET!;
export const prefix = "documents";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});
