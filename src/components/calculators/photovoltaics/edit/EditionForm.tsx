import toast from "react-hot-toast";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { api } from "~/utils/api";
import { AddElement } from "./AddElement";
import { RemoveElement } from "./RemoveElement";
import { GiCancel } from "react-icons/gi";
import { BsDatabaseFillCheck } from "react-icons/bs";
import React, { useState } from "react";

import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";

interface EditionForm {
  data: PhotovoltaicDataToCalculation;
  menagers: string[];
}

export const EditionForm = ({ data, menagers }: EditionForm) => {
  const [dataToChange, setDataToChange] = useState({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [pathKey, setPathKey] = useState<string | null>(null);

  const utils = api.useContext();

  const { mutate } = api.pvMenagerRouter.edit.useMutation({
    onSuccess: () => {
      void utils.pvMenagerRouter.getAll.invalidate();
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: (err) => {
      console.log(err);
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
      <div className="pb-16">
        {Object.entries(calcData).map(
          ([key, value]: [key: string, value: number | object]) => {
            if (key === "id" || key === "userId" || key === "userName")
              return null;

            const isEditing =
              editingKey === key && pathKey === (path[0] ?? null);

            if (typeof value !== "number" && typeof value !== "string") {
              return (
                <div key={key}>
                  <h1 className="text-center font-orkneyBold">
                    {headerNamesMapping[key]}
                  </h1>
                  {displayData(value, [...path, key], depth + 1)}
                </div>
              );
            } else {
              return (
                <div key={key} className="m-1 -ml-40 flex items-center gap-2">
                  <p className="w-64 self-center text-right text-xl">
                    {dataNamesMappings[key] ?? key.toUpperCase()}:
                  </p>
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
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => {
                          setEditingKey(key);
                          setPathKey(path[0] ?? null);
                        }}
                        className="w-24 border border-dark bg-white p-1 px-2 font-sans"
                      >
                        {value}
                      </p>
                      {(path[0] === "boilers" || path[0] === "energyStore") && (
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
  panels_small: "PANELE " + smallestPanel,
  panels_medium: "PANELE " + mediumPanel,
  panels_large: "PANELE " + largestPanel,
  addons: "DODATKI",
  dotations: "DOTACJE",
  boilers: "BOILERY",
  energyStore: "MAGAZYN ENERGII",
  carPort: "CAR PORT",
};

const dataNamesMappings: Record<string, string> = {
  dwa: "OD 0 DO 2",
  cztery: "OD 2.1 DO 4",
  szesc: "OD 4.1 DO 6",
  osiem: "OD 6.1 DO 8",
  dwanascie: "OD 8.1 DO 12",
  dwadziescia: "OD 12.1 DO 20",
  trzydziesci: "OD 20.1 DO 30",
  piecdziesiat: "OD 30.1 DO 50",
  ems: "EMS",
  tigo: "TIGO",
  grunt: "POSADOWIENIE NA GRUNCIE",
  bloczki: "BLOCZKI",
  ekierki: "EKIERKI",
  kableAC: "PRZEWODY AC",
  matebox: "MATE BOX",
  przekopy: "PRZEKOPY",
  magazynCiepla: "MAGAZYN CIEPŁA",
  inwerterHybrydowy: "INWERTER HYBRYDOWY",
  certyfikowaneEkierki: "CERTYFIKOWANE EKIERKI",
  mp_mc: "MÓJ PRĄD + MAGAZYN CIEPŁA",
  mojPrad: "MÓJ PRĄD",
  menagerEnergii: "MENAGER ENERGII",
  creditPercentage: "OPROCENTOWANIE KREDYTU",
  electricityPrice: "CENA PRĄDU",
};
