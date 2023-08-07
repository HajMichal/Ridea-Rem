/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import { z } from "zod";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      const fileContent = fs.readFileSync("./data.json");

      setFileToBucket(fileContent, "./data.json");
    }),
  downloadFile: publicProcedure.query(async () => {
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
    s3.getObject({
      Bucket: "ridearem",
      Key: "db.sqlite",
    });
    return "success";
  }),
});
