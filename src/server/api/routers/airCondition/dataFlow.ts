import { z } from "zod";
import { bucket, s3, setFileToBucket } from "~/utils/aws";
import {
  type AirConditionCalculatorType,
  type EachMenagerAirCondition,
} from "./interfaces";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";

const schema = z.record(
  z.object({
    airConditioner: z
      .object({
        type: z.string(),
        power: z.number(),
        option: z.string(),
        area: z.string(),
        energyType: z.string(),
        price: z.number(),
      })
      .array(),
    addons: z.object({
      "copperPipe1/4+3/8": z.number(),
      "copperCable1/5": z.number(),
      "copperCable1/6": z.number(),
      dashPipe: z.number(),
      airConditionerSupport: z.number(),
      gutter: z.number(),
      connector: z.number(),
      elasticPipe: z.number(),
      installationTape: z.number(),
      wallHole: z.number(),
      montage: z.number(),
      syfon: z.number(),
      dashPump: z.number(),
    }),
  })
);

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: bucket,
      Key: "airCondition.json",
    })
    .promise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const convertedFile: AirConditionCalculatorType = JSON.parse(
    dataFile?.Body?.toString() ?? "null"
  );
  return convertedFile;
};

export const airConditionDataFlowRouter = createTRPCRouter({
  downloadFile: protectedProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const convertedFile = await getParsedJsonObject();

      function getObjectById(id: string) {
        const object: EachMenagerAirCondition | undefined =
          convertedFile.kalkulator.find((item) => Object.keys(item)[0] === id);
        return object ? object[id] : null;
      }

      const userData = await ctx.prisma.user.findFirst({
        where: { id: input },
      });
      if (userData?.role === 1 || userData?.role === 2) {
        return getObjectById(userData.name!);
      } else if (userData?.creatorId && userData.role === 3) {
        const creator = await ctx.prisma.user.findFirst({
          where: { id: userData.creatorId },
        });
        return getObjectById(creator?.name ?? "");
      }
    }),
  getAllPvData: adminProcedure.query(async () => {
    return await getParsedJsonObject();
  }),
  editJSONFile: adminProcedure.input(schema).mutation(async ({ input }) => {
    const convertedFile = await getParsedJsonObject();
    const dynamicKey = Object.keys(input)[0];

    const index = convertedFile.kalkulator.findIndex(
      (obj) => Object.keys(obj)[0] === dynamicKey
    );
    if (index !== -1) {
      convertedFile.kalkulator[index] = input;
    }
    const updatedJSONFile = JSON.stringify(convertedFile);
    setFileToBucket(updatedJSONFile, "airCondition.json");
    return input;
  }),
  removeMenagerData: protectedProcedure
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
      setFileToBucket(updatedJSONFile, "airCondition.json");
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
        setFileToBucket(JSON.stringify(convertedFile), "airCondition.json");
        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
        };
      }
    }),
});
