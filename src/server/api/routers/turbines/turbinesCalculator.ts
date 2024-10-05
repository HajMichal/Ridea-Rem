import calc from "../../../../calc/turbines";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

export const turbinesCalculator = createTRPCRouter({
  setInverterCost: protectedProcedure
    .input(
      z.object({
        isThreePhasesInverter: z.boolean(),
        isHybridInverter: z.boolean(),
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
        perKwfee: z.number(),
        systemPower: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
        creatorId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const officeFeeValue =
        Math.round(input.perKwfee * input.systemPower) + input.constantFee;

      const creator = await ctx.prisma.user.findFirst({
        where: { id: input.creatorId },
        select: {
          feePerkwTurbines: true,
          imposedFeeTurbines: true,
        },
      });
      const officeFeeForBoss = creator
        ? Math.round(creator.feePerkwTurbines * input.systemPower) +
          creator.imposedFeeTurbines
        : 0;

      const markupSumValue = Number(
        (
          input.perKwfee * input.systemPower +
          input.consultantFee +
          input.constantFee +
          officeFeeForBoss
        ).toFixed(2)
      );
      return {
        officeFeeValue: officeFeeValue,
        officeFeeForBoss: officeFeeForBoss,
        consultantFeeValue: input.consultantFee,
        markupSumValue: markupSumValue,
      };
    }),
});
