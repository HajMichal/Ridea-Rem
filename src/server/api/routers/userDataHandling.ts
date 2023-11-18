import { z } from "zod";
import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  getUsers: publicProcedure
    .input(
      z.object({
        role: z.number().optional(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const getWorkers = await ctx.prisma.user.findMany({
        where: { creatorId: input.userId, role: 3 },
      });
      if (input.role === 1) {
        const getMenagerWithWorkers = await ctx.prisma.user.findMany({
          where: { role: 2 },
          include: {
            workers: true,
          },
        });

        return { getMenagerWithWorkers, getWorkers };
      }
      return { getWorkers };
    }),
  imposeTheFee: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        feeAmount: z.number(),
        whichCalcualtor: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.whichCalcualtor === "Photovoltaic") {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            imposedFeePhotovoltaic: input.feeAmount,
          },
        });
        return { status: 200, message: "Prowizja została nałożona na konto" };
      } else if (input.whichCalcualtor === "ForCompany") {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            imposedFeeForCompany: input.feeAmount,
          },
        });
        return { status: 200, message: "Prowizja została nałożona na konto" };
      } else if (input.whichCalcualtor === "HeatPump") {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            imposedFeeHeatPump: input.feeAmount,
          },
        });
        return { status: 200, message: "Prowizja została nałożona na konto" };
      }
    }),
  feePerKwChange: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        feeAmount: z.number(),
        whichCalcualtor: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.whichCalcualtor === "Photovoltaic") {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            feePerkwPhotovoltaic: input.feeAmount,
          },
        });
        return { status: 200, message: "Prowizja została nałożona na konto" };
      } else if (input.whichCalcualtor === "ForCompany") {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            feePerkwForCompany: input.feeAmount,
          },
        });
        return { status: 200, message: "Prowizja została nałożona na konto" };
      } else if (input.whichCalcualtor === "HeatPump") {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            feePerkwHeatPump: input.feeAmount,
          },
        });
        return { status: 200, message: "Prowizja została nałożona na konto" };
      }
    }),
  removeUser: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.delete({ where: { id: input } });
      return { status: 200, message: "Użytkownik został poprawnie usunięty." };
    }),
});
