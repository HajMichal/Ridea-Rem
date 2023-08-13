import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const photovoltaics_calculator = createTRPCRouter({
  prize_trend: publicProcedure.input(z.number()).mutation(({ input }) => {
    return Number((input * 0.491 + input).toFixed(2));
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
  yearly_bill_without_photovolatics: publicProcedure
    .input(
      z.object({
        limit_prize_trend: z.number(),
        outOfLimit_prize_trend: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (input.recentYearTrendUsage > input.usageLimit) {
        return Number(
          (
            input.limit_prize_trend * input.usageLimit +
            input.outOfLimit_prize_trend *
              (input.recentYearTrendUsage - input.usageLimit)
          ).toFixed(2)
        );
      } else {
        return Number(
          (input.recentYearTrendUsage * input.limit_prize_trend).toFixed(2)
        );
      }
    }),
  yearly_total_fees: publicProcedure
    .input(
      z.object({
        energyPrizeInLimit: z.number(),
        energyPrizeOutOfLimit: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (input.recentYearTrendUsage > input.usageLimit) {
        return {
          yearly_total_trend_fee: Number(
            (
              input.energyPrizeInLimit * input.usageLimit +
              input.energyPrizeOutOfLimit *
                (input.recentYearTrendUsage - input.usageLimit)
            ).toFixed(2)
          ),
          yearly_total_fee_for_energy_transfer: Number(
            (
              input.energyPrizeInLimit * 0.491 * input.usageLimit +
              input.energyPrizeOutOfLimit *
                0.491 *
                (input.recentYearTrendUsage - input.usageLimit)
            ).toFixed(2)
          ),
        };
      } else {
        return {
          yearly_total_trend_fee: Number(
            (input.recentYearTrendUsage * input.energyPrizeInLimit).toFixed(2)
          ),
          yearly_total_fee_for_energy_transfer: Number(
            (
              input.recentYearTrendUsage *
              input.energyPrizeInLimit *
              0.491
            ).toFixed(2)
          ),
        };
      }
    }),
  yearly_costs_with_photovoltaics: publicProcedure
    .input(
      z.object({
        total_energy_trend_fee: z.number(),
        total_payment_energy_transfer: z.number(),
      })
    )
    .mutation(({ input }) => {
      return Number(
        (
          input.total_energy_trend_fee + input.total_payment_energy_transfer
        ).toFixed(2)
      );
    }),
  total_save: publicProcedure
    .input(
      z.object({
        yearly_bill_without_photovolatics: z.number(),
        yearly_costs_with_photovoltaics: z.number(),
      })
    )
    .mutation(({ input }) => {
      return Number(
        (
          input.yearly_bill_without_photovolatics -
          input.yearly_costs_with_photovoltaics
        ).toFixed(2)
      );
    }),

  prize_for_1_KW: publicProcedure
    .input(
      z.object({
        system_power: z.number(),
        dane: z.object({
          dwa: z.number(),
          cztery: z.number(),
          szesc: z.number(),
          osiem: z.number(),
          dwanascie: z.number(),
          dwadziescia: z.number(),
          trzydziesci: z.number(),
          piecdziesiat: z.number(),
        }),
      })
    )
    .mutation(({ input }) => {
      if (input.system_power < 2) {
        return input.dane.dwa;
      } else if (input.system_power < 4) {
        return input.dane.cztery;
      } else if (input.system_power < 6) {
        return input.dane.szesc;
      } else if (input.system_power < 8) {
        return input.dane.osiem;
      } else if (input.system_power < 12) {
        return input.dane.dwanascie;
      } else if (input.system_power < 20) {
        return input.dane.dwadziescia;
      } else if (input.system_power < 30) {
        return input.dane.trzydziesci;
      } else if (input.system_power < 50) {
        return input.dane.piecdziesiat;
      }
    }),
});
