import { z } from "zod";
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

export const airCondMenagerData = createTRPCRouter({
  getSingle: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.airCondition.findFirst({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
    });
  }),
  getAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.airCondition.findMany();
  }),
  edit: adminProcedure.input(schema).mutation(async ({ input }) => {
    // const convertedFile = await getParsedJsonObject();
    // const dynamicKey = Object.keys(input)[0];
    // const index = convertedFile.kalkulator.findIndex(
    //   (obj) => Object.keys(obj)[0] === dynamicKey
    // );
    // if (index !== -1) {
    //   convertedFile.kalkulator[index] = input;
    // }
    // const updatedJSONFile = JSON.stringify(convertedFile);
    // setFileToBucket(updatedJSONFile, "airCondition.json");
    // return input;
  }),
  removeMenagerData: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.airCondition.delete({
        where: {
          userId: input,
        },
      });
    }),
  addNewMenager: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        userName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const baseData = await ctx.prisma.airCondition.findFirst({
        where: {
          userId: "66d4e13565e073fe1f84366d",
        },
      });

      if (baseData) {
        await ctx.prisma.airCondition.create({
          data: {
            userId: input.userId,
            userName: input.userName,
            airConditioners: baseData.airConditioners,
            addons: baseData.addons,
          },
        });

        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki prowizje 📝",
        };
      }
    }),
});
