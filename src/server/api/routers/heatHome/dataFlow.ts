import { createTRPCRouter, publicProcedure } from "../../trpc";
import { bucket, s3, setFileToBucket } from "~/utils/aws";
import {
  type EachMenagerHeatHome,
  type HeatHomeCalculatorType,
} from "./interfaces";
import { z } from "zod";

const schema = z.record(
  z.object({
    m2_ocieplenia: z.number(),
    parapety: z.number(),
    tynk: z.number(),
    wykonczenie: z.number(),
    audytEnergetyczny: z.number(),
  })
);

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: bucket,
      Key: "heatHome.json",
    })
    .promise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const convertedFile: HeatHomeCalculatorType = JSON.parse(
    dataFile?.Body?.toString() ?? "null"
  );
  return convertedFile;
};

export const heatHomeDataFlowRouter = createTRPCRouter({
  downloadFile: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const convertedFile = await getParsedJsonObject();
      function getObjectById(id: string) {
        const object: EachMenagerHeatHome | undefined =
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
    const convertedFile: HeatHomeCalculatorType = await getParsedJsonObject();
    const dynamicKey = Object.keys(input)[0];

    const index = convertedFile.kalkulator.findIndex(
      (obj) => Object.keys(obj)[0] === dynamicKey
    );

    if (index !== -1 && dynamicKey) {
      convertedFile.kalkulator[index] = input;
    }

    const updatedJSONFile = JSON.stringify(convertedFile);
    setFileToBucket(updatedJSONFile, "heatHome.json");
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
      setFileToBucket(updatedJSONFile, "heatHome.json");
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
        setFileToBucket(JSON.stringify(convertedFile), "heatHome.json");
        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
        };
      }
    }),
});
