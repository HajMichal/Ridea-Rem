import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/photovoltaics";

export const photovoltaics_calculator = createTRPCRouter({
  price_trend: publicProcedure.input(z.number()).mutation(calc.priceTrend),
  system_power: publicProcedure
    .input(
      z.object({
        modulesCount: z.number(),
        panelPower: z.number(),
      })
    )
    .mutation(calc.systemPower),
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
  addonEccentrics: publicProcedure
    .input(
      z.object({
        isEccentrics: z.boolean(),
        modules_count: z.number(),
        price: z.number(),
      })
    )
    .mutation(calc.addonEccentrics),
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
        promotionAmount: z.number(),
        ekierki: z.number().optional(),
        hybridInwerter: z.number().optional(),
        tigo: z.number().optional(),
        bloczki: z.number().optional(),
        grunt: z.number().optional(),
        carPort: z.number(),
        markup_costs: z.number(),
        twoInstallmentsFree: z.number(),
        voucherholiday: z.number(),
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
        creatorId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const officeFeeValue =
        Math.round(input.officeFee * input.system_power) + input.constantFee;
      const consultantFeeValue = Math.round(
        input.consultantFee * input.system_power
      );

      const creator = await ctx.prisma.user.findFirst({
        where: { id: input.creatorId },
      });
      const officeFeeForBoss = creator
        ? Math.round(creator.feePerkwPhotovoltaic * input.system_power) +
          creator.imposedFeePhotovoltaic
        : 0;

      const markupSumValue = Number(
        (
          input.officeFee * input.system_power +
          input.consultantFee * input.system_power +
          input.constantFee +
          officeFeeForBoss
        ).toFixed(2)
      );
      return {
        officeFeeValue: officeFeeValue,
        officeFeeForBoss: officeFeeForBoss,
        consultantFeeValue: consultantFeeValue,
        markupSumValue: markupSumValue,
      };
    }),
  totalInstallation_cost: publicProcedure
    .input(
      z.object({
        addon_costs: z.number(),
        base_installation_costs: z.number(),
        heatStore_energyManager_costs: z.number(),
        energyStoreCost: z.number(),
        isVat23: z.boolean(),
      })
    )
    .mutation(calc.totalInstallationCosts),
  dotations_sum: publicProcedure
    .input(
      z.object({
        photovoltaicDotation_mojprad: z.number(),
        photovoltaicDotation_czpowietrze: z.number(),
        energyMenagerDotation: z.number(),
        energyStoreDotationValue: z.number(),
        isVat23: z.boolean(),
      })
    )
    .mutation(calc.dotationsSum),
  amount_after_dotation: publicProcedure
    .input(
      z.object({
        summed_dotations: z.number(),
        gross_instalation_cost: z.number(),
      })
    )
    .mutation(calc.amountAfterDotation),
  heatStore_cost: publicProcedure
    .input(
      z.object({
        choosed_tank_type: z.string(),
        tanks_costs: z.object({
          zbiornik_100L: z.number(),
          zbiornik_140L: z.number(),
          zbiornik_140L_z_wezem: z.number(),
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
        isHeatStoreSystem: z.boolean(),
      })
    )
    .mutation(calc.heatStoreWithEnergyManagerCost),
  energyManagerCost: publicProcedure
    .input(
      z.object({
        isEnergyMenagerSystem: z.boolean(),
        energyMenagerCost: z.number(),
      })
    )
    .mutation(calc.energyManagerCost),
  finall_installation_cost: publicProcedure
    .input(
      z.object({
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
  termoModernization: publicProcedure
    .input(
      z.object({
        amount_after_dotation: z.number(),
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
        grossInstalltaionBeforeDotationsCost: z.number(),
      })
    )
    .mutation(calc.loanForPurcharse),
  energyStoreCost: publicProcedure
    .input(
      z.object({
        energyStorePower: z.number(),
        energyStore: z.object({
          solax: z.number(),
          hipontech: z.number(),
        }),
      })
    )
    .mutation(calc.energyStoreCost),
  dotation_mojprad: publicProcedure
    .input(
      z.object({
        isEnergyStoreDotation: z.boolean(),
        isDotation_mojprad: z.boolean(),
        mp_mc: z.number(),
        mojPrad: z.number(),
      })
    )
    .mutation(calc.dotation_mojprad),
  dotation_czpowietrze: publicProcedure
    .input(
      z.object({
        isDotation_czpowietrze: z.boolean(),
        dotationStep: z.string(),
        totalCost: z.number(),
      })
    )
    .mutation(calc.dotation_czpowietrze),
  energyMenagerDotation: publicProcedure
    .input(
      z.object({
        emsDotation: z.boolean(),
        heatStoreDotation: z.boolean(),
        isEnergyStoreDotation: z.boolean(),
        energyMenager: z.number(),
      })
    )
    .mutation(calc.energyMenagerDotation),
  energyStoreDotationValue: publicProcedure
    .input(
      z.object({
        gross_instalation_cost: z.number(),
        isEnergyStoreDotation: z.boolean(),
      })
    )
    .mutation(calc.energyStoreDotationValue),
  promotionTotalInstallationCosts: publicProcedure
    .input(
      z.object({
        totalInstallationCosts: z.object({
          total_installation_cost: z.number(),
          total_gross_cost: z.number(),
          fee_value: z.number(),
        }),
        oneInstallmentAmount: z.number(),
      })
    )
    .mutation(calc.promotionTotalInstallationCosts),
});
