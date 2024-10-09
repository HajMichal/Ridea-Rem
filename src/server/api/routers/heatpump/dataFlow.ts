import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

import { type HeatPump } from "@prisma/client";

export const heatPumpDataFlowRouter = createTRPCRouter({
  getSingle: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) return null;

    return await ctx.prisma.heatPump.findFirst({
      where: {
        userId: user.role === 3 ? user.creatorId : user.id,
      },
    });
  }),
  getAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.heatPump.findMany({
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
    .mutation(async ({ input }) => {
      // const convertedFile: HeatPumpCalculatorType = await getParsedJsonObject();
      // const dynamicKey = Object.keys(input)[0];
      // const index = convertedFile.kalkulator.findIndex(
      //   (obj) => Object.keys(obj)[0] === dynamicKey
      // );
      // if (index !== -1 && dynamicKey) {
      //   convertedFile.kalkulator[index] = input;
      // }
      // const updatedJSONFile = JSON.stringify(convertedFile);
      // setFileToBucket(updatedJSONFile, "heatpump.json");
      // return input;
    }),
  remove: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.photovoltaic.delete({
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
      const baseCalc = await ctx.prisma.heatPump.findFirst({
        where: {
          userId: "66d4e13565e073fe1f84366d",
        },
      });

      if (baseCalc) {
        await ctx.prisma.heatPump.create({
          data: {
            userId: input.userId,
            userName: input.userName,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            heatPumps: baseCalc.heatPumps,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            bufory: baseCalc.bufory,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            addons: baseCalc.addons,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            dotations: baseCalc.dotations,

            electricityPrice: baseCalc.electricityPrice,
            cop: baseCalc.cop,
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
        element: z.string(),
        name: z.string(),
        price: z.number(),
        fee: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const allCalcs = await ctx.prisma.heatPump.findMany();

        for (const calc of allCalcs) {
          try {
            // Add new element object to previous
            const addElement = {
              ...(calc[input.element as keyof HeatPump] as object),
              ...{ [input.name]: input.price },
            };

            await ctx.prisma.heatPump.update({
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
            throw error;
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
        const allCalcs = await ctx.prisma.heatPump.findMany();

        for (const calc of allCalcs) {
          try {
            const elementFromRemove = calc[
              input.element as keyof HeatPump
            ] as Record<string, number>;

            // Check if the element exists before attempting to delete
            if (elementFromRemove[input.name as keyof HeatPump]) {
              delete elementFromRemove[input.name];
            } else {
              throw new Error(
                `Element ${input.name} nie został odnleziony w ${calc.userName}`
              );
            }

            await ctx.prisma.heatPump.update({
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
            throw error;
          }
          return {
            status: 200,
            message: "Element został usunięty 📝",
          };
        }
      } catch (error) {
        return {
          status: 404,
          message: "Element nie został usunięty 📝",
        };
      }
    }),
});
