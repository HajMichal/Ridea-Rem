import { useState } from "react";
import toast from "react-hot-toast";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { type TurbineCalcData } from "~/server/api/routers/turbines/interfaces";
import { api } from "~/utils/api";

interface Props {
  data: TurbineCalcData;
  menagers: string[];
}
const EditionForm = ({ data, menagers }: Props) => {
  const [dataToChange, setDataToChange] = useState({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [pathKey, setPathKey] = useState<string | null>(null);

  const utils = api.useUtils();
  const { mutate } = api.turbinesMenagerRouter.edit.useMutation({
    onSuccess: () => {
      void utils.turbinesMenagerRouter.getAll.invalidate();
      toast.success("Dane zostały pomyślnie zmienione.");
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
      <div
        className={`flex w-full flex-col items-center ${
          path.length === 2 ? "pb-5" : "pb-8"
        }`}
      >
        {/* If there was over 1 loop then data should be sorted, otherwise data should NOT be sorted */}
        {(depth >= 1
          ? Object.entries(calcData).sort(([keyA], [keyB]) =>
              keyA.localeCompare(keyB)
            )
          : Object.entries(calcData)
        ).map(([key, value]: [key: string, value: number | object]) => {
          if (key === "id" || key === "userId" || key === "userName")
            return null;

          const isEditing = editingKey === key && pathKey === (path[0] ?? null);

          if (typeof value !== "number" && typeof value !== "string") {
            return (
              <div key={key} className="mt-4 flex w-full flex-col items-center">
                <h1
                  className={`text-center font-orkneyBold ${
                    path.length === 1 && "text-xl"
                  }`}
                >
                  {headerNamesMapping[key]}
                </h1>
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
                  <p
                    className={`text-md mt-1 text-right ${
                      (key === "montaż dodatkowo" || key === "montaż bazowo") &&
                      "text-brand"
                    }`}
                  >
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
                      className="col-start-7 col-end-8 h-[34.8px] border border-dark p-2 px-2 focus:outline-brand"
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
                  <p
                    onClick={() => {
                      setEditingKey(key);
                      setPathKey(path[0] ?? null);
                    }}
                    className="border border-dark bg-white p-1 px-2 font-sans"
                  >
                    {value}
                  </p>
                )}
              </div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-10 w-full pt-14 text-center">{data.userName}</h1>
      <div className="flex w-full justify-center">{displayData(data)}</div>
    </>
  );
};
export default EditionForm;

const headerNamesMapping: Record<string, string> = {
  turbines: "TURBINY WIATROWE",
  addons: "DODATKI",
  energyStore: "MAGAZYN ENERGII",
  battery: "POJEMNOŚĆ BATERII",
  stalowy: "MASZT STALOWY",
};

const dataNamesMappings: Record<string, string> = {
  "podstawa dachowa": "PODSTAWA DACHOWA TURBIN DO 500W",
  "podstawa dachowa1000/1500": "PODSTAWA DACHOWA TURBIN 1000 i 1500W",
  "podstawa dachowa3000": "PODSTAWA DACHOWA TURBIN 3000W",
  zwyzka: "ZWYŻKA",
  kable: "KABLE / ZABEZPIECZENIA",
  cenaZaKazdyWat: "CENA ZA KAŻDY WAT INSTALACJI",
  "montaż bazowo": "PROWIZJA BIURA",
  "montaż dodatkowo": "PROWIZJA BIURA OD SZT",
};
