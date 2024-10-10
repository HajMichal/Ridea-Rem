import { useState } from "react";
import toast from "react-hot-toast";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { type HeatPumpCalcType } from "~/server/api/routers/heatpump/interfaces";
import { api } from "~/utils/api";
import { AddElement } from "./AddElement";
import { RemoveElement } from "./RemoveElement";

interface EditionFormType {
  data: HeatPumpCalcType;
  menagers: string[];
}

export const EditionForm = ({ data, menagers }: EditionFormType) => {
  const [dataToChange, setDataToChange] = useState({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [pathKey, setPathKey] = useState<string | null>(null);
  const ctx = api.useContext();

  const { mutate } = api.heatPumpDataFlowRouter.edit.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
      void ctx.heatPumpDataFlowRouter.getAll.invalidate();
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  function displayData(calcData: object, path: string[] = [], depth = 0) {
    if (depth === 6) return null;

    const saveChanges = () => {
      setEditingKey(null);
      setPathKey(null);
      mutate({
        dataToChange,
        path,
        usersId: menagers.length === 0 ? [data.userId] : menagers,
      });
    };

    return (
      <div className="flex w-full flex-col items-center pb-8">
        {Object.entries(calcData).map(
          ([key, value]: [key: string, value: number | object]) => {
            if (
              key === "id" ||
              key === "userId" ||
              key === "userName" ||
              key === "createdAt" ||
              key === "editedAt"
            )
              return null;

            const isEditing =
              editingKey === key && pathKey === (path[1] ?? null);

            if (typeof value !== "number" && typeof value !== "string") {
              return (
                <div key={key} className="flex w-full flex-col items-center">
                  <div className="flex gap-2">
                    <h1
                      className={`text-center font-orkneyBold ${
                        path.length === 1 && "text-xl"
                      }`}
                    >
                      {headerNamesMapping[key] ?? key.toUpperCase()}
                    </h1>
                    {path[0] === "heatPumps" && (
                      <RemoveElement element={path[0]} name={key} />
                    )}
                  </div>
                  {displayData(value, [...path, key], depth + 1)}
                </div>
              );
            } else {
              return (
                <div
                  key={key}
                  className="m-1 grid w-full grid-cols-12 items-center gap-2 xl:w-3/4"
                >
                  <div className="col-start-3 col-end-7 flex h-full items-center justify-end">
                    <p className="text-md mt-1 text-right">
                      {dataNamesMappings[key] ?? key.toUpperCase()}:
                    </p>
                  </div>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        placeholder={value.toString()}
                        onChange={(e) =>
                          setDataToChange({
                            [key]: Number(e.target.value),
                          })
                        }
                        autoFocus
                        className="col-start-7 col-end-8 h-[34.8px] grid-cols-[repeat(6,_1fr)_minmax(96px,_96px)] border border-dark p-2 px-2 focus:outline-brand"
                      />
                      <div className="col-start-8 col-end-9 flex w-full gap-2">
                        <button onClick={saveChanges} className="mr-2">
                          <BsDatabaseFillCheck size={"25px"} color="green" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingKey(null);
                            setPathKey(null);
                            setDataToChange({});
                          }}
                        >
                          <GiCancel size={"25px"} color="red" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => {
                          setEditingKey(key);
                          setPathKey(path[1] ?? null);
                        }}
                        className="border border-dark bg-white p-1 px-2 font-sans"
                      >
                        {value}
                      </p>
                      {path[0] === "bufory" && (
                        <RemoveElement element={path[0]} name={key} />
                      )}
                    </>
                  )}
                </div>
              );
            }
          }
        )}
      </div>
    );
  }

  return (
    <>
      <h1 className="w-full pt-14 text-center">{data.userName}</h1>
      <div className="flex w-full justify-center">{displayData(data)}</div>
      <div className="fixed bottom-10 right-56 flex flex-col gap-4">
        <AddElement />
      </div>
    </>
  );
};

const headerNamesMapping: Record<string, string> = {
  heatPumps: "POMPY CIEPŁA",
  addons: "DODATKI",
  dotations: "DOTACJE",
  modernizacja_CO_CWU: "MODERNIZACJA CWU",
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
  fee: "MNOŻNIK PROWIZJI",
  electricityPrice: "CENA 1kW",
};
