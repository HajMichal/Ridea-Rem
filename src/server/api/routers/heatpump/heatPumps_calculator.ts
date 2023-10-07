import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/heatPomp";

export const heatPump_calculator = createTRPCRouter({
  kubatura: publicProcedure
    .input(
      z.object({
        heatedArea: z.number(),
        roomHeight: z.number(),
      })
    )
    .mutation(calc.kubatura),
  D34: publicProcedure
    .input(
      z.object({
        kubatura: z.number(),
        heatLost: z.number(),
        I30: z.number(),
        H30: z.number(),
      })
    )
    .mutation(calc.D34),
  assumedHeatNeed: publicProcedure
    .input(
      z.object({
        D34: z.number(),
        kubatura: z.number(),
      })
    )
    .mutation(calc.assumedHeatNeed),
  // yearlyHeatingHomeCost: publicProcedure
  //   .input(
  //     z.object({
  //       currentFuelToHeat: z.string(),
  //       yearlyEnergeticCost: z.number(),
  //       buyPrize1Tonne: z.number(),
  //       buyPrize1kWh: z.number(),
  //     })
  //   )
  //   .mutation(calc.yearlyHeatingHomeCost),
  G335: publicProcedure.mutation(calc.G335),
  yearlyEnergeticCost: publicProcedure
    .input(
      z.object({
        D34: z.number(),
        G335: z.number(),
      })
    )
    .mutation(calc.yearlyEnergeticCost),
  bufforCost: publicProcedure
    .input(
      z.object({
        bufforType: z.string(),
        buffors: z.object({
          bufory100l: z.object({
            przylaczeSchemat17: z.number(),
            przylaczeSchemat24: z.number(),
            przylaczeSchemat34: z.number(),
          }),
          bufory300l: z.object({
            przylaczeSchemat17: z.number(),
            przylaczeSchemat24: z.number(),
            przylaczeSchemat34: z.number(),
          }),
          bufory500l: z.object({
            przylaczeSchemat17: z.number(),
            przylaczeSchemat24: z.number(),
            przylaczeSchemat34: z.number(),
          }),
        }),
      })
    )
    .mutation(calc.bufforCost),
});
