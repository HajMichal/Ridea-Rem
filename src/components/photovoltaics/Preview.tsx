import React from "react";
import { TextComponent } from "../TextComponent";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { Loader } from "@mantine/core";
import { PdfGeneratorButton } from "./PdfGeneratorButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Dotations {
  energyStore_dotation: number | undefined;
  photovoltaics_dotation: number | undefined;
  heatStore_dotation: number | undefined;
}

export const Preview = ({
  energyStore_dotation,
  photovoltaics_dotation,
  heatStore_dotation,
}: Dotations) => {
  const { photovoltaicCalcStore, photovoltaicStore, loading } =
    usePhotovoltaic();
  const [parent] = useAutoAnimate();

  return (
    <div
      id="CALCULATIONS"
      className="mb-40 h-[500px] w-[70%] items-center rounded-[50px] bg-white laptop:mb-0 laptop:mt-10 laptop:h-[83%] laptop:w-[40%]"
    >
      <h2 className="-translate-y-3 text-center font-orkneyBold text-xl">
        PODGLĄD
      </h2>
      <div className="flex h-full ">
        {loading.limit_price_trend_loading ||
        loading.outOfLimit_price_trend_loading ||
        loading.yearly_bill_without_photovolatics_loading ||
        loading.yearly_costs_with_photovoltaics_loading ||
        loading.yearly_total_fees_loading ? (
          <Loader color="yellow" size="lg" variant="dots" className="mt-40" />
        ) : (
          <div className="flex w-full flex-wrap justify-between font-orkneyBold font-semibold">
            <div
              ref={parent}
              className="mt-3 h-[75%] w-full overflow-y-auto px-10"
            >
              <TextComponent
                title="CENA PRĄDU BEZ INSTALACJI FOTOWOLTAICZNEJ"
                calculations={
                  photovoltaicCalcStore.yearly_bill_without_photovolatics
                }
                color="red"
                size="xl"
              />
              <TextComponent
                title="CENA ENERGII W LIMICIE"
                calculations={photovoltaicCalcStore.limit_price_trend}
              />
              <TextComponent
                title="CENA ENERGII POZA LIMITEM"
                calculations={photovoltaicCalcStore.outOfLimit_price_trend}
              />
              <TextComponent
                title="ILOŚĆ MODUŁÓW"
                calculations={photovoltaicStore.modulesCount}
                unit="SZT"
              />
              <TextComponent
                title="MOC INSTALACJI"
                calculations={
                  photovoltaicStore.voucher
                    ? photovoltaicCalcStore.system_power + 0.8
                    : photovoltaicCalcStore.system_power
                }
                unit="KW"
              />
              <TextComponent
                title="RACHUNEK ROCZNY Z FOTOWOLTAIKĄ"
                calculations={
                  photovoltaicCalcStore.yearly_costs_with_photovoltaics
                }
                color="green"
              />
              <TextComponent
                title="ŁĄCZNA OPŁATA ENERGII ELEKTRYCZNEJ Z PV"
                calculations={photovoltaicCalcStore.total_energy_trend_fee}
                color="yellow"
              />
              <TextComponent
                title="ŁĄCZNA OPŁATA ZA PRZESYŁ ENERGII ELEKTRYCZNEJ"
                calculations={
                  photovoltaicCalcStore.total_payment_energy_transfer
                }
                color="orange"
              />
              <TextComponent
                title="DACH POŁUDNIOWY"
                calculations={photovoltaicStore.southRoof}
              />
              <TextComponent
                title="DACH PŁASKI - EKIERKI"
                calculations={photovoltaicStore.isEccentricsChoosed}
              />
              <TextComponent
                title="MONTAŻ NA GRUNCIE"
                calculations={photovoltaicStore.isGroundMontage}
              />
              <TextComponent
                title="SOLAR EDGE"
                calculations={photovoltaicStore.isSolarEdgeChoosed}
              />
              <TextComponent
                title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
                calculations={photovoltaicStore.isRoofWeightSystem}
              />
              <TextComponent
                title="OPTYMALIZATORY TIGO"
                calculations={photovoltaicStore.tigoCount}
                unit="SZT"
              />
              <TextComponent
                title="INWERTER HYBRYDOWY"
                calculations={photovoltaicStore.isInwerterChoosed}
              />
              <TextComponent
                title="MAGAZYN CIEPŁA + EMS"
                calculations={photovoltaicStore.heatStoreDotation}
              />
              {!!photovoltaicCalcStore.totalInstallationCosts
                .total_gross_cost && (
                <div className="my-10">
                  <h2 className="w-full text-center text-xl">FINANSE</h2>
                  <TextComponent
                    title="KWOTA BRUTTO ZA INSTALACJĘ"
                    calculations={
                      photovoltaicCalcStore.totalInstallationCosts
                        .total_gross_cost
                    }
                  />
                  <TextComponent
                    title={`CENA 1 RATY PRZY ${photovoltaicStore.installmentNumber} RATACH`}
                    calculations={photovoltaicCalcStore.loanForPurcharse}
                  />
                </div>
              )}
              {energyStore_dotation ||
              photovoltaics_dotation ||
              heatStore_dotation ? (
                <div>
                  <h2 className="mt-10 w-full text-center text-xl">DOTACJE</h2>
                  <TextComponent
                    title="MAGAZYN CIEPŁA"
                    calculations={
                      photovoltaicStore.heatStoreDotation &&
                      photovoltaicCalcStore.heatStoreCalcDotation
                    }
                  />
                  <TextComponent
                    title="MENAGER ENERGII"
                    calculations={energyStore_dotation}
                  />
                  <TextComponent
                    title="MÓJ PRĄD FOTOWOLTAIKA"
                    calculations={photovoltaics_dotation}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="mt-20 text-center">
                <TextComponent
                  title="KWOTA PO DOTACJACH"
                  color="green"
                  size="xl"
                  calculations={photovoltaicCalcStore.finall_installation_cost}
                />
              </div>
            </div>
            <PdfGeneratorButton
              energyStore_dotation={energyStore_dotation}
              photovoltaics_dotation={photovoltaics_dotation}
            />
          </div>
        )}
      </div>
    </div>
  );
};
