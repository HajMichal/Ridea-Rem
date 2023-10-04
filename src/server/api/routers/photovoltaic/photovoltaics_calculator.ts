import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/photovoltaics";

/** hello */
export const photovoltaics_calculator = createTRPCRouter({
  price_trend: publicProcedure.input(z.number()).mutation(calc.priceTrend),
  system_power: publicProcedure.input(z.number()).mutation(calc.systemPower),
  estimated_kWh_production: publicProcedure
    .input(z.object({ southRoof: z.boolean(), system_power: z.number() }))
    .mutation(calc.estimatedKWHProd),
  autoconsumption: publicProcedure
    .input(
      z.object({
        autoconsumption_step: z.number(),
        estimated_kWh_prod: z.number(),
      })
    )
    .mutation(calc.autoconsumption),
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
    .mutation(calc.totalPaymentEnergyTransfer),
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
    .mutation(calc.totalEnergyTrendFee),
  energy_sold_to_distributor: publicProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estimated_kWh_prod: z.number(),
      })
    )
    .mutation(calc.energySoldToDistributor),
  accumulated_funds_on_account: publicProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estiamtedSellPriceToOsd: z.number(),
      })
    )
    .mutation(calc.accumulated_funds_on_account),
  yearly_bill_without_photovolatics: publicProcedure
    .input(
      z.object({
        limit_price_trend: z.number(),
        outOfLimit_price_trend: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(calc.yearlyBillWithoutPhotovolatics),
  yearly_total_fees: publicProcedure
    .input(
      z.object({
        energyPriceInLimit: z.number(),
        energyPriceOutOfLimit: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(calc.yearlyTotalFees),
  yearly_costs_with_photovoltaics: publicProcedure
    .input(
      z.object({
        total_energy_trend_fee: z.number(),
        total_payment_energy_transfer: z.number(),
      })
    )
    .mutation(calc.yearlyCostsWithPhotovoltaics),
  total_save: publicProcedure
    .input(
      z.object({
        yearly_bill_without_photovolatics: z.number(),
        yearly_costs_with_photovoltaics: z.number(),
      })
    )
    .mutation(calc.totalSave),

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
    .mutation(calc.priceFor1KW),
  addon_tigo: publicProcedure
    .input(
      z.object({
        tigo_price: z.number(),
        tigo_count: z.number(),
      })
    )
    .mutation(calc.addonTigo),
  addon_ekierki: publicProcedure
    .input(
      z.object({
        price: z.number(),
        isChoosed: z.boolean(),
        modules_count: z.number(),
      })
    )
    .mutation(calc.addonEkierkiAndSolarEdge),
  addon_bloczki: publicProcedure
    .input(
      z.object({
        price: z.number(),
        isChoosed: z.boolean(),
        system_power: z.number(),
      })
    )
    .mutation(calc.addonGruntAndBloczki),
  addon_grunt: publicProcedure
    .input(
      z.object({
        price: z.number(),
        isChoosed: z.boolean(),
        system_power: z.number(),
      })
    )
    .mutation(calc.addonGruntAndBloczki),
  addon_solarEdge: publicProcedure
    .input(
      z.object({
        price: z.number(),
        isChoosed: z.boolean(),
        modules_count: z.number(),
      })
    )
    .mutation(calc.addonEkierkiAndSolarEdge),
  addon_hybridInwerter: publicProcedure
    .input(
      z.object({
        hybridInwerter_price: z.number(),
        isHybridInwerterChoosed: z.boolean(),
      })
    )
    .mutation(calc.addonHybridInwerter),
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
    .mutation(calc.totalAddonCost),
  officeMarkup: publicProcedure
    .input(
      z.object({
        officeFee: z.number(),
        system_power: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
      })
    )
    .mutation(calc.officeMarkup),
  totalInstallation_cost: publicProcedure
    .input(
      z.object({
        addon_costs: z.number(),
        base_installation_costs: z.number(),
        heatStore_energyManager_costs: z.number(),
      })
    )
    .mutation(calc.totalInstallationCosts),
  dotations_sum: publicProcedure
    .input(
      z.object({
        photovoltaics_dotation: z.number(),
        heatStore_dotation: z.number(),
        energyStore_dotation: z.number(),
      })
    )
    .mutation(calc.dotationsSum),
  amount_after_dotation: publicProcedure
    .input(
      z.object({
        summed_dotations: z.number(),
        gross_instalation_cost: z.number(),
        termoModernization: z.number(),
      })
    )
    .mutation(calc.amountAfterDotation),
  amount_tax_credit: publicProcedure
    .input(
      z.object({
        amount_after_dotation: z.number(),
        tax_credit: z.number(),
      })
    )
    .mutation(calc.amountTaxCredit),
  heatStore_cost: publicProcedure
    .input(
      z.object({
        choosed_tank_type: z.string(),
        tanks_costs: z.object({
          zbiornik_100L: z.number(),
          zbiornik_140L: z.number(),
          zbiornik_200L: z.number(),
          zbiornik_200L_z_wezem: z.number(),
        }),
      })
    )
    .mutation(calc.heatStoreCost),
  heatStore_energyManager_costs: publicProcedure
    .input(
      z.object({
        heatStore_cost: z.number(),
        isEnergyManagerSystem: z.boolean(),
      })
    )
    .mutation(calc.heatStoreWithEnergyManagerCost),
  finall_installation_cost: publicProcedure
    .input(
      z.object({
        amount_tax_credit: z.number(),
        amount_after_dotation: z.number(),
      })
    )
    .mutation(calc.finallInstallationCost),
  estiamted_price_for_trend_in_1KWH: publicProcedure
    .input(
      z.object({
        recentYearTrendUsage: z.number(),
        yearly_bill_without_photovolatics: z.number(),
      })
    )
    .mutation(calc.estiamtedPriceForTrendIn1KWH),
  save_on_autoconsumption: publicProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estiamtedPriceForTrendIn1KWH: z.number(),
      })
    )
    .mutation(calc.saveOnAutoconsumption),
  yearly_profit_for_installation: publicProcedure
    .input(
      z.object({
        accumulated_funds_on_account: z.number(),
        saveOnAutoconsumption: z.number(),
      })
    )
    .mutation(calc.yearlyProfitForInstallation),
  payment_return_time: publicProcedure
    .input(
      z.object({
        yearlyProfit: z.number(),
        finallInstallationCost: z.number(),
      })
    )
    .mutation(calc.paymentReturnTime),
  heatStoreCalcDotation: publicProcedure
    .input(
      z.object({
        gross_instalation_cost: z.number(),
      })
    )
    .mutation(calc.heatStoreDotationValue),

  termoModernization: publicProcedure
    .input(
      z.object({
        total_gross_value: z.number(),
        dotation_sum: z.number(),
        tax_credit: z.number(),
      })
    )
    .mutation(calc.termoModernization),
  loanForPurcharse: publicProcedure
    .input(
      z.object({
        finall_installation_cost: z.number(),
        creditPercentage: z.number(),
        instalmentNumber: z.number(),
      })
    )
    .mutation(calc.loanForPurcharse),
});
