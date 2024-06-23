import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { createTRPCRouter } from "../../trpc";
import { addonPrice } from "../../../../calc/airCondition";

export const airConditionCalculator = createTRPCRouter({
  setCopperPipePrice: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        price: z.number(),
      })
    )
    .mutation(addonPrice),
});
