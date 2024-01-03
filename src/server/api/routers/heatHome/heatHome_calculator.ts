import { createTRPCRouter, publicProcedure } from "../../trpc";
import { z } from "zod";
import calc from "../../../../calc/heatHome";

export const heatHomeCalculator = createTRPCRouter({
  addonCostCounter: publicProcedure
    .input(
      z.object({
        area: z.number(),
        cost: z.number(),
      })
    )
    .mutation(calc.addonCostCounter),
  markupCosts: publicProcedure
    .input(
      z.object({
        officeFee: z.number(),
        heatingArea: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
        creatorId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const officeFeeValue =
        Math.round(input.officeFee * input.heatingArea) + input.constantFee;
      const consultantFeeValue = Math.round(
        input.consultantFee * input.heatingArea
      );

      const creator = await ctx.prisma.user.findFirst({
        where: { id: input.creatorId },
      });
      const officeFeeForBoss = creator
        ? Math.round(creator.feePerkwHeatPump * input.heatingArea) +
          creator.imposedFeeHeatPump
        : 0;

      const markupSumValue = Number(
        (
          input.officeFee * input.heatingArea +
          input.consultantFee * input.heatingArea +
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
  totalCosts: publicProcedure
    .input(
      z.object({
        heatingThickness: z.number(),
        heatingArea: z.number(),
        windowSills: z.number(),
        plaster: z.number(),
        finishTop: z.number(),
        additionalAmount: z.number(),
        markupSum: z.number(),
      })
    )
    .mutation(calc.totalCosts),
  dotationValue: publicProcedure
    .input(
      z.object({
        totalCost: z.number(),
        dotationStep: z.string(),
      })
    )
    .mutation(calc.dotationValue),
  finallCost: publicProcedure
    .input(
      z.object({
        totalCost: z.number(),
        dotationValue: z.number(),
      })
    )
    .mutation(calc.finallCost),
});
