import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const photovoltaics_calculator = createTRPCRouter({
  prize_trend: publicProcedure.input(z.number()).mutation(({ input }) => {
    return (input * 0.491 + input).toFixed(2);
  }),
  system_power: publicProcedure.input(z.number()).mutation(({ input }) => {
    // C11 -> moc systemu = E11 * (moc panela = 400) / 1000
    return (input * 400) / 1000;
  }),
  estimated_kWh_production: publicProcedure
    .input(z.object({ southRoof: z.boolean(), system_power: z.number() }))
    .mutation(({ input }) => {
      //      D18 -> szacowana produkcja -> if(F9){ 1020 * C11 } esle if(!F9) {920 * C11}
      if (input.southRoof) {
        return 1020 * input.system_power;
      } else {
        return 920 * input.system_power;
      }
    }),
  autoconsumption: publicProcedure
    .input(
      z.object({
        autoconsumption_step: z.number(),
        estimated_kWh_prod: z.number(),
      })
    )
    .mutation(({ input }) => {
      return input.autoconsumption_step * input.estimated_kWh_prod;
    }),
  total_payment_energy_transfer: publicProcedure
    .input(
      z.object({
        recentYearTrendUsage: z.number(),
        autoconsumption: z.number(),
        usageLimit: z.number(),
        prizeInLimit: z.number(),
        prizeOutOfLimit: z.number(),
      })
    )
    .mutation(({ input }) => {
      // D13 -> Łączna opłata za przesył energii elektrycznej  if( (D5 - D20) > H3 ) { (G3 * H3) + (G4 * (D5 - D20 - H3)) } else { (D5 - D20) * G3 }

      const diffrence = input.recentYearTrendUsage - input.autoconsumption;
      if (diffrence > input.usageLimit) {
        return Number(
          (
            input.prizeInLimit * 0.491 * input.usageLimit +
            input.prizeOutOfLimit * 0.491 * (diffrence - input.usageLimit)
          ).toFixed(2)
        );
      } else {
        return Number((diffrence * (input.prizeInLimit * 0.491)).toFixed(2));
      }
    }),
  total_energy_trend_fee: publicProcedure
    .input(
      z.object({
        recentYearTrendUsage: z.number(),
        autoconsumption: z.number(),
        usageLimit: z.number(),
        prizeInLimit: z.number(),
        prizeOutOfLimit: z.number(),
        accumulated_funds_on_account: z.number(),
      })
    )
    .mutation(({ input }) => {
      // D12 -> Łączna opłata energii elektrycznej
      const innerCondition =
        input.recentYearTrendUsage - input.autoconsumption > input.usageLimit;
      const innerValue = innerCondition
        ? input.prizeInLimit * 0.491 * input.usageLimit +
          input.prizeOutOfLimit *
            0.491 *
            (input.recentYearTrendUsage -
              input.autoconsumption -
              input.usageLimit)
        : (input.recentYearTrendUsage - input.autoconsumption) *
          (input.prizeInLimit * 0.491);

      const result = innerValue - input.accumulated_funds_on_account;

      if (result < 0) {
        return 0;
      } else {
        return result;
      }
    }),
  energy_sold_to_distributor: publicProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estimated_kWh_prod: z.number(),
      })
    )
    .mutation(({ input }) => {
      // D18 - D20  -> Ilośc energii odsprzedanej do Operatora Sieci Dystrybucyjnej (OSD)

      return input.estimated_kWh_prod - input.autoconsumption;
    }),
  accumulated_funds_on_account: publicProcedure
    .input(
      z.object({
        energy_sold_to_distributor: z.number(),
      })
    )
    .mutation(({ input }) => {
      // D21 * D22 -> Zgromadzone środki na koncie rozliczeniowym u OSD
      return Number((input.energy_sold_to_distributor * 0.72).toFixed(2)); // spytac czy wartosc 0.72 to stala wartosc czy modyfikowalna
    }),
});
