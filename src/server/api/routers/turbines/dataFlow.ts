import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";

export const TurbinesCalcSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  userName: z.string().optional(),
  turbines: z.object({
    "turbina 500": z.number(),
    "turbina 1000": z.number(),
    "turbina 1500": z.number(),
    "turbina 3000": z.number(),
  }),
  addons: z.object({
    "podstawa dachowa": z.number(),
    "podstawa dachowa3000": z.number(),
    strunobeton: z.number(),
    stalowy: z.object({
      trzy: z.number(),
      szesc: z.number(),
      dziewiec: z.number(),
      dwanascie: z.number(),
    }),
    maszt: z.number(),
    "inwerter 3fazowy": z.number(),
    "inwerter hybrydowy": z.number(),
    "montaż bazowo": z.number(),
    "montaż dodatkowo": z.number(),
    wysylka: z.number(),
    "podstawa inwertera": z.number(),
    "instalacja powyzej 3kw": z.number(),
  }),
  energyStore: z.object({
    "T30 controller": z.number(),
    licznik: z.number(),
    battery: z.object({
      trzy: z.number(),
      szesc: z.number(),
      dziewiec: z.number(),
      dwanascie: z.number(),
    }),
    matebox: z.number(),
  }),
});

export const turbinesDataFlowRouter = createTRPCRouter({
  getCalcData: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.turbines.findUnique({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
    });
  }),
  getAllCalcsData: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.turbines.findMany();
  }),
  editCalcData: adminProcedure
    .input(TurbinesCalcSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.turbines.update({
        where: {
          userId: input.userId,
        },
        data: input,
      });

      return input;
    }),
  removeMenagerCalcData: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.turbines.delete({
        where: {
          userId: input,
        },
      });
    }),
  addMenagerCalcData: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        userName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const baseCalc = await ctx.prisma.turbines.findFirst({
        where: {
          userId: "66d4e13565e073fe1f84366d",
        },
      });
      if (baseCalc) {
        await ctx.prisma.turbines.create({
          data: {
            userId: input.userId,
            userName: input.userName,
            addons: baseCalc.addons,
            turbines: baseCalc.turbines,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            energyStore: baseCalc.energyStore,
          },
        });

        return {
          status: 200,
          message:
            "Menager z bazowymi danymi został stworzony. Aby zmienić jego dane, przejdź do zakładki PROWIZJE 📝",
        };
      } else {
        return {
          status: 404,
          message: "Wystąpił błąd spróbuj ponownie 📝",
        };
      }
    }),
});
