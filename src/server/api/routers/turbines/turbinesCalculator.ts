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
});
