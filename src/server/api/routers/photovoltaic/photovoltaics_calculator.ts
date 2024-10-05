import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import calc from "../../../../calc/photovoltaics";

export const photovoltaics_calculator = createTRPCRouter({
  price_trend: protectedProcedure.input(z.number()).mutation(calc.priceTrend),
  system_power: protectedProcedure
    .input(
      z.object({
        modulesCount: z.number(),
        panelPower: z.number(),
      })
    )
    .mutation(calc.systemPower),
  estimated_kWh_production: protectedProcedure
    .input(z.object({ southRoof: z.boolean(), system_power: z.number() }))
    .mutation(calc.estimatedKWHProd),
  autoconsumption: protectedProcedure
    .input(
      z.object({
        autoconsumption_step: z.number(),
        estimated_kWh_prod: z.number(),
      })
    )
    .mutation(calc.autoconsumption),
  total_payment_energy_transfer: protectedProcedure
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
  total_energy_trend_fee: protectedProcedure
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
  energy_sold_to_distributor: protectedProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estimated_kWh_prod: z.number(),
      })
    )
    .mutation(calc.energySoldToDistributor),
  accumulated_funds_on_account: protectedProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estiamtedSellPriceToOsd: z.number(),
      })
    )
    .mutation(calc.accumulated_funds_on_account),
  yearly_bill_without_photovolatics: protectedProcedure
    .input(
      z.object({
        limit_price_trend: z.number(),
        outOfLimit_price_trend: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(calc.yearlyBillWithoutPhotovolatics),
  yearly_total_fees: protectedProcedure
    .input(
      z.object({
        energyPriceInLimit: z.number(),
        energyPrice: z.number(),
        recentYearTrendUsage: z.number(),
        usageLimit: z.number(),
      })
    )
    .mutation(calc.yearlyTotalFees),
  yearly_costs_with_photovoltaics: protectedProcedure
    .input(
      z.object({
        total_energy_trend_fee: z.number(),
        total_payment_energy_transfer: z.number(),
      })
    )
    .mutation(calc.yearlyCostsWithPhotovoltaics),
  total_save: protectedProcedure
    .input(
      z.object({
        yearly_bill_without_photovolatics: z.number(),
        yearly_costs_with_photovoltaics: z.number(),
      })
    )
    .mutation(calc.totalSave),

  price_for_1_KW: protectedProcedure
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
  addon_tigo: protectedProcedure
    .input(
      z.object({
        tigo_price: z.number(),
        tigo_count: z.number(),
      })
    )
    .mutation(calc.addonTigo),
  addonEccentrics: protectedProcedure
    .input(
      z.object({
        isEccentrics: z.boolean(),
        modules_count: z.number(),
        price: z.number(),
      })
    )
    .mutation(calc.addonEccentrics),
  addon_bloczki: protectedProcedure
    .input(
      z.object({
        price: z.number(),
        isChoosed: z.boolean(),
        system_power: z.number(),
      })
    )
    .mutation(calc.addonGruntAndBloczki),
  addon_grunt: protectedProcedure
    .input(
      z.object({
        price: z.number(),
        isChoosed: z.boolean(),
        system_power: z.number(),
      })
    )
    .mutation(calc.addonGruntAndBloczki),
  addon_cost: protectedProcedure
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
        voucherholiday: z.number(),
        cableACCost: z.number(),
        mateboxCost: z.number(),
        ditchingCost: z.number(),
      })
    )
    .mutation(calc.totalAddonCost),
  officeMarkup: protectedProcedure
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
  totalInstallation_cost: protectedProcedure
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
  dotations_sum: protectedProcedure
    .input(
      z.object({
        photovoltaicDotation_mojprad: z.number(),
        photovoltaicDotation_czpowietrze: z.number(),
        energyMenagerDotation: z.number(),
        energyStoreDotationValue: z.number(),
        heatStoreDotation: z.number(),
        isVat23: z.boolean(),
      })
    )
    .mutation(calc.dotationsSum),
  amount_after_dotation: protectedProcedure
    .input(
      z.object({
        summed_dotations: z.number(),
        gross_instalation_cost: z.number(),
      })
    )
    .mutation(calc.amountAfterDotation),
  heatStore_energyManager_costs: protectedProcedure
    .input(
      z.object({
        heatStoreCost: z.number(),
        isHeatStore: z.boolean(),
      })
    )
    .mutation(calc.heatStoreWithEnergyManagerCost),
  energyManagerCost: protectedProcedure
    .input(
      z.object({
        isEnergyMenagerSystem: z.boolean(),
        energyMenagerCost: z.number(),
      })
    )
    .mutation(calc.energyManagerCost),
  finall_installation_cost: protectedProcedure
    .input(
      z.object({
        amount_after_dotation: z.number(),
      })
    )
    .mutation(calc.finallInstallationCost),
  estiamted_price_for_trend_in_1KWH: protectedProcedure
    .input(
      z.object({
        recentYearTrendUsage: z.number(),
        yearly_bill_without_photovolatics: z.number(),
      })
    )
    .mutation(calc.estiamtedPriceForTrendIn1KWH),
  save_on_autoconsumption: protectedProcedure
    .input(
      z.object({
        autoconsumption: z.number(),
        estiamtedPriceForTrendIn1KWH: z.number(),
      })
    )
    .mutation(calc.saveOnAutoconsumption),
  yearly_profit_for_installation: protectedProcedure
    .input(
      z.object({
        accumulated_funds_on_account: z.number(),
        saveOnAutoconsumption: z.number(),
      })
    )
    .mutation(calc.yearlyProfitForInstallation),
  payment_return_time: protectedProcedure
    .input(
      z.object({
        yearlyProfit: z.number(),
        finallInstallationCost: z.number(),
      })
    )
    .mutation(calc.paymentReturnTime),
  termoModernization: protectedProcedure
    .input(
      z.object({
        amount_after_dotation: z.number(),
        tax_credit: z.number(),
      })
    )
    .mutation(calc.termoModernization),
  loanForPurcharse: protectedProcedure
    .input(
      z.object({
        finall_installation_cost: z.number(),
        creditPercentage: z.number(),
        instalmentNumber: z.number(),
        grossInstalltaionBeforeDotationsCost: z.number(),
      })
    )
    .mutation(calc.loanForPurcharse),
  dotation_mojprad: protectedProcedure
    .input(
      z.object({
        isEnergyStoreDotation: z.boolean(),
        isDotation_mojprad: z.boolean(),
        mp_mc: z.number(),
        mojPrad: z.number(),
      })
    )
    .mutation(calc.dotation_mojprad),
  dotation_czpowietrze: protectedProcedure
    .input(
      z.object({
        isDotation_czpowietrze: z.boolean(),
        dotationStep: z.string(),
        totalCost: z.number(),
      })
    )
    .mutation(calc.dotation_czpowietrze),
  energyMenagerDotation: protectedProcedure
    .input(
      z.object({
        emsDotation: z.boolean(),
        isHeatStore: z.boolean(),
        isEnergyStoreDotation: z.boolean(),
        energyMenager: z.number(),
      })
    )
    .mutation(calc.energyMenagerDotation),
  energyStoreDotationValue: protectedProcedure
    .input(
      z.object({
        gross_instalation_cost: z.number(),
        isEnergyStoreDotation: z.boolean(),
      })
    )
    .mutation(calc.energyStoreDotationValue),
  promotionTotalInstallationCosts: protectedProcedure
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
