/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export interface JsonCalcData {
  magazynCiepla: number;
  cena_skupu_pradu: number;
  prowizjaBiura: number;
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
  zbiorniki: {
    zbiornik_100L: number;
    zbiornik_140L: number;
    zbiornik_200L: number;
    zbiornik_200L_z_wezem: number;
  };
}
/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
export interface CalculatorData {
  [key: string]: JsonCalcData;
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
const schema = z.record(
  z.object({
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
    zbiorniki: z.object({
      zbiornik_100L: z.number(),
      zbiornik_140L: z.number(),
      zbiornik_200L: z.number(),
      zbiornik_200L_z_wezem: z.number(),
    }),
    magazynCiepla: z.number(),
    cena_skupu_pradu: z.number(),
    prowizjaBiura: z.number(),
  })
);
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

const getParsedJsonObject = async () => {
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
  return convertedFile;
};

export const dataFlowRouter = createTRPCRouter({
  setJSONFile: publicProcedure.mutation(() => {
    const fileContent = fs.readFileSync("data.json");
    setFileToBucket(fileContent, "data.json");
  }),

  downloadFile: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const convertedFile = await getParsedJsonObject();

      function getObjectById(id: string) {
        const object: CalculatorData | undefined =
          convertedFile.kalkulator.find((item) => Object.keys(item)[0] === id);
        return object ? object[id] : null;
      }

      const userData = await ctx.prisma.user.findFirst({
        where: { id: input },
      });

      if (userData?.role === 1) {
        return getObjectById(userData.name!);
      } else if (userData?.role === 2) {
        return getObjectById(userData.name!);
      } else if (userData?.creatorId && userData.role === 3) {
        const creator = await ctx.prisma.user.findFirst({
          where: { id: userData.creatorId },
        });
        return getObjectById(creator?.name ?? "");
      }
    }),
  getEntireJsonFile: publicProcedure.query(async () => {
    return await getParsedJsonObject();
  }),
  editJSONFile: publicProcedure.input(schema).mutation(async ({ input }) => {
    const convertedFile = await getParsedJsonObject();
    const dynamicKey = Object.keys(input)[0];

    const index = convertedFile.kalkulator.findIndex(
      (obj) => Object.keys(obj)[0] === dynamicKey
    );

    if (index !== -1) {
      convertedFile.kalkulator[index] = input;
    }
    const updatedJSONFile = JSON.stringify(convertedFile);
    setFileToBucket(updatedJSONFile, "data.json");
    return input;
  }),
  removeMenagerData: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const convertedFile = await getParsedJsonObject();
      const index = convertedFile.kalkulator.findIndex(
        (obj) => Object.keys(obj)[0] === input
      );

      if (index !== -1) {
        convertedFile.kalkulator.splice(index, 1);
      }

      const updatedJSONFile = JSON.stringify(convertedFile);
      setFileToBucket(updatedJSONFile, "data.json");
      return input;
    }),
  addNewMenager: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const convertedFile = await getParsedJsonObject();

      const newMenagerData = {
        [input]: {
          dane: {
            dwa: 4920,
            cztery: 4700,
            szesc: 4250,
            osiem: 3900,
            dwanascie: 3800,
            dwadziescia: 3600,
            trzydziesci: 3400,
            piecdziesiat: 3300,
          },
          dotacje: {
            magazynCiepla: 5000,
            menagerEnergii: 3000,
            mojPrad: 6000,
            mp_mc: 7000,
          },
          koszty_dodatkowe: {
            bloczki: 850,
            tigo: 230,
            ekierki: 330,
            grunt: 850,
            inwerterHybrydowy: 5450,
            solarEdge: 335,
          },
          zbiorniki: {
            zbiornik_100L: 4900,
            zbiornik_140L: 5300,
            zbiornik_200L: 5600,
            zbiornik_200L_z_wezem: 6200,
          },
          magazynCiepla: 3900,
          cena_skupu_pradu: 0.72,
          prowizjaBiura: 550,
        },
      };
      convertedFile.kalkulator.push(newMenagerData);
      setFileToBucket(JSON.stringify(convertedFile), "data.json");
      return {
        status: 200,
        message:
          "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
      };
    }),
});
