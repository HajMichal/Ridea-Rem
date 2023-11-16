import React, { useState } from "react";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import MyDocument from "./photovoltaics/CreatePDF";
import HeatPumpDocument from "./heatPumps/CreatePDF";
import { Badge } from "@mantine/core";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { Loading } from "./Loading";
import { useRouter } from "next/router";
import { useHeatPump } from "~/hooks/useHeatPump";
import { ForCompanyDocument } from "./forCompany";
import { useForCompany } from "~/hooks/useForCompany";

interface DataFromJson {
  energyStore_dotation?: number;
  photovoltaics_dotation?: number;
  cop?: number;
}

export const PdfGeneratorButton = ({
  energyStore_dotation,
  photovoltaics_dotation,
  cop,
}: DataFromJson) => {
  const router = useRouter();
  const [pdfLoading, setPdfLoading] = useState(false);
  const { photovoltaicCalcStore, photovoltaicStore } = usePhotovoltaic();
  const { heatPumpCalcStore, heatPumpStore } = useHeatPump();
  const { forCompanyCalcStore, forCompanyStore } = useForCompany();

  const photovoltaicDoc = async () => {
    const blobPhotovoltaics = await pdf(
      <MyDocument
        photovoltaicCalcStore={photovoltaicCalcStore}
        photovoltaicStore={photovoltaicStore}
        energyStore_dotation={energyStore_dotation}
        photovoltaics_dotation={photovoltaics_dotation}
      />
    ).toBlob();
    saveAs(blobPhotovoltaics, "Oferta dla Klienta - IdeaRem.pdf");
  };
  const heatPumpDoc = async () => {
    const blobHeatPump = await pdf(
      <HeatPumpDocument
        heatPumpCalcStore={heatPumpCalcStore}
        heatPumpStore={heatPumpStore}
        cop={cop}
      />
    ).toBlob();
    saveAs(blobHeatPump, "Oferta dla Klienta - IdeaRem.pdf");
  };
  const forCompanyDoc = async () => {
    const blobForCompany = await pdf(
      <ForCompanyDocument
        forCompanyCalcStore={forCompanyCalcStore}
        forCompanyStore={forCompanyStore}
      />
    ).toBlob();
    saveAs(blobForCompany, "Oferta dla Klienta - IdeaRem.pdf");
  };

  const generateContract = async () => {
    setPdfLoading(true);
    if (router.pathname === "/kalkulator/fotowoltaika") {
      await photovoltaicDoc();
    } else if (router.pathname === "/kalkulator/pompy_ciepla") {
      await heatPumpDoc();
    } else if (router.pathname === "/kalkulator/fotowoltaika_firmy") {
      await forCompanyDoc();
    }
    setPdfLoading(false);
  };

  return (
    <div className="flex h-fit w-full animate-pulse justify-center laptop:mb-8 xxl:mb-0">
      {pdfLoading ? (
        <Loading isDownloading />
      ) : (
        <Badge size="xl" className="bg-brand py-5 text-dark">
          <button onClick={generateContract}>Pobierz kalkulacje!</button>
        </Badge>
      )}
    </div>
  );
};
