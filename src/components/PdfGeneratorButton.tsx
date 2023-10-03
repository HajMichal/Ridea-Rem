import React, { useState } from "react";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import MyDocument from "./CreatePDF";
import { Badge } from "@mantine/core";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { Loading } from "./Loading";

const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false, // This ensures the component is only rendered on the client side
  }
);

interface Dotations {
  energyStore_dotation: number | undefined;
  photovoltaics_dotation: number | undefined;
}

export const PdfGeneratorButton = ({
  energyStore_dotation,
  photovoltaics_dotation,
}: Dotations) => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const { photovoltaicCalcStore, photovoltaicStore } = usePhotovoltaic();

  const generateLetterPdf = async () => {
    setPdfLoading(true);
    const blob = await pdf(
      <MyDocument
        photovoltaicCalcStore={photovoltaicCalcStore}
        photovoltaicStore={photovoltaicStore}
        energyStore_dotation={energyStore_dotation}
        photovoltaics_dotation={photovoltaics_dotation}
      />
    ).toBlob();
    setPdfLoading(false);
    saveAs(blob, "Oferta dla Klienta - IdeaRem.pdf");
  };

  return (
    <div className="flex h-fit w-full animate-pulse justify-center">
      {pdfLoading ? (
        <Loading />
      ) : (
        <Badge size="xl" className="bg-brand py-5 text-dark">
          <button onClick={generateLetterPdf}>Pobierz kalkulacje!</button>
        </Badge>
      )}
    </div>
  );
};
