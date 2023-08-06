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

export const setFileToBucket = (fileContent: Buffer, key: string) => {
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

export const dataFlowRouter = createTRPCRouter({
  setJSONFile: publicProcedure
    .input(z.object({ imie: z.string() }))
    .mutation(() => {
      const fileContent = fs.readFileSync("./tmp/data.json");

      setFileToBucket(fileContent, "./tmp/data.json");
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
    fs.writeFileSync("./tmp/data.json", JSON.stringify(jsonData));

    const dataFile = await s3
      .getObject({
        Bucket: "ridearem",
        Key: "data.json",
      })
      .promise();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(dataFile?.Body?.toString() ?? "null");
  }),
  setSQLiteFile: publicProcedure.mutation(() => {
    const fileContent = fs.readFileSync("./prisma/db.sqlite");

    setFileToBucket(fileContent, "db.sqlite");
  }),
  downloadSQLiteFile: publicProcedure.query(() => {
    s3.getObject(
      {
        Bucket: "ridearem",
        Key: "db.sqlite",
      },
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const fileData = data.Body!;
          console.log("success");

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fs.writeFileSync("prisma/db.sqlite", fileData);
        }
      }
    );
    return "success";
  }),
});
