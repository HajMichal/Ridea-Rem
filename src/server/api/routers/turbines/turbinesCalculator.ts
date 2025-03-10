import { tax32 } from "~/constans/taxPercentage";
import calc from "../../../../calc/turbines";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const turbinesCalculator = createTRPCRouter({
  setInverterCost: protectedProcedure
    .input(
      z.object({
        isThreePhasesInverter: z.boolean(),
        isHybridInverter: z.boolean(),
        singlePhaseInvCost: z.number(),
        threePhaseInvCost: z.number(),
        hybridInvCost: z.number(),
      })
    )
    .mutation(calc.setInverterCost),
  setEnergyStoreTotalCost: protectedProcedure
    .input(
      z.object({
        choosedEnergyStore: z.number(),
        t30ControllerCost: z.number(),
        energyCounterCost: z.number(),
        mateboxCost: z.number(),
        batteryCost: z.number(),
        isVat23: z.boolean(),
      })
    )
    .mutation(calc.setEnergyStoreTotalCost),
  setTurbinesDetails: protectedProcedure
    .input(
      z.object({
        turbine500Count: z.number(),
        turbine1000Count: z.number(),
        turbine1500Count: z.number(),
        turbine3000Count: z.number(),
      })
    )
    .mutation(calc.setTurbinesDetails),
  setTurbinesTotalCost: protectedProcedure
    .input(
      z.object({
        turbine500Cost: z.number(),
        turbine1000Cost: z.number(),
        turbine1500Cost: z.number(),
        turbine3000Cost: z.number(),

        turbinesBasesCost: z.number(),
        turbinesMontageCost: z.number(),
        inverterCost: z.number(),
        mastCost: z.number(),
        transportCost: z.number(),
        greaterPowerFee: z.number(),
        inverterBase: z.number(),
        feesAmount: z.number(),
        cableCost: z.number(),
        zwyzka: z.number(),

        isVat23: z.boolean(),
      })
    )
    .mutation(calc.setTurbinesTotalCost),
  loanForPurcharse: protectedProcedure
    .input(
      z.object({
        finallInstallationCost: z.number(),
        creditPercentage: z.number(),
        instalmentNumber: z.number(),
        grossInstalltaionBeforeDotationsCost: z.number(),
      })
    )
    .mutation(calc.loanForPurcharse),
  setOfficeMarkup: protectedProcedure
    .input(
      z.object({
        perPcsFee: z.number(),
        turbinesCount: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
        hasUserContract: z.boolean(),
        creatorId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const consultantFee = input.hasUserContract
        ? input.consultantFee + input.consultantFee * tax32
        : input.consultantFee;
      const officeFeeValue =
        Math.round(input.perPcsFee * input.turbinesCount) + input.constantFee;

      const creator = await ctx.prisma.user.findFirst({
        where: { id: input.creatorId },
        select: {
          feePerkwTurbines: true,
          imposedFeeTurbines: true,
        },
      });
      const officeFeeForBoss = creator
        ? Math.round(creator.feePerkwTurbines * input.turbinesCount) +
          creator.imposedFeeTurbines
        : 0;

      const markupSumValue = Number(
        (
          input.perPcsFee * input.turbinesCount +
          consultantFee +
          input.constantFee +
          officeFeeForBoss
        ).toFixed(2)
      );
      return {
        officeFeeValue: officeFeeValue,
        officeFeeForBoss: officeFeeForBoss,
        consultantFeeValue: consultantFee,
        markupSumValue: markupSumValue,
      };
    }),
});
