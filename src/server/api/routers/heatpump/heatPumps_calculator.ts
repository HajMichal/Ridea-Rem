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
  cleanPlacement: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        cleaningCost: z.number(),
      })
    )
    .mutation(calc.cleanPlacement),
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
  addonsSumCost: publicProcedure
    .input(
      z.object({
        montagePumpInCascadeCost: z.number(),
        placementWithBurstCost: z.number(),
        newDrillingsCost: z.number(),
        longerIsolationFromMineralWoolCost: z.number(),
        preisolatedPipeCost: z.number(),
        longerPreIsolatedPipeCost: z.number(),
        circulationMontageCost: z.number(),
        demontageOldBoilerCost: z.number(),
        cleanPlacementCost: z.number(),
        moveCwuCost: z.number(),
        energeticConnectionCost: z.number(),
        buforWithSupportCost: z.number(),
        closeOpenedSystemCost: z.number(),
        markupSumValue: z.number(),
      })
    )
    .mutation(calc.addonsSumCost),
  heatPumpPricingBeforeDotations: publicProcedure
    .input(
      z.object({
        addonsSumCost: z.number(),
        netPriceForHeatPump: z.number(),
        buforCost: z.number(),
        vat: z.number(),
      })
    )
    .mutation(calc.heatPumpPricingBeforeDotations),
  termoModernizationRelif: publicProcedure
    .input(
      z.object({
        netSystemValue: z.number(),
        heatPumpDotation: z.number(),
        dotationModernizationCoCwu: z.number(),
      })
    )
    .mutation(calc.termoModernizationRelif),
  finallGrossInstalationCost: publicProcedure
    .input(
      z.object({
        grossSystemValue: z.number(),
        heatPumpDotation: z.number(),
        dotationModernizationCoCwu: z.number(),
        termoModernizationRelifAmount: z.number(),
      })
    )
    .mutation(calc.finallGrossInstalationCost),
  heatStoreDotationValue: publicProcedure
    .input(
      z.object({
        modernizationDotation: z.number(),
        heatStoreDotation: z.number(),
      })
    )
    .mutation(calc.heatStoreDotationValue),
  loanForPurcharse: publicProcedure
    .input(
      z.object({
        finall_installation_cost: z.number(),
        creditPercentage: z.number(),
        instalmentNumber: z.number(),
        grossInstalltaionBeforeDotationsCost: z.number(),
      })
    )
    .mutation(calc.loanForPurcharse),
  heatingWithHeatPump: publicProcedure
    .input(
      z.object({
        yearlyHeatingUsage: z.number(),
        cop: z.number(),
        priceOf1kWh: z.number(),
      })
    )
    .mutation(calc.heatingWithHeatPump),
  heatPumpCost: publicProcedure
    .input(
      z.object({
        heatPumpCost: z.number(),
      })
    )
    .mutation(calc.heatPumpCost),
  markupCosts: publicProcedure
    .input(
      z.object({
        officeFee: z.number(),
        system_power: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
        creatorId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const officeFeeValue =
        Math.round(input.officeFee * input.system_power) + input.constantFee;
      const consultantFeeValue = Math.round(
        input.consultantFee * input.system_power
      );

      const creator = await ctx.prisma.user.findFirst({
        where: { id: input.creatorId },
      });
      const officeFeeForBoss = creator
        ? Math.round(creator.feePerkwHeatPump * input.system_power) +
          creator.imposedFeeHeatPump
        : 0;

      const markupSumValue = Number(
        (
          input.officeFee * input.system_power +
          input.consultantFee * input.system_power +
          input.constantFee +
          officeFeeForBoss
        ).toFixed(2)
      );

      return {
        officeFeeValue: officeFeeValue,
        officeFeeForBoss: officeFeeForBoss,
        consultantFeeValue: consultantFeeValue,
        markupSumValue: markupSumValue,
      };
    }),
});
