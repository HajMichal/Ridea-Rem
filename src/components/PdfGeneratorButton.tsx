import React from "react";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import MyDocument from "./CreatePDF";
import { Badge } from "@mantine/core";
import dynamic from "next/dynamic";

const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false, // This ensures the component is only rendered on the client side
  }
);

export const PdfGeneratorButton = () => {
  const { photovoltaicCalcStore, photovoltaicStore } = usePhotovoltaic();
  return (
    <div className="flex h-fit w-full animate-pulse justify-center">
      <DynamicPDFDownloadLink
        document={
          <MyDocument
            photovoltaicCalcStore={photovoltaicCalcStore}
            photovoltaicStore={photovoltaicStore}
          />
        }
        fileName="Oferta dla Klienta - IdeaRem.pdf"
      >
        {({ loading }) =>
          loading ? (
            <Badge size="xl" aria-disabled className="bg-brand py-5 text-dark">
              Kalkulacja...
            </Badge>
          ) : (
            <Badge size="xl" className="bg-brand py-5 text-dark">
              Pobierz kalkulacje!
            </Badge>
          )
        }
      </DynamicPDFDownloadLink>
    </div>
  );
};
