import React from "react";
import { TextComponent } from "./TextComponent";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { Loader } from "@mantine/core";
import MyDocument from "./CreatePDF";

import dynamic from "next/dynamic";

const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false, // This ensures the component is only rendered on the client side
  }
);

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
  const { photovoltaicCalcStore, loading } = usePhotovoltaic();

  return (
    <div
      id="CALCULATIONS"
      className="mb-40 h-[500px] w-[70%] items-center rounded-[50px] bg-white laptop:mb-0 laptop:mt-10 laptop:h-3/4 laptop:w-[40%]"
    >
      <h2 className="-translate-y-3 text-center font-orkneyBold text-xl">
        PODGLĄD
      </h2>
      <div className="flex h-full justify-center">
        {loading.limit_price_trend_loading ||
        loading.outOfLimit_price_trend_loading ||
        loading.yearly_bill_without_photovolatics_loading ||
        loading.yearly_costs_with_photovoltaics_loading ||
        loading.yearly_total_fees_loading ? (
          <Loader color="yellow" size="lg" variant="dots" className="mt-40" />
        ) : (
          <div className="flex flex-wrap justify-between text-center font-orkneyBold font-semibold">
            <div className="h-[75%] w-full overflow-y-auto">
              <TextComponent
                title="CENA ENERGII W LIMICIE"
                calculations={photovoltaicCalcStore.limit_price_trend}
              />
              <TextComponent
                title="CENA ENERGII POZA LIMITEM"
                calculations={photovoltaicCalcStore.outOfLimit_price_trend}
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
              {energyStore_dotation ||
              photovoltaics_dotation ||
              heatStore_dotation ? (
                <div>
                  <h2 className="mt-10 text-xl">DOTACJE</h2>
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
                    calculations={heatStore_dotation}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="h-fit w-full animate-pulse">
              <DynamicPDFDownloadLink
                document={
                  <MyDocument photovoltaicCalcStore={photovoltaicCalcStore} />
                }
                fileName="Fotowoltaika - Umowa.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Wczytywanie umowy..." : "Pobierz umowę!"
                }
              </DynamicPDFDownloadLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
