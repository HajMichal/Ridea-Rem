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
});
