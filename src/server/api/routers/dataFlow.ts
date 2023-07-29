/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import { z } from "zod";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { streamToString } from "~/functions/streamToString";

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});

export const dataFlowRouter = createTRPCRouter({
  setFile: publicProcedure
    .input(z.object({ imie: z.string() }))
    .mutation(async ({ input }) => {
      const jsonFile = fs.readFileSync("./data.json");

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = JSON.parse(jsonFile.toString());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.przywitanie = input.imie;
      const updatedFileContent = JSON.stringify(data);

      await s3
        .putObject({
          Bucket: "ridearem",
          Key: "data.json",
          Body: updatedFileContent,
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
    const jsonContent = dataFile.Body?.toString();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (!jsonContent) return null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonObject = JSON.parse(jsonContent);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return jsonObject;
  }),
});
