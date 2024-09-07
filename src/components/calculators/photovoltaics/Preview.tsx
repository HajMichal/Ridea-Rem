import React from "react";
import { TextComponent, PdfGeneratorButton } from "../../";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { Loader } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Preview() {
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
                title="MONTAŻ NA FIRMĘ"
                calculations={photovoltaicStore.vat23}
              />
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
                calculations={photovoltaicCalcStore.system_power}
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
                title={`RODZAJ EKIERKI`}
                calculations={
                  photovoltaicStore.eccentrics !== "None"
                    ? photovoltaicStore.eccentrics === "standardEccentrics"
                      ? "standardowe"
                      : "certyfikowane"
                    : false
                }
              />
              <TextComponent
                title="DŁUGOŚĆ DODATKOWEGO PRZEWODU AC"
                calculations={photovoltaicStore.cableAC}
                unit="m"
              />
              <TextComponent
                title="CENA DODATKOWEGO OKABLOWANIA"
                calculations={photovoltaicCalcStore.cableACCost}
                unit="zł"
              />
              <TextComponent
                title="MONTAŻ NA GRUNCIE"
                calculations={photovoltaicStore.isGroundMontage}
              />
              <TextComponent
                title="PRZEKOP W ZAKRESIE KLIENTA"
                calculations={photovoltaicStore.isDitch ? "TAK" : "NIE"}
              />
              <TextComponent
                title="DŁUGOŚĆ PRZEKOPU"
                calculations={photovoltaicStore.ditchLength}
                unit="m"
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
                title="MATEBOX"
                calculations={photovoltaicStore.isMatebox}
              />
              <TextComponent
                title="CAR PORT"
                calculations={photovoltaicStore.isCarPort}
              />
              <TextComponent
                title="MAGAZYN CIEPŁA"
                calculations={photovoltaicStore.heatStoreDotation}
              />
              <TextComponent
                title="EMS"
                calculations={photovoltaicStore.emsDotation}
              />
              <TextComponent
                title="MAGAZYN ENERGII"
                calculations={photovoltaicStore.isEnergyStoreDotation}
              />
              {photovoltaicStore.isEnergyStoreDotation &&
                photovoltaicStore.energyStore && (
                  <>
                    <TextComponent
                      title="WYBRANY MAGAZYN ENERGII"
                      calculations={photovoltaicStore.energyStore.name}
                    />
                    <TextComponent
                      title="KOSZT MAGAZYNU ENERGII"
                      calculations={photovoltaicStore.energyStore.price}
                      unit="zł"
                    />
                  </>
                )}
              {photovoltaicStore.isEnergyStoreDotation && (
                <TextComponent
                  title="CENA MAGAZYNU ENERGII"
                  calculations={photovoltaicCalcStore.energyStoreCost}
                />
              )}

              {!!photovoltaicCalcStore.totalInstallationCosts
                .total_gross_cost && (
                <div className="my-10">
                  <h2 className="w-full text-center text-xl">FINANSE</h2>
                  <TextComponent
                    title="KWOTA NETTO ZA INSTALACJĘ"
                    calculations={
                      photovoltaicCalcStore.totalInstallationCosts
                        .total_installation_cost
                    }
                  />
                  <TextComponent
                    title="KWOTA BRUTTO ZA INSTALACJĘ"
                    calculations={
                      photovoltaicCalcStore.totalInstallationCosts
                        .total_gross_cost
                    }
                  />
                  <TextComponent
                    title="ZNIŻKA PROMOCYJNA"
                    color="green"
                    calculations={
                      photovoltaicStore.isPromotion
                        ? "-" + photovoltaicStore.promotionAmount
                        : 0
                    }
                  />
                  <TextComponent
                    title={`CENA 1 RATY PRZY ${photovoltaicStore.installmentNumber} RATACH PRZED ODLICZENIEM DOTACJI`}
                    calculations={
                      photovoltaicCalcStore.loanForPurcharse
                        .instalmentBeforeDotations
                    }
                  />
                </div>
              )}
              {photovoltaicCalcStore.energyMenagerDotationValue ||
              photovoltaicCalcStore.photovoltaicDotation_mojprad ||
              photovoltaicCalcStore.photovoltaicDotation_czpowietrze ||
              photovoltaicCalcStore.heatStoreCalcDotation ? (
                <div>
                  <h2 className="mt-10 w-full text-center text-xl">DOTACJE</h2>
                  <TextComponent
                    title="MENAGER ENERGII"
                    calculations={
                      photovoltaicCalcStore.energyMenagerDotationValue
                    }
                  />
                  <TextComponent
                    title="MÓJ PRĄD FOTOWOLTAIKA"
                    calculations={
                      photovoltaicCalcStore.photovoltaicDotation_mojprad
                    }
                  />
                  <TextComponent
                    title="CZYSTE POWIETRZE FOTOWOLTAIKA - KWOTA"
                    calculations={
                      photovoltaicCalcStore.photovoltaicDotation_czpowietrze
                    }
                  />
                  <TextComponent
                    title="MAGAZYN ENERGII"
                    calculations={
                      photovoltaicStore.isEnergyStoreDotation &&
                      photovoltaicCalcStore.energyStoreDotationValue
                    }
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
                <TextComponent
                  title={`CENA 1 RATY PRZY ${photovoltaicStore.installmentNumber} RATACH`}
                  calculations={
                    photovoltaicCalcStore.loanForPurcharse.finallInstalmentPice
                  }
                  color="green"
                  size="xl"
                />
              </div>
            </div>
            <PdfGeneratorButton />
          </div>
        )}
      </div>
    </div>
  );
}
