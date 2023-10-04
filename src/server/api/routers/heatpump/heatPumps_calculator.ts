import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/heatPomp";

export const heatPump_calculator = createTRPCRouter({
  buildingIsolationCalc: publicProcedure
    .input(
      z.object({
        buildingIsolation: z.string(),
        heatingType: z.object({
          wool5cm: z.number(),
          wool10cm: z.number(),
          wool15cm: z.number(),
          wool20cm: z.number(),
          wool25cm: z.number(),
        }),
      })
    )
    .mutation(calc.buildingIsolationCalc),
  windowLayersCalc: publicProcedure
    .input(
      z.object({
        windowLayers: z.string(),
        windowLayerType: z.object({
          window1glass: z.number(),
          window2glass: z.number(),
          window3glass: z.number(),
        }),
      })
    )
    .mutation(calc.windowLayersCalc),
  heatLost: publicProcedure
    .input(
      z.object({
        H13: z.number(),
        buildingIsolationCalc: z.number(),
        windowLayersCalc: z.number(),
        glazingTypeCalc: z.number(),
        isolatedCeilingCalc: z.number(),
        isolatedFloorCalc: z.number(),
        isolatedDoorCalc: z.number(),
      })
    )
    .mutation(calc.heatLost),
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
  yearlyHeatingHomeCost: publicProcedure
    .input(
      z.object({
        currentFuelToHeat: z.string(),
        yearlyEnergeticCost: z.number(),
        buyPrize1Tonne: z.number(),
        buyPrize1kWh: z.number(),
      })
    )
    .mutation(calc.yearlyHeatingHomeCost),
  G335: publicProcedure.mutation(calc.G335),
  yearlyEnergeticCost: publicProcedure
    .input(
      z.object({
        D34: z.number(),
        G335: z.number(),
      })
    )
    .mutation(calc.yearlyEnergeticCost),
});
