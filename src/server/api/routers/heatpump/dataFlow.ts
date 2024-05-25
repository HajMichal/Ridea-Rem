import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { bucket, s3, setFileToBucket } from "~/utils/aws";
import {
  type EachMenagerHeatPump,
  type HeatPumpCalculatorType,
} from "./interfaces";

const heatpumpValidator = z.object({
  cena: z.number(),
  mnozik_prowizji: z.number(),
});

const schema = z.record(
  z.object({
    bufory: z.object({
      bufory100l: z.object({
        przylaczeSchemat24: z.number(),
        przylaczeSchemat34: z.number(),
      }),
    }),
    pompy_ciepla: z.record(heatpumpValidator),
    dodatki: z.object({
      kolejna_kaskada: z.number(),
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
      audyt: z.number(),
    }),
    dotacje: z.object({
      modernizacja_CO_CWU: z.object({
        prog1: z.number(),
        prog2: z.number(),
        prog3: z.number(),
        mojPrad: z.number(),
      }),
      pc: z.object({
        prog1: z.number(),
        prog2: z.number(),
        prog3: z.number(),
        mojPrad: z.number(),
      }),
    }),
    oprocentowanie_kredytu: z.number(),
    cena1kWh: z.number(),
    cop: z.number(),
  })
);

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: bucket,
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
  editJSONFile: adminProcedure.input(schema).mutation(async ({ input }) => {
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
        setFileToBucket(JSON.stringify(convertedFile), "heatpump.json");
        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
        };
      }
    }),
  addNewHeatPump: adminProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        fee: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const convertedFile = await getParsedJsonObject();

      convertedFile.kalkulator.forEach((calculator) => {
        const menager = Object.keys(calculator)[0];
        const newPump = {
          [input.name]: { cena: input.price, mnozik_prowizji: input.fee },
        };
        calculator[menager as keyof typeof convertedFile]!.pompy_ciepla = {
          ...calculator[menager as keyof typeof convertedFile]?.pompy_ciepla,
          ...newPump,
        };
      });
      setFileToBucket(JSON.stringify(convertedFile), "heatpump.json");
      return {
        status: 200,
        message: "Pompa ciepła została dodana do każdego menagera 📝",
      };
    }),
  removeHeatPump: adminProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const convertedFile = await getParsedJsonObject();

      convertedFile.kalkulator.forEach((calculator) => {
        const menager = Object.keys(calculator)[0];
        delete calculator[menager!]!.pompy_ciepla[input];
      });
      setFileToBucket(JSON.stringify(convertedFile), "heatpump.json");
      return {
        status: 200,
        message: "Pompa ciepła została usunięta📝",
      };
    }),
});
