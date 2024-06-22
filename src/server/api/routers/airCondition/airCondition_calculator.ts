import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { createTRPCRouter } from "../../trpc";

export const airCondition_calculator = createTRPCRouter({
  test: protectedProcedure
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
    .mutation(() => console.log("test")),
});
