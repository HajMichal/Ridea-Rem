import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";
import { type AirCondition } from "@prisma/client";
import { type AirConditionData } from "./interfaces";

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
    return await ctx.prisma.airCondition.findMany({
      orderBy: {
        userName: "asc",
      },
    });
  }),
  edit: adminProcedure
    .input(
      z.object({
        dataToChange: z.record(z.number()),
        usersId: z.string().array(),
        path: z.string().array(), // path to specific element in airCondition db table
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isPathLengthTwo = input.path.length === 2;
      const airConditionKey = (
        isPathLengthTwo ? input.path[1]! : input.path[0]
      ) as keyof AirCondition;

      try {
        const currentDataArray = await ctx.prisma.airCondition.findMany({
          where: {
            userId: {
              in: input.usersId,
            },
          },
        });

        // Process each user's data
        await Promise.all(
          currentDataArray.map(async (currentData, index) => {
            if (currentData == null) throw new Error("NIE ZNALEZIONO DANYCH");

            const userId = input.usersId[index];
            let mergedData;

            if (isPathLengthTwo) {
              const currentCalcData = currentData.airConditioners[
                airConditionKey
              ] as AirConditionData;
              currentCalcData.price = Object.values(input.dataToChange)[0]!;
              mergedData = {
                ...currentData.airConditioners,
                [airConditionKey]: currentCalcData,
              };
            } else {
              const currentCalcData = currentData[airConditionKey] as object;
              mergedData = { ...currentCalcData, ...input.dataToChange };
            }

            await ctx.prisma.airCondition.update({
              where: { userId },
              data: isPathLengthTwo
                ? {
                    airConditioners:
                      mergedData as AirCondition["airConditioners"],
                  }
                : { [airConditionKey]: mergedData },
            });
          })
        );
      } catch (error) {
        console.error("Error updating air conditioners:", error);
        return error;
      }
    }),
  remove: adminProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    await ctx.prisma.airCondition.delete({
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            airConditioners: baseData.airConditioners,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
