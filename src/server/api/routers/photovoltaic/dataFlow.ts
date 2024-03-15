/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import { bucket, s3, setFileToBucket } from "~/utils/aws";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import {
  type PhotovoltaicCalculatorType,
  type EachMenagerPhotovoltaic,
} from "./interfaces";

const schema = z.record(
  z.object({
    dane: z.object({
      czterysta: z.object({
        dwa: z.number(),
        cztery: z.number(),
        szesc: z.number(),
        osiem: z.number(),
        dwanascie: z.number(),
        dwadziescia: z.number(),
        trzydziesci: z.number(),
        piecdziesiat: z.number(),
      }),
      czterysta_piecdziesiat: z.object({
        dwa: z.number(),
        cztery: z.number(),
        szesc: z.number(),
        osiem: z.number(),
        dwanascie: z.number(),
        dwadziescia: z.number(),
        trzydziesci: z.number(),
        piecdziesiat: z.number(),
      }),
      piecset: z.object({
        dwa: z.number(),
        cztery: z.number(),
        szesc: z.number(),
        osiem: z.number(),
        dwanascie: z.number(),
        dwadziescia: z.number(),
        trzydziesci: z.number(),
        piecdziesiat: z.number(),
      }),
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
      zbiornik_140L_z_wezem: z.number(),
      zbiornik_200L: z.number(),
      zbiornik_200L_z_wezem: z.number(),
    }),
    magazyn_energii_solax: z.object({
      prog0: z.number(),
      prog1: z.number(),
      prog2: z.number(),
      prog3: z.number(),
      prog4: z.number(),
      prog5: z.number(),
      prog6: z.number(),
      prog7: z.number(),
      prog8: z.number(),
    }),
    magazyn_energii_hipontech: z.object({
      prog0: z.number(),
      prog1: z.number(),
      prog2: z.number(),
    }),
    carPort: z.object({
      stan1: z.number(),
      stan2: z.number(),
      stan4: z.number(),
      stan6: z.number(),
      stan8: z.number(),
      stan10: z.number(),
      stan12: z.number(),
    }),
    magazynCiepla: z.number(),
    cena_skupu_pradu: z.number(),
    ems: z.number(),
    prowizjaBiura: z.number(),
    oprocentowanie_kredytu: z.number(),
  })
);

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: bucket,
      Key: "data.json",
    })
    .promise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const convertedFile: PhotovoltaicCalculatorType = JSON.parse(
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
        const object: EachMenagerPhotovoltaic | undefined =
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
            czterysta: {
              dwa: 4920,
              cztery: 4700,
              szesc: 4250,
              osiem: 3900,
              dwanascie: 3800,
              dwadziescia: 3600,
              trzydziesci: 3400,
              piecdziesiat: 3300,
            },
            czterysta_piecdziesiat: {
              dwa: 4921,
              cztery: 4700,
              szesc: 4250,
              osiem: 3900,
              dwanascie: 3800,
              dwadziescia: 3600,
              trzydziesci: 3400,
              piecdziesiat: 3300,
            },
            piecset: {
              dwa: 4922,
              cztery: 4700,
              szesc: 4250,
              osiem: 3900,
              dwanascie: 3800,
              dwadziescia: 3600,
              trzydziesci: 3400,
              piecdziesiat: 3300,
            },
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
            zbiornik_140L_z_wezem: 5300,
            zbiornik_200L: 5600,
            zbiornik_200L_z_wezem: 6200,
          },
          magazyn_energii_solax: {
            prog0: 15000,
            prog1: 18463,
            prog2: 29446,
            prog3: 38496,
            prog4: 47488,
            prog5: 58509,
            prog6: 65630,
            prog7: 74551,
            prog8: 84572,
          },
          magazyn_energii_hipontech: {
            prog0: 17000,
            prog1: 20000,
            prog2: 23000,
          },
          carPort: {
            stan1: 0,
            stan2: 0,
            stan4: 0,
            stan6: 0,
            stan8: 0,
            stan10: 0,
            stan12: 0,
          },
          magazynCiepla: 3900,
          cena_skupu_pradu: 0.72,
          ems: 1500,
          prowizjaBiura: 550,
          oprocentowanie_kredytu: 10.3,
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
