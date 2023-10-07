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
  montageAnotherPumpInCascade: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        montageCost: z.number(),
      })
    )
    .mutation(calc.montageAnotherPumpInCascade),
  placementWithBurst: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        placementCost: z.number(),
      })
    )
    .mutation(calc.placementWithBurst),
  newDrillings: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        newDrillingsCost: z.number(),
      })
    )
    .mutation(calc.newDrillings),
  longerIsolationFromMineralWool: publicProcedure
    .input(
      z.object({
        isolationLength: z.number(),
        longerIsolationFromMineralWoolCost: z.number(),
      })
    )
    .mutation(calc.longerIsolationFromMineralWool),
  preisolatedPipe: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        preisolatedPipeCost: z.number(),
      })
    )
    .mutation(calc.preisolatedPipe),
  longerPreIsolatedPipe: publicProcedure
    .input(
      z.object({
        preIsolationLength: z.number(),
        preIsolationCost: z.number(),
      })
    )
    .mutation(calc.longerPreIsolatedPipe),
  circulationMontage: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        circulationCost: z.number(),
      })
    )
    .mutation(calc.circulationMontage),
  demontageOldBoiler: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        demontageCost: z.number(),
      })
    )
    .mutation(calc.demontageOldBoiler),
  moveCwu: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        moveCwuCost: z.number(),
      })
    )
    .mutation(calc.moveCwu),
  makeEnergeticConnection: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        energeticConnectionCost: z.number(),
      })
    )
    .mutation(calc.makeEnergeticConnection),
  buforWithSupport: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        buforWithSupportCost: z.number(),
      })
    )
    .mutation(calc.buforWithSupport),
  closeOpenedSystem: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        closeSystemCost: z.number(),
      })
    )
    .mutation(calc.closeOpenedSystem),
});
