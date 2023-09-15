import React from "react";
import { TextComponent } from "./TextComponent";
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
                title="DACH PŁASKI"
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
                calculations={photovoltaicStore.energyManageSystem}
              />
              <TextComponent
                title="OSTATECZNA KWOTA ZA INSTALACJĘ"
                calculations={photovoltaicCalcStore.finall_installation_cost}
              />
              {energyStore_dotation ||
              photovoltaics_dotation ||
              heatStore_dotation ? (
                <div>
                  <h2 className="mt-10 w-full text-center text-xl">DOTACJE</h2>
                  <TextComponent
                    title="MENAGER ENERGII"
                    calculations={energyStore_dotation}
                  />
                  <TextComponent
                    title="MÓJ PRĄD FOTOWOLTAIKA"
                    calculations={photovoltaics_dotation}
                  />
                  <TextComponent
                    title="MAGAZYN CIEPŁA"
                    calculations={
                      photovoltaicStore.energyManageSystem && heatStore_dotation
                    }
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <PdfGeneratorButton />
          </div>
        )}
      </div>
    </div>
  );
};
