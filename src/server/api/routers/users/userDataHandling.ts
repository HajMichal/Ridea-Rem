import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import bcrypt from "bcrypt";
import { z } from "zod";

export const loginRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  createAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        login: z.string(),
        password: z.string(),
        parentId: z.string(),
        role: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { login: input.login },
      });

      if (user) {
        throw new Error("Ten login został już użyty");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.password, salt);

      const userData = await ctx.prisma.user.create({
        data: {
          name: input.name,
          login: input.login,
          password: hash,
          role: input.role,
          creator: {
            connect: { id: input.parentId },
          },
        },
      });
      return {
        status: 200,
        userName: userData.name!,
        userId: userData.id,
        userRole: userData.role,
      };
    }),
  getUsers: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findMany({
        where: { creatorId: input.userId },
        orderBy: [
          {
            role: "asc",
          },
          {
            name: "asc",
          },
        ],
        select: {
          role: true,
          name: true,
          id: true,
          city: true,
          feePerkwForCompany: true,
          feePerkwHeatHome: true,
          feePerkwHeatPump: true,
          feePerkwPhotovoltaic: true,
          feePerkwTurbines: true,
          imposedFeeAirCondition: true,
          imposedFeeForCompany: true,
          imposedFeeHeatHome: true,
          imposedFeeHeatPump: true,
          imposedFeePhotovoltaic: true,
          imposedFeeTurbines: true,

          workers: true,
        },
      });
    }),
  editProvision: protectedProcedure
    .input(
      z.object({
        provisionName: z.string(),
        provisionAmount: z.number(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            [input.provisionName]: input.provisionAmount,
          },
        });
        return { message: "PROWIZJA ZOSTAŁA NAŁOŻONA NA KONTO" };
      } catch (error) {
        console.log(error);
        return {
          message: "PROWIZJA NIE ZOSTAŁA NAŁOŻONA NA KONTO",
          error: error,
        };
      }
    }),

  removeUser: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.delete({ where: { id: input } });
      return { status: 200, message: "Użytkownik został poprawnie usunięty." };
    }),
});
