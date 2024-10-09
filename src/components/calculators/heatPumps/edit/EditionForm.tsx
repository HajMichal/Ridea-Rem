import toast from "react-hot-toast";
import { type HeatPumpCalcType } from "~/server/api/routers/heatpump/interfaces";
import { api } from "~/utils/api";

interface EditionFormType {
  data: HeatPumpCalcType;
  menagers: string[];
}

export const EditionForm = ({ data, menagers }: EditionFormType) => {
  const { mutate } = api.heatPumpDataFlowRouter.edit.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  return (
    <>
      <h1 className="w-full pt-14 text-center">{data.userName}</h1>
    </>
  );
};

const dataNamesMappings: Record<string, string> = {
  kolejna_kaskada: "KOLEJNA POMPA CIEPŁA W KASKADZIE",
  przewierty: "DODATKOWE PRZEWIERTY",
  poprowadzenie_instalacji_wierzchu:
    "INSTALACJA OD PC DO BUDYNKU W IZOLACJI Z WEŁNY MINERALNEJ",
  rura_preizolowana: "RURA PREIZOLOWANA",
  dodatkowe_rury_preizolowane: "KAŻDY NASTĘPNY MB RURY PREIZOLOWANEJ",
  cyrkulacja_cwu: "MONTAŻ CYRKULACJI DO CWU",
  demontaz_kotla: "DEMONTAŻ STAREGO KOTŁA",
  posprzatanie: "POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMNTÓW MASZYNOWNI",
  przeniesienie_zasobnika: "PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA",
  wykonanie_przylacza: "WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC",
  spiecie_bufora: "SPIĘCIE BUFOR CO Z DODATKOOWYM ŹRÓDŁEM GRZEWCZYM",
  zamkniecie_ukladu_otwartego: "ZAMKNIĘCIE UKŁADU OTWARTEGO",
  audyt: "AUDYT ENERGETYCZNY",
};
