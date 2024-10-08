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

  const utils = api.useContext();
  const { mutate } = api.turbinesDataFlowRouter.edit.useMutation({
    onSuccess: () => {
      void utils.turbinesDataFlowRouter.getAllCalcsData.invalidate();
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
      <div className={`${path.length === 2 ? "pb-5" : "pb-10"}`}>
        {Object.entries(calcData).map(
          ([key, value]: [key: string, value: number | object]) => {
            if (key === "id" || key === "userId" || key === "userName")
              return null;

            const isEditing =
              editingKey === key && pathKey === (path[0] ?? null);

            if (typeof value !== "number" && typeof value !== "string") {
              return (
                <div key={key}>
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
                <div key={key} className="m-1 -ml-28 flex items-center gap-2">
                  <p className="w-64 self-center text-right text-xl">
                    {dataNamesMappings[key] ?? key.toUpperCase()}:
                  </p>
                  {isEditing ? (
                    <article className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder={value.toString()}
                        onChange={(e) =>
                          setDataToChange({
                            [key]: Number(e.target.value),
                          })
                        }
                        autoFocus
                        className="h-[34.8px] w-24 border border-dark p-2 px-2 focus:outline-brand"
                      />
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
                    </article>
                  ) : (
                    <p
                      onClick={() => {
                        setEditingKey(key);
                        setPathKey(path[0] ?? null);
                      }}
                      className="flex w-24 items-center border border-dark bg-white p-1 px-2 font-sans"
                    >
                      {value}
                    </p>
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
  "podstawa dachowa": "PODSTAWA DACHOWA TURBIN DO 1500W",
  "podstawa dachowa3000": "PODSTAWA DACHOWA TURBIN 3000W",
};
