import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { createTRPCRouter } from "../../trpc";
import {
  addonPrice,
  addonsSum,
  installationPrice,
} from "../../../../calc/airCondition";

export const airConditionCalculator = createTRPCRouter({
  setCopperPipePrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setCopperCable15Price: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setCopperCable16Price: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setDashPipePrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setAirConditionerSupportPrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setGutterPrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setPipeConnectorPrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setElasticPipePrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setTapePrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setWallPassPrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
  setAddonSum: protectedProcedure
    .input(
      z.object({
        copperPipePrice: z.number(),
        copperCable15Price: z.number(),
        copperCable16Price: z.number(),
        dashPipePrice: z.number(),
        airConditionSupportPrice: z.number(),
        gutterPrice: z.number(),
        pipeConnectorPrice: z.number(),
        elasticPipePrice: z.number(),
        tapePrice: z.number(),
        wallPassPrice: z.number(),
        montagePrice: z.number(),
        syfonPrice: z.number(),
        dashPumpPrice: z.number(),
        consultantProvision: z.number(),
        officeProvision: z.number(),
      })
    )
    .mutation(addonsSum),
  setInstallationPrice: protectedProcedure
    .input(
      z.object({
        airConditionerPrice: z.number(),
        addonsSumPrice: z.number(),
      })
    )
    .mutation(installationPrice),
  officeMarkup: protectedProcedure
    .input(
      z.object({ officeFee: z.number(), creatorId: z.string().optional() })
    )
    .mutation(async ({ ctx, input }) => {
      const creator = await ctx.prisma.user.findFirst({
        where: { id: input.creatorId },
      });

      const officeFeeForBoss = creator ? creator.imposedFeeAirCondition : 0;
      return {
        officeProvision: officeFeeForBoss + input.officeFee,
        bossProvision: officeFeeForBoss,
      };
    }),
});
