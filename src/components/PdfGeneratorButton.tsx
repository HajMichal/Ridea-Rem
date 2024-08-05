import React, { useState } from "react";
import { useRouter } from "next/router";
import { Badge } from "@mantine/core";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

import { Loading } from "./Loading";
import { PhotovoltaicDocument } from "./calculators/photovoltaics";
import { ForCompanyDocument } from "./calculators/forCompany";
import { HeatPumpDocument } from "./calculators/heatPumps";
import { HeatHomeDocument } from "./calculators/heatHome";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import { useForCompany } from "~/hooks/useForCompany";
import { useHeatPump } from "~/hooks/useHeatPump";
import { useHeatHome } from "~/hooks/useHeatHome";
import { AirConditionDocument } from "./calculators/airCondition";
import { useAirCondition } from "~/hooks/useAirCondition";

interface DataFromJson {
  cop?: number;
}

export const PdfGeneratorButton = ({ cop }: DataFromJson) => {
  const router = useRouter();
  const [pdfLoading, setPdfLoading] = useState(false);
  const { photovoltaicCalcStore, photovoltaicStore } = usePhotovoltaic();
  const { heatPumpCalcStore, heatPumpStore } = useHeatPump();
  const { forCompanyCalcStore, forCompanyStore } = useForCompany();
  const { heatHomeCalcStore, heatHomeStore } = useHeatHome();
  const { airConditionCalcStore, airConditionStore } = useAirCondition();

  const photovoltaicDoc = async () => {
    const blobPhotovoltaics = await pdf(
      <PhotovoltaicDocument
        photovoltaicCalcStore={photovoltaicCalcStore}
        photovoltaicStore={photovoltaicStore}
      />
    ).toBlob();
    saveAs(blobPhotovoltaics, "Oferta dla Klienta - PrzyjaznaNatura.pdf");
  };
  const heatPumpDoc = async () => {
    const blobHeatPump = await pdf(
      <HeatPumpDocument
        heatPumpCalcStore={heatPumpCalcStore}
        heatPumpStore={heatPumpStore}
        cop={cop}
      />
    ).toBlob();
    saveAs(blobHeatPump, "Oferta dla Klienta - PrzyjaznaNatura.pdf");
  };
  const forCompanyDoc = async () => {
    const blobForCompany = await pdf(
      <ForCompanyDocument
        forCompanyCalcStore={forCompanyCalcStore}
        forCompanyStore={forCompanyStore}
      />
    ).toBlob();
    saveAs(blobForCompany, "Oferta dla Klienta - PrzyjaznaNatura.pdf");
  };
  const heatHomeDoc = async () => {
    const blobForCompany = await pdf(
      <HeatHomeDocument
        heatHomeCalcStore={heatHomeCalcStore}
        heatHomeStore={heatHomeStore}
      />
    ).toBlob();
    saveAs(blobForCompany, "Oferta dla Klienta - PrzyjaznaNatura.pdf");
  };
  const airConditionDoc = async () => {
    const blobAirCondition = await pdf(
      <AirConditionDocument
        airConditionStore={airConditionStore}
        airConditionCalcStore={airConditionCalcStore}
      />
    ).toBlob();
    saveAs(blobAirCondition, "Oferta dla Klienta - PrzyjaznaNatura.pdf");
  };

  const generateContract = async () => {
    setPdfLoading(true);
    if (router.pathname === "/kalkulator/fotowoltaika") {
      await photovoltaicDoc();
    } else if (router.pathname === "/kalkulator/pompy_ciepla") {
      await heatPumpDoc();
    } else if (router.pathname === "/kalkulator/fotowoltaika_firmy") {
      await forCompanyDoc();
    } else if (router.pathname === "/kalkulator/cieplo_wlasciwe") {
      await heatHomeDoc();
    } else if (router.pathname == "/kalkulator/klimatyzacja") {
      await airConditionDoc();
    }
    setPdfLoading(false);
  };

  return (
    <div className="flex h-fit w-full animate-pulse justify-center laptop:mb-8 xxl:mb-0">
      {pdfLoading ? (
        <Loading isDownloading />
      ) : (
        <Badge
          size="xl"
          className="group bg-brand py-5 text-dark hover:cursor-pointer"
          onClick={generateContract}
        >
          <button>Pobierz kalkulacje!</button>
        </Badge>
      )}
    </div>
  );
};
