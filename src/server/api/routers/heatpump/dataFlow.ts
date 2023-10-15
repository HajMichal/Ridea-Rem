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
      setFileToBucket(updatedJSONFile, "heatpump.json");
      return input;
    }),
  addNewMenager: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const convertedFile = await getParsedJsonObject();

      const newMenagerData = {
        [input]: {
          bufory: {
            bufory100l: {
              przylaczeSchemat17: 13114,
              przylaczeSchemat24: 14500,
              przylaczeSchemat34: 18010,
            },
            bufory300l: {
              przylaczeSchemat17: 14414,
              przylaczeSchemat24: 15900,
              przylaczeSchemat34: 19410,
            },
            bufory500l: {
              przylaczeSchemat17: 16320,
              przylaczeSchemat24: 17800,
              przylaczeSchemat34: 22548,
            },
          },
          pompy_ciepla: {
            "Z-PRO53/4MitsubishiInv11-16": {
              cena: 32980,
              mnozik_prowizji: 12,
            },
            "Z-PRO53/4MitsubishiIHO11-16": {
              cena: 39730,
              mnozik_prowizji: 15,
            },
            "SAT63DanfossInv14-23": { cena: 32389, mnozik_prowizji: 12 },
            "SAT63DanfossIHO14-24": { cena: 36889, mnozik_prowizji: 15 },

            "SATELI82P19i17-29": { cena: 41587, mnozik_prowizji: 18 },
            "SATELI83P23i20-32": { cena: 48545, mnozik_prowizji: 22 },
            "SATELI83P26i23-34": { cena: 50801, mnozik_prowizji: 25 },
            "SATELI83P30i25-37": { cena: 51865, mnozik_prowizji: 28 },

            "SATELI82P19iHO25-35": { cena: 46087, mnozik_prowizji: 22 },
            "SATELI83P23iHO30-41": { cena: 53045, mnozik_prowizji: 27 },
            "SATELI83P26iHO35-45": { cena: 55301, mnozik_prowizji: 31 },
            "SATELI83P30iHO37-48": { cena: 56365, mnozik_prowizji: 34 },
          },
          dodatki: {
            kolejna_kaskada: 3500,
            posadowienie_rozsaczanie: 2500,
            przewierty: 300,
            poprowadzenie_instalacji_wierzchu: 30,
            rura_preizolowana: 2000,
            dodatkowe_rury_preizolowane: 350,
            cyrkulacja_cwu: 2000,
            demontaz_kotla: 1600,
            posprzatanie: 1000,
            przeniesienie_zasobnika: 1200,
            wykonanie_przylacza: 600,
            spiecie_bufora: 5200,
            zamkniecie_ukladu_otwartego: 1200,
          },
          dotacje: {
            modernizacja_CO_CWU: {
              prog1: 8100,
              prog2: 14300,
              prog3: 20400,
            },
            pc: {
              prog1: 19400,
              prog2: 28100,
              prog3: 35200,
            },
          },
          oprocentowanie_kredytu: 8.3,
        },
      };
      convertedFile.kalkulator.push(newMenagerData);
      setFileToBucket(JSON.stringify(convertedFile), "heatpump.json");
      return {
        status: 200,
        message:
          "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
      };
    }),
});
