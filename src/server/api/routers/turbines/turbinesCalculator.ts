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
        t30ControllerCost: z.number(),
        energyCounterCost: z.number(),
        mateboxCost: z.number(),
        batterCost: z.number(),
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
});
