import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/heatPomp";

export const heatPump_calculator = createTRPCRouter({
  bufforCost: publicProcedure
    .input(
      z.object({
        bufforType: z.string(),
        buffors: z.object({
          bufory100l: z.object({
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
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  placementWithBurst: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  newDrillings: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  longerIsolationFromMineralWool: publicProcedure
    .input(
      z.object({
        length: z.number(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCostWithLength),
  preisolatedPipe: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  longerPreIsolatedPipe: publicProcedure
    .input(
      z.object({
        length: z.number(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCostWithLength),
  circulationMontage: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  demontageOldBoiler: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  cleanPlacement: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  moveCwu: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  makeEnergeticConnection: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  buforWithSupport: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  closeOpenedSystem: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  energeticAudit: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        elementCost: z.number(),
      })
    )
    .mutation(calc.setAddonCost),
  addonsSumCost: publicProcedure
    .input(
      z.object({
        montagePumpInCascadeCost: z.number(),
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
        auditCost: z.number(),
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
