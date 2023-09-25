/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
export interface CalculatorData {
  [key: string]: {
    dane: {
      dwa: number;
      cztery: number;
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
    };
    dotacje: {
      magazynCiepla: number;
      menagerEnergii: number;
      mojPrad: number;
      mp_mc: number;
    };
    koszty_dodatkowe: {
      bloczki: number;
      tigo: number;
      ekierki: number;
      grunt: number;
      inwerterHybrydowy: number;
      solarEdge: number;
    };
    magazynCiepla: number;
    cena_skupu_pradu: number;
    prowizjaBiura: number;
  };
}

interface CalculatorType {
  kalkulator: CalculatorData[];
}

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

  downloadFile: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      const dataFile = await s3
        .getObject({
          Bucket: "ridearem",
          Key: "data.json",
        })
        .promise();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const convertedFile: CalculatorType = JSON.parse(
        dataFile?.Body?.toString() ?? "null"
      );

      function getObjectById(id: string) {
        const object: CalculatorData | undefined =
          convertedFile.kalkulator.find((item) => Object.keys(item)[0] === id);
        return object ? object[id] : null;
      }

      const userData = await ctx.prisma.user.findFirst({
        where: { id: input },
      });

      if (userData?.role === 1) {
        return getObjectById(userData.id);
      } else if (userData?.role === 2) {
        return getObjectById(userData.id);
      } else if (userData?.creatorId && userData.role === 3) {
        return getObjectById(userData.creatorId);
      }
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
          cena_skupu_pradu: z.number(),
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
