/* eslint-disable @typescript-eslint/no-unsafe-call */
import { bucket, s3, setFileToBucket } from "~/utils/aws";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { type PhotovoltaicCalculatorType } from "./interfaces";

const schema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  panels_small: z.object({
    dwa: z.number(),
    cztery: z.number(),
    szesc: z.number(),
    osiem: z.number(),
    dwanascie: z.number(),
    dwadziescia: z.number(),
    trzydziesci: z.number(),
    piecdziesiat: z.number(),
  }),
  panels_medium: z.object({
    dwa: z.number(),
    cztery: z.number(),
    szesc: z.number(),
    osiem: z.number(),
    dwanascie: z.number(),
    dwadziescia: z.number(),
    trzydziesci: z.number(),
    piecdziesiat: z.number(),
  }),
  panels_large: z.object({
    dwa: z.number(),
    cztery: z.number(),
    szesc: z.number(),
    osiem: z.number(),
    dwanascie: z.number(),
    dwadziescia: z.number(),
    trzydziesci: z.number(),
    piecdziesiat: z.number(),
  }),
  dotations: z.object({
    magazynCiepla: z.number(),
    menagerEnergii: z.number(),
    mojPrad: z.number(),
    mp_mc: z.number(),
  }),
  addons: z.object({
    bloczki: z.number(),
    tigo: z.number(),
    ekierki: z.number(),
    certyfikowaneEkierki: z.number(),
    grunt: z.number(),
    inwerterHybrydowy: z.number(),
    magazynCiepla: z.number(),
    ems: z.number(),
  }),
  boilers: z.object({
    zbiornik_100L: z.number(),
    zbiornik_140L: z.number(),
    zbiornik_140L_z_wezem: z.number(),
    zbiornik_200L: z.number(),
    zbiornik_200L_z_wezem: z.number(),
  }),
  energyStore: z.object({
    solax: z.number(),
    hipontech: z.number(),
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
  electricityPrice: z.number(),
  creditPercentage: z.number(),
});

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
  downloadFile: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.photovoltaic.findUnique({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
    });
  }),
  getEntireJsonFile: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.photovoltaic.findMany();
  }),
  editJSONFile: adminProcedure
    .input(schema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.photovoltaic.update({
        where: {
          userId: input.userId,
        },
        data: input,
      });

      return input;
    }),
  removeMenagerData: adminProcedure
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
  addNewMenager: adminProcedure
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
        setFileToBucket(JSON.stringify(convertedFile), "data.json");
        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
        };
      }
    }),
});
