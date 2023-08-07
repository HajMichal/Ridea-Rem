import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { streamToString } from "~/functions/streamToString";
import fs from "fs";

export default async function saveFile(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const s3 = new AWS.S3();
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-central-1",
  });

  const s3Client = new S3Client({ region: "eu-central-1" });
  const getObjectCommand = new GetObjectCommand({
    Bucket: "ridearem",
    Key: "data.json",
  });

  const { Body } = await s3Client.send(getObjectCommand);
  const fileContents = await streamToString(Body!);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonData = JSON.parse(fileContents);
  fs.writeFileSync("./tmp/data.json", JSON.stringify(jsonData));

  const dataFile = await s3
    .getObject({
      Bucket: "ridearem",
      Key: "data.json",
    })
    .promise();
  const resData: unknown = JSON.parse(dataFile?.Body?.toString() ?? "null");
  res.status(200).json(resData);
}
