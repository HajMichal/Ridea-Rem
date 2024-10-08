import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";

export const turbinesMenagerRouter = createTRPCRouter({
  getSingle: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.turbines.findUnique({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
    });
  }),
  getAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.turbines.findMany({
      orderBy: {
        userName: "asc",
      },
    });
  }),
  edit: adminProcedure
    .input(
      z.object({
        dataToChange: z.record(z.number()),
        path: z.string().array(),
        usersId: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isPathLengthTwo = input.path.length === 2;
      const firstKey = input.path[0]! as "turbines" | "addons" | "energyStore";
      const secondKey = input.path[1] as "stalowy" | "battery" | undefined;

      try {
        const currentDataArray = await ctx.prisma.turbines.findMany({
          where: {
            userId: {
              in: input.usersId,
            },
          },
        });

        await Promise.all(
          currentDataArray.map(async (currentData, index) => {
            const userId = input.usersId[index];
            let mergedData;

            if (isPathLengthTwo) {
              if (firstKey === "addons" && secondKey === "stalowy") {
                const currentCalcData = currentData[firstKey][secondKey];
                mergedData = { ...currentCalcData, ...input.dataToChange };
              } else if (
                firstKey === "energyStore" &&
                secondKey === "battery"
              ) {
                const currentCalcData = currentData[firstKey][secondKey];
                mergedData = { ...currentCalcData, ...input.dataToChange };
              }
            } else {
              const currentCalcData = currentData[firstKey];
              mergedData = { ...currentCalcData, ...input.dataToChange };
            }

            await ctx.prisma.turbines.update({
              where: {
                userId: userId,
              },
              data: secondKey
                ? {
                    [firstKey]: {
                      [secondKey]: mergedData,
                    },
                  }
                : {
                    [firstKey]: mergedData,
                  },
            });
          })
        );
      } catch (error) {
        console.error("Error updating air conditioners:", error);
        return error;
      }
    }),
  remove: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.turbines.delete({
      where: {
        userId: input,
      },
    });
  }),
  create: adminProcedure
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
