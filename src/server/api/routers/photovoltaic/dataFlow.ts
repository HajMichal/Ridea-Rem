/* eslint-disable @typescript-eslint/no-unsafe-call */
import { bucket, s3, setFileToBucket } from "~/utils/aws";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { type PhotovoltaicCalculatorType } from "./interfaces";
import { type Photovoltaic } from "@prisma/client";

const schema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  userName: z.string().optional(),
  panels_small: z.object({
    dwa: z.number(),
    cztery: z.number(),
    szesc: z.number(),
    osiem: z.number(),
    dwanascie: z.number(),
    dwadziescia: z.number(),
    trzydziesci: z.number(),
    piecdziesiat: z.number(),
  }),
  panels_medium: z.object({
    dwa: z.number(),
    cztery: z.number(),
    szesc: z.number(),
    osiem: z.number(),
    dwanascie: z.number(),
    dwadziescia: z.number(),
    trzydziesci: z.number(),
    piecdziesiat: z.number(),
  }),
  panels_large: z.object({
    dwa: z.number(),
    cztery: z.number(),
    szesc: z.number(),
    osiem: z.number(),
    dwanascie: z.number(),
    dwadziescia: z.number(),
    trzydziesci: z.number(),
    piecdziesiat: z.number(),
  }),
  dotations: z.object({
    magazynCiepla: z.number(),
    menagerEnergii: z.number(),
    mojPrad: z.number(),
    mp_mc: z.number(),
  }),
  addons: z.object({
    bloczki: z.number(),
    tigo: z.number(),
    ekierki: z.number(),
    certyfikowaneEkierki: z.number(),
    grunt: z.number(),
    inwerterHybrydowy: z.number(),
    magazynCiepla: z.number(),
    ems: z.number(),
  }),
  boilers: z.object({
    zbiornik_100L: z.number(),
    zbiornik_140L: z.number(),
    zbiornik_140L_z_wezem: z.number(),
    zbiornik_200L: z.number(),
    zbiornik_200L_z_wezem: z.number(),
  }),
  energyStore: z.object({
    solax: z.number(),
    hipontech: z.number(),
  }),
  carPort: z.object({
    stan1: z.number(),
    stan2: z.number(),
    stan4: z.number(),
    stan6: z.number(),
    stan8: z.number(),
    stan10: z.number(),
    stan12: z.number(),
  }),
  electricityPrice: z.number(),
  creditPercentage: z.number(),
});

const getParsedJsonObject = async () => {
  const dataFile = await s3
    .getObject({
      Bucket: bucket,
      Key: "data.json",
    })
    .promise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const convertedFile: PhotovoltaicCalculatorType = JSON.parse(
    dataFile?.Body?.toString() ?? "null"
  );
  return convertedFile;
};

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
  getEntireJsonFile: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.photovoltaic.findMany();
  }),
  editJSONFile: adminProcedure
    .input(schema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.photovoltaic.update({
        where: {
          userId: input.userId,
        },
        data: input,
      });

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
        element: z.string(), // Existing record in Photovoltaic table
        name: z.string(), // New element name
        price: z.number(), // New element price
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const allCalcs = await ctx.prisma.photovoltaic.findMany();

        // Loop through all calcs
        allCalcs.map(async (calc) => {
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
        });
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
});
