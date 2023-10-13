import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { s3, setFileToBucket } from "../photovoltaic/dataFlow";
import {
  type EachMenagerHeatPump,
  type HeatPumpCalculatorType,
} from "./interfaces";

const schema = z.record(
  z.object({
    bufory: z.object({
      bufory100l: z.object({
        przylaczeSchemat17: z.number(),
        przylaczeSchemat24: z.number(),
        przylaczeSchemat34: z.number(),
      }),
      bufory300l: z.object({
        przylaczeSchemat17: z.number(),
        przylaczeSchemat24: z.number(),
        przylaczeSchemat34: z.number(),
      }),
      bufory500l: z.object({
        przylaczeSchemat17: z.number(),
        przylaczeSchemat24: z.number(),
        przylaczeSchemat34: z.number(),
      }),
    }),
    pompy_ciepla: z.object({
      // [serieName: string]: {
      //   cena: number;
      //   mnozik_prowizji: number;
      // };
      "Z-PRO53/4MitsubishiInv11-16": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "Z-PRO53/4MitsubishiIHO11-16": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SAT63DanfossInv14-23": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SAT63DanfossIHO14-24": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI82P19i17-29": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI83P23i20-32": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI83P26i23-34": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI83P30i25-37": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI82P19iHO25-35": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI83P23iHO30-41": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI83P26iHO35-45": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
      "SATELI83P30iHO37-48": z.object({
        cena: z.number(),
        mnozik_prowizji: z.number(),
      }),
    }),
    dodatki: z.object({
      kolejna_kaskada: z.number(),
      posadowienie_rozsaczanie: z.number(),
      przewierty: z.number(),
      poprowadzenie_instalacji_wierzchu: z.number(),
      rura_preizolowana: z.number(),
      dodatkowe_rury_preizolowane: z.number(),
      cyrkulacja_cwu: z.number(),
      demontaz_kotla: z.number(),
      posprzatanie: z.number(),
      przeniesienie_zasobnika: z.number(),
      wykonanie_przylacza: z.number(),
      spiecie_bufora: z.number(),
      zamkniecie_ukladu_otwartego: z.number(),
    }),
    dotacje: z.object({
      modernizacja_CO_CWU: z.object({
        prog1: z.number(),
        prog2: z.number(),
        prog3: z.number(),
      }),
      pc: z.object({
        prog1: z.number(),
        prog2: z.number(),
        prog3: z.number(),
      }),
    }),
    oprocentowanie_kredytu: z.number(),
  })
);

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: "ridearem",
      Key: "heatpump.json",
    })
    .promise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const convertedFile: HeatPumpCalculatorType = JSON.parse(
    dataFile?.Body?.toString() ?? "null"
  );
  return convertedFile;
};

export const heatPumpDataFlowRouter = createTRPCRouter({
  downloadFile: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const convertedFile = await getParsedJsonObject();
      function getObjectById(id: string) {
        const object: EachMenagerHeatPump | undefined =
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
  downloadEntireJsonFile: publicProcedure.query(async () => {
    return await getParsedJsonObject();
  }),
  editJSONFile: publicProcedure.input(schema).mutation(async ({ input }) => {
    const convertedFile: HeatPumpCalculatorType = await getParsedJsonObject();
    const dynamicKey = Object.keys(input)[0];

    const index = convertedFile.kalkulator.findIndex(
      (obj) => Object.keys(obj)[0] === dynamicKey
    );

    if (index !== -1 && dynamicKey) {
      convertedFile.kalkulator[index] = input;
    }

    const updatedJSONFile = JSON.stringify(convertedFile);
    setFileToBucket(updatedJSONFile, "heatpump.json");
    return input;
  }),
});
