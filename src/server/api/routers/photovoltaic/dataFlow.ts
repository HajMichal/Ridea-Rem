/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { type Photovoltaic } from "@prisma/client";

export const dataFlowRouter = createTRPCRouter({
  downloadFile: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.photovoltaic.findUnique({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
    });
  }),
  getCreditPercentage: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.photovoltaic.findUnique({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
      select: {
        creditPercentage: true,
      },
    });
  }),
  getEnergyStoreData: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.photovoltaic.findUnique({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
      select: {
        energyStore: true,
      },
    });
  }),
  getAllPvData: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.photovoltaic.findMany({
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
        path: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isPathLengthOne = input.path.length === 1;

      try {
        const currentDataArray = await ctx.prisma.photovoltaic.findMany({
          where: {
            userId: {
              in: input.usersId,
            },
          },
        });

        await Promise.all(
          currentDataArray.map(async (currentData, index) => {
            if (currentData == null) throw new Error("NIE ZNALEZIONO DANYCH");

            const userId = input.usersId[index];
            let mergedData;

            if (isPathLengthOne) {
              const photovoltaicKey = input.path[0] as keyof Photovoltaic;
              const currentCalcData = currentData[photovoltaicKey] as object;
              mergedData = { ...currentCalcData, ...input.dataToChange };
            } else {
              mergedData = input.dataToChange;
            }

            await ctx.prisma.photovoltaic.update({
              where: {
                userId: userId,
              },
              data: isPathLengthOne
                ? { [input.path[0]!]: mergedData }
                : mergedData,
            });
          })
        );
      } catch (error) {
        console.error("Error updating air conditioners:", error);
        return error;
      }

      return input;
    }),
  removeMenagerData: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.photovoltaic.delete({
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
    .mutation(async ({ ctx, input }) => {
      const baseCalc = await ctx.prisma.photovoltaic.findFirst({
        where: {
          userId: "66d4e13565e073fe1f84366d",
        },
      });
      if (baseCalc) {
        await ctx.prisma.photovoltaic.create({
          data: {
            userId: input.userId,
            userName: input.userName,
            addons: baseCalc.addons,
            boilers: baseCalc.boilers,
            carPort: baseCalc.carPort,
            panels_large: baseCalc.panels_large,
            panels_medium: baseCalc.panels_medium,
            panels_small: baseCalc.panels_small,
            dotations: baseCalc.dotations,
            energyStore: baseCalc.energyStore,
            creditPercentage: baseCalc.creditPercentage,
            electricityPrice: baseCalc.electricityPrice,
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

  addNewElement: adminProcedure
    .input(
      z.object({
        element: z.string(), // Existing Json record in Photovoltaic table
        name: z.string(), // New element name
        price: z.number(), // New element price
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const allCalcs = await ctx.prisma.photovoltaic.findMany();

        // Loop through all calcs
        for (const calc of allCalcs) {
          try {
            // Add new element object to previous
            const addElement = {
              ...(calc[input.element as keyof Photovoltaic] as object),
              ...{ [input.name]: input.price },
            };

            await ctx.prisma.photovoltaic.update({
              where: {
                userId: calc.userId,
              },
              data: {
                [input.element]: addElement,
              },
            });
          } catch (error) {
            console.error(
              `Error adding element to calculator ${calc.userId}: `,
              error
            );
            throw error; // Rethrow the error to break out of the loop
          }
        }

        return {
          status: 200,
          message: "Element został dodany 📝",
        };
      } catch (error) {
        return {
          status: 404,
          message: "Element nie został dodany 📝",
        };
      }
    }),
  removeElement: adminProcedure
    .input(
      z.object({
        element: z.string(), // Existing Json record in Photovoltaic table
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const allCalcs = await ctx.prisma.photovoltaic.findMany();

        // Loop through all calcs
        for (const calc of allCalcs) {
          try {
            const elementFromRemove = calc[
              input.element as keyof Photovoltaic
            ] as { [key: string]: number };

            // Check if the element exists before attempting to delete
            if (elementFromRemove[input.name as keyof Photovoltaic]) {
              delete elementFromRemove[input.name];
            } else {
              throw new Error(
                `Element ${input.name} not found in calculator ${calc.id}`
              );
            }

            await ctx.prisma.photovoltaic.update({
              where: {
                id: calc.id,
              },
              data: {
                [input.element]: elementFromRemove,
              },
            });
          } catch (error) {
            console.error(
              `Error removing element from calculator ${calc.id}: `,
              error
            );
            throw error; // Rethrow the error to break out of the loop
          }
        }
      } catch (error) {
        return {
          status: 404,
          message: "Element nie został dodany 📝",
        };
      }
    }),
});
