import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import calc from "../../../../calc/forCompany";

const panelsSchema = z.object({
  dwa: z.number(),
  cztery: z.number(),
  szesc: z.number(),
  osiem: z.number(),
  dwanascie: z.number(),
  dwadziescia: z.number(),
  trzydziesci: z.number(),
  piecdziesiat: z.number(),
});

export const forCompanyCalculator = createTRPCRouter({
  calculateModuleCount: publicProcedure
    .input(
      z.object({
        wantedInstaltionPower: z.number(),
      })
    )
    .mutation(calc.calculateModuleCount),
  systemPower: publicProcedure
    .input(
      z.object({
        calculateModuleCount: z.object({
          modulesCount400: z.number(),
          modulesCount455: z.number(),
          modulesCount500: z.number(),
        }),
      })
    )
    .mutation(calc.systemPower),
  estimatedKWHProd: publicProcedure
    .input(
      z.object({
        systemPower: z.number(),
      })
    )
    .mutation(calc.estimatedKWHProd),
  autoconsumption: publicProcedure
    .input(
      z.object({
        autoconsumptionStep: z.number(),
        estimatedKWHProd: z.number(),
      })
    )
    .mutation(calc.autoconsumption),
  for1KwAndBaseInstallationPrice: publicProcedure
    .input(
      z.object({
        system_power: z.number(),
        dane: z.object({
          szesc: z.number(),
          osiem: z.number(),
          dwanascie: z.number(),
          dwadziescia: z.number(),
          trzydziesci: z.number(),
          piecdziesiat: z.number(),
        }),
      })
    )
    .mutation(calc.for1KwAndBaseInstallationPrice),
  addonPricing: publicProcedure
    .input(
      z.object({
        isChoosed: z.boolean(),
        price: z.number(),
        modules_count: z.number(),
      })
    )
    .mutation(calc.addonPricing),
  addonSum: publicProcedure
    .input(
      z.object({
        ekierkiPrice: z.number(),
        bloczkiPrice: z.number(),
        tigoPrice: z.number(),
        groundMontagePrice: z.number(),
        markupSumValue: z.number(),
      })
    )
    .mutation(calc.addonSum),
  officeMarkup: publicProcedure
    .input(
      z.object({
        officeFee: z.number(),
        system_power: z.number(),
        consultantFee: z.number(),
        constantFee: z.number(),
        officeFeeFromJsonFile: z.number(),
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
        ? Math.round(creator.feePerkw * input.system_power) + creator.imposedFee
        : 0;

      const markupSumValue = Number(
        (
          input.officeFee * input.system_power +
          input.consultantFee * input.system_power +
          input.constantFee +
          input.officeFeeFromJsonFile +
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
  totalInstallationCosts: publicProcedure
    .input(
      z.object({
        baseInstallationCost: z.number(),
        addonsSum: z.number(),
        vatValue: z.number(),
      })
    )
    .mutation(calc.totalInstallationCosts),
  loanForPurcharse: publicProcedure
    .input(
      z.object({
        finallInstallationCost: z.number(),
        creditPercentage: z.number(),
        instalmentNumber: z.number(),
        grossInstalltaionBeforeDotationsCost: z.number(),
      })
    )
    .mutation(calc.loanForPurcharse),
  baseInstallationsPricing: publicProcedure
    .input(
      z.object({
        system_power: z.object({
          systemPower400: z.number(),
          systemPower455: z.number(),
          systemPower500: z.number(),
        }),
        dane: z.object({
          czterysta: panelsSchema,
          czterysta_piecdziesiat: panelsSchema,
          piecset: panelsSchema,
        }),
      })
    )
    .mutation(calc.baseInstallationsPricing),
});
