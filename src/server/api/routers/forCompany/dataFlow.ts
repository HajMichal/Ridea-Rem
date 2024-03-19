import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import {
  type ForCompanyCalculatorType,
  type EachMenagerForCompany,
} from "./interfaces";
import { setFileToBucket, s3, bucket } from "~/utils/aws";

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
        overpiecdziesiat: z.number(),
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
        overpiecdziesiat: z.number(),
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
        overpiecdziesiat: z.number(),
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
      Bucket: bucket,
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

      if (convertedFile.kalkulator[0]) {
        const mainCalculationData =
          convertedFile.kalkulator[0]["Adrian Szymborski"]!;

        const newMenagerData = {
          [input]: mainCalculationData,
        };
        convertedFile.kalkulator.push(newMenagerData);
        setFileToBucket(JSON.stringify(convertedFile), "forCompany.json");
        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
        };
      }
    }),
});
