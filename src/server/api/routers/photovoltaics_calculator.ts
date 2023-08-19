import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const photovoltaics_calculator = createTRPCRouter({
  price_trend: publicProcedure.input(z.number()).mutation(({ input }) => {
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
        priceInLimit: z.number(),
        priceOutOfLimit: z.number(),
      })
    )
    .mutation(({ input }) => {
      // D13 -> Łączna opłata za przesył energii elektrycznej  if( (D5 - D20) > H3 ) { (G3 * H3) + (G4 * (D5 - D20 - H3)) } else { (D5 - D20) * G3 }

      const diffrence = input.recentYearTrendUsage - input.autoconsumption;
      if (diffrence > input.usageLimit) {
        return Number(
          (
            input.priceInLimit * 0.491 * input.usageLimit +
            input.priceOutOfLimit * 0.491 * (diffrence - input.usageLimit)
          ).toFixed(2)
        );
      } else {
        return Number((diffrence * (input.priceInLimit * 0.491)).toFixed(2));
      }
    }),
  total_energy_trend_fee: publicProcedure
    .input(
      z.object({
        recentYearTrendUsage: z.number(),
        autoconsumption: z.number(),
        usageLimit: z.number(),
        priceInLimit: z.number(),
        priceOutOfLimit: z.number(),
        accumulated_funds_on_account: z.number(),
      })
    )
    .mutation(({ input }) => {
      // D12 -> Łączna opłata energii elektrycznej
      const innerCondition =
        input.recentYearTrendUsage - input.autoconsumption > input.usageLimit;
      const innerValue = innerCondition
        ? input.priceInLimit * 0.491 * input.usageLimit +
          input.priceOutOfLimit *
            0.491 *
            (input.recentYearTrendUsage -
              input.autoconsumption -
              input.usageLimit)
        : (input.recentYearTrendUsage - input.autoconsumption) *
          (input.priceInLimit * 0.491);

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
        limit_price_trend: z.number(),
        outOfLimit_price_trend: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (input.recentYearTrendUsage > input.usageLimit) {
        return Number(
          (
            input.limit_price_trend * input.usageLimit +
            input.outOfLimit_price_trend *
              (input.recentYearTrendUsage - input.usageLimit)
          ).toFixed(2)
        );
      } else {
        return Number(
          (input.recentYearTrendUsage * input.limit_price_trend).toFixed(2)
        );
      }
    }),
  yearly_total_fees: publicProcedure
    .input(
      z.object({
        energyPriceInLimit: z.number(),
        energyPriceOutOfLimit: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (input.recentYearTrendUsage > input.usageLimit) {
        return {
          yearly_total_trend_fee: Number(
            (
              input.energyPriceInLimit * input.usageLimit +
              input.energyPriceOutOfLimit *
                (input.recentYearTrendUsage - input.usageLimit)
            ).toFixed(2)
          ),
          yearly_total_fee_for_energy_transfer: Number(
            (
              input.energyPriceInLimit * 0.491 * input.usageLimit +
              input.energyPriceOutOfLimit *
                0.491 *
                (input.recentYearTrendUsage - input.usageLimit)
            ).toFixed(2)
          ),
        };
      } else {
        return {
          yearly_total_trend_fee: Number(
            (input.recentYearTrendUsage * input.energyPriceInLimit).toFixed(2)
          ),
          yearly_total_fee_for_energy_transfer: Number(
            (
              input.recentYearTrendUsage *
              input.energyPriceInLimit *
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

  price_for_1_KW: publicProcedure
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
        return {
          price_per_1KW: input.dane.dwa,
          base_installation_price: input.system_power * input.dane.dwa,
        };
      } else if (input.system_power < 4) {
        return {
          price_per_1KW: input.dane.cztery,
          base_installation_price: input.system_power * input.dane.cztery,
        };
      } else if (input.system_power < 6) {
        return {
          price_per_1KW: input.dane.szesc,
          base_installation_price: input.system_power * input.dane.szesc,
        };
      } else if (input.system_power < 8) {
        return {
          price_per_1KW: input.dane.osiem,
          base_installation_price: input.system_power * input.dane.osiem,
        };
      } else if (input.system_power < 12) {
        return {
          price_per_1KW: input.dane.dwanascie,
          base_installation_price: input.system_power * input.dane.dwanascie,
        };
      } else if (input.system_power < 20) {
        return {
          price_per_1KW: input.dane.dwadziescia,
          base_installation_price: input.system_power * input.dane.dwadziescia,
        };
      } else if (input.system_power < 30) {
        return {
          price_per_1KW: input.dane.trzydziesci,
          base_installation_price: input.system_power * input.dane.trzydziesci,
        };
      } else if (input.system_power < 50) {
        return {
          price_per_1KW: input.dane.piecdziesiat,
          base_installation_price: input.system_power * input.dane.piecdziesiat,
        };
      }
    }),
  addon_tigo: publicProcedure
    .input(
      z.object({
        tigo_price: z.number(),
        tigo_count: z.number(),
      })
    )
    .mutation(({ input }) => {
      return input.tigo_price * input.tigo_count;
    }),
  addon_ekierki: publicProcedure
    .input(
      z.object({
        ekierki_price: z.number(),
        isEkierkiChoosed: z.boolean(),
        modules_count: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (!input.isEkierkiChoosed) return 0;
      return input.ekierki_price * input.modules_count;
    }),
  addon_bloczki: publicProcedure
    .input(
      z.object({
        bloczki_price: z.number(),
        isBloczkiChoosed: z.boolean(),
        system_power: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (!input.isBloczkiChoosed) return 0;
      return input.bloczki_price * input.system_power;
    }),
  addon_grunt: publicProcedure
    .input(
      z.object({
        grunt_price: z.number(),
        isGruntChoosed: z.boolean(),
        system_power: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (!input.isGruntChoosed) return 0;
      return input.grunt_price * input.system_power;
    }),
  addon_solarEdge: publicProcedure
    .input(
      z.object({
        solarEdge_price: z.number(),
        isSolarEdgeChoosed: z.boolean(),
        modules_count: z.number(),
      })
    )
    .mutation(({ input }) => {
      if (!input.isSolarEdgeChoosed) return 0;
      return input.solarEdge_price * input.modules_count;
    }),
  addon_hybridInwerter: publicProcedure
    .input(
      z.object({
        hybridInwerter_price: z.number(),
        isHybridInwerterChoosed: z.boolean(),
      })
    )
    .mutation(({ input }) => {
      if (!input.isHybridInwerterChoosed) return 0;
      return input.hybridInwerter_price;
    }),
  isVoucher: publicProcedure
    .input(z.object({ isVoucher: z.boolean() }))
    .mutation(({ input }) => {
      if (!input.isVoucher) return 0;
      return 900;
    }),
  addon_cost: publicProcedure
    .input(
      z.object({
        voucher: z.boolean().optional(),
        ekierki: z.number().optional(),
        hybridInwerter: z.number().optional(),
        tigo: z.number().optional(),
        bloczki: z.number().optional(),
        grunt: z.number().optional(),
        solarEdge: z.number().optional(),
        markup_costs: z.number(),
      })
    )
    .mutation(({ input }) => {
      return Number(
        (
          (input.voucher ? 900 : 0) +
          (input.ekierki ? input.ekierki : 0) +
          (input.hybridInwerter ? input.hybridInwerter : 0) +
          (input.tigo ? input.tigo : 0) +
          (input.bloczki ? input.bloczki : 0) +
          (input.grunt ? input.grunt : 0) +
          (input.solarEdge ? input.solarEdge : 0) +
          input.markup_costs
        ).toFixed(2)
      );
    }),
  officeMarkup: publicProcedure
    .input(
      z.object({
        officeFee: z.number(),
        system_power: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
      })
    )
    .mutation(({ input }) => {
      return Number(
        (
          input.officeFee * input.system_power +
          input.consultantFee * input.system_power +
          input.constantFee
        ).toFixed(2)
      );
    }),
  totalInstallation_cost: publicProcedure
    .input(
      z.object({
        addon_costs: z.number(),
        base_installation_costs: z.number(),
        heatStore_energyManager_costs: z.number(),
      })
    )
    .mutation(({ input }) => {
      const total_cost =
        input.addon_costs +
        input.base_installation_costs +
        input.heatStore_energyManager_costs;
      const fee_value = total_cost * 0.08;
      return {
        total_installation_cost: total_cost,
        total_gross_cost: total_cost + fee_value,
        fee_value: fee_value,
      };
    }),
  dotations_sum: publicProcedure
    .input(
      z.object({
        photovoltaics_dotation: z.number(),
        heatStore_dotation: z.number(),
        energyStore_dotation: z.number(),
      })
    )
    .mutation(({ input }) => {
      return (
        input.photovoltaics_dotation +
        input.heatStore_dotation +
        input.energyStore_dotation
      );
    }),
  amount_after_dotation: publicProcedure
    .input(
      z.object({
        summed_dotations: z.number(),
        gross_instalation_cost: z.number(),
      })
    )
    .mutation(({ input }) => {
      return input.gross_instalation_cost - input.summed_dotations;
    }),
  amount_tax_credit: publicProcedure
    .input(
      z.object({
        amount_after_dotation: z.number(),
        tax_credit: z.number(),
      })
    )
    .mutation(({ input }) => {
      return Number(
        (input.amount_after_dotation * input.tax_credit).toFixed(2)
      );
    }),
  heatStore_cost: publicProcedure
    .input(
      z.object({
        choosed_tank_type: z.string(),
      })
    )
    .mutation(({ input }) => {
      if (input.choosed_tank_type === "Zbiornik 100L") {
        return 4900;
      } else if (input.choosed_tank_type === "Zbiornik 140L") {
        return 5300;
      } else if (input.choosed_tank_type === "Zbiornik 200L") {
        return 5599;
      } else if (input.choosed_tank_type === "Zbiornik 200L z wężownicą") {
        return 6200;
      }
    }),
  heatStore_energyManager_costs: publicProcedure
    .input(
      z.object({
        heatStore_cost: z.number(),
        isEnergyManagerSystem: z.boolean(),
      })
    )
    .mutation(({ input }) => {
      return input.isEnergyManagerSystem ? input.heatStore_cost + 1500 : 0;
    }),
  finall_installation_cost: publicProcedure
    .input(
      z.object({
        amount_tax_credit: z.number(),
        amount_after_dotation: z.number(),
      })
    )
    .mutation(({ input }) => {
      return Number(
        (input.amount_after_dotation - input.amount_tax_credit).toFixed(2)
      );
    }),
});
