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
});
