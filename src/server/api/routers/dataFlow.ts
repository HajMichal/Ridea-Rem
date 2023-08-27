/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

const s3 = new AWS.S3();
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

export const dataFlowRouter = createTRPCRouter({
  setJSONFile: publicProcedure.mutation(() => {
    const fileContent = fs.readFileSync("data.json");
    setFileToBucket(fileContent, "data.json");
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
  editJSONFile: publicProcedure
    .input(
      z.object({
        kalkulator: z.object({
          dane: z.object({
            dwa: z.number(),
            cztery: z.number(),
            szesc: z.number(),
            osiem: z.number(),
            dwanascie: z.number(),
            dwadziescia: z.number(),
            trzydziesci: z.number(),
            piecdziesiat: z.number(),
          }),
          dotacje: z.object({
            magazynCiepla: z.number(),
            menagerEnergii: z.number(),
            mojPrad: z.number(),
            mp_mc: z.number(),
          }),
          koszty_dodatkowe: z.object({
            bloczki: z.number(),
            tigo: z.number(),
            ekierki: z.number(),
            grunt: z.number(),
            inwerterHybrydowy: z.number(),
            solarEdge: z.number(),
          }),
          magazynCiepla: z.number(),
          tarczaSolidarnosciowa: z.array(z.string()),
          prowizjaBiura: z.number(),
        }),
      })
    )
    .mutation(({ input }) => {
      const updatedJSONFile = JSON.stringify(input);
      setFileToBucket(updatedJSONFile, "data.json");
      return input;
    }),
});
