import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { s3, setFileToBucket } from "../photovoltaic/dataFlow";
import {
  type ForCompanyCalculatorType,
  type EachMenagerForCompany,
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
    koszty_dodatkowe: z.object({
      bloczki: z.number(),
      tigo: z.number(),
      ekierki: z.number(),
      grunt: z.number(),
    }),
    cena_skupu_pradu: z.number(),
    prowizjaBiura: z.number(),
    oprocentowanie_kredytu: z.number(),
  })
);

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: "ridearem",
      Key: "forCompany.json",
    })
    .promise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const convertedFile: ForCompanyCalculatorType = JSON.parse(
    dataFile?.Body?.toString() ?? "null"
  );
  return convertedFile;
};

export const forCompanyDataFlowRouter = createTRPCRouter({
  downloadFile: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const convertedFile = await getParsedJsonObject();
      function getObjectById(id: string) {
        const object: EachMenagerForCompany | undefined =
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
    console.log(input);
    const convertedFile = await getParsedJsonObject();
    const dynamicKey = Object.keys(input)[0];

    const index = convertedFile.kalkulator.findIndex(
      (obj) => Object.keys(obj)[0] === dynamicKey
    );
    if (index !== -1) {
      convertedFile.kalkulator[index] = input;
    }
    const updatedJSONFile = JSON.stringify(convertedFile);
    setFileToBucket(updatedJSONFile, "forCompany.json");
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
      setFileToBucket(updatedJSONFile, "forCompany.json");
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
              cztery: 4701,
              szesc: 4250,
              osiem: 3900,
              dwanascie: 3800,
              dwadziescia: 3600,
              trzydziesci: 3400,
              piecdziesiat: 3300,
            },
            piecset: {
              dwa: 4922,
              cztery: 4702,
              szesc: 4250,
              osiem: 3900,
              dwanascie: 3800,
              dwadziescia: 3600,
              trzydziesci: 3400,
              piecdziesiat: 3300,
            },
          },
          koszty_dodatkowe: {
            bloczki: 850,
            tigo: 230,
            ekierki: 330,
            grunt: 850,
          },
          cena_skupu_pradu: 0.72,
          prowizjaBiura: 550,
          oprocentowanie_kredytu: 8.3,
        },
      };
      convertedFile.kalkulator.push(newMenagerData);
      setFileToBucket(JSON.stringify(convertedFile), "forCompany.json");
      return {
        status: 200,
        message:
          "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
      };
    }),
});
