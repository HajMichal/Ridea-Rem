/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const jsonFile = fs.readFileSync("./data.json");

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
function streamToString(stream: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    stream.on("error", reject);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

export const dataFlowRouter = createTRPCRouter({
  setFile: publicProcedure.mutation(async () => {
    await s3
      .putObject({
        Bucket: "ridearem",
        Key: "data.json",
        Body: jsonFile,
      })
      .promise();
  }),
  downloadFile: publicProcedure.query(async () => {
    const s3Client = new S3Client({ region: "eu-central-1" });
    const getObjectCommand = new GetObjectCommand({
      Bucket: "ridearem",
      Key: "data.json",
    });

    const { Body } = await s3Client.send(getObjectCommand);
    const fileContents = await streamToString(Body!);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonData = JSON.parse(fileContents);
    fs.writeFileSync("data.json", JSON.stringify(jsonData));

    const dataFile = await s3
      .getObject({
        Bucket: "ridearem",
        Key: "data.json",
      })
      .promise();

    return JSON.stringify(dataFile);
  }),
});
