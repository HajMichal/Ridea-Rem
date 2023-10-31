import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/forCompany";

export const forCompanyCalculator = createTRPCRouter({
  calculateModuleCount: publicProcedure
    .input(
      z.object({
        wantedInstaltionPower: z.number(),
      })
    )
    .mutation(calc.calculateModuleCount),
  systemPower: publicProcedure
    .input(
      z.object({
        calculateModuleCount: z.object({
          modulesCount400: z.number(),
          modulesCount455: z.number(),
          modulesCount500: z.number(),
        }),
      })
    )
    .mutation(calc.systemPower),
  estimatedKWHProd: publicProcedure
    .input(
      z.object({
        systemPower: z.number(),
      })
    )
    .mutation(calc.estimatedKWHProd),
  autoconsumption: publicProcedure
    .input(
      z.object({
        autoconsumptionStep: z.number(),
        estimatedKWHProd: z.number(),
      })
    )
    .mutation(calc.autoconsumption),
  priceFor1KW: publicProcedure
    .input(
      z.object({
        system_power: z.number(),
        dane: z.object({
          szesc: z.number(),
          osiem: z.number(),
          dwanascie: z.number(),
          dwadziescia: z.number(),
          trzydziesci: z.number(),
          piecdziesiat: z.number(),
        }),
      })
    )
    .mutation(calc.priceFor1KW),
  addonPricing: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        price: z.number(),
        modules_count: z.number(),
      })
    )
    .mutation(calc.addonPricing),
});
