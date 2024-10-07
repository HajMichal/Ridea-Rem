import { type AirCondition } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { api } from "~/utils/api";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionForm {
  data: AirCondition;
  menagers: string[];
}
interface AirConditionerArr {
  type: string;
  power: number;
  option: string;
  area: string;
  energyType: string;
}

export const EditionForm = ({ data, menagers }: EditionForm) => {
  const [dataToChange, setDataToChange] = useState({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [pathKey, setPathKey] = useState<string | null>(null);
  const airConditionersArr: AirConditionerArr[] = [];

  const utils = api.useContext();

  const { mutate } = api.airCondMenagerData.edit.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
      void utils.airCondMenagerData.invalidate();
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
      <div className="pb-16">
        {Object.entries(calcData).map(
          ([key, value]: [key: string, value: number | object]) => {
            if (
              key === "id" ||
              key === "userId" ||
              key === "userName" ||
              key === "createdAt" ||
              key === "editedAt" ||
              key === "option" ||
              key === "energyType" ||
              key === "area" ||
              key === "power"
            )
              return null;

            const isEditing =
              editingKey === key && pathKey && path.includes(pathKey);

            if (typeof value !== "number" && typeof value !== "string") {
              return (
                <div key={key}>
                  <h1
                    className={`text-center font-orkneyBold ${
                      path.length === 1 && "text-2xl"
                    }`}
                  >
                    {headerNamesMapping[key] ?? key}
                  </h1>
                  {displayData(value, [...path, key], depth + 1)}
                </div>
              );
            } else {
              return (
                <div key={key} className="m-1 -ml-24 flex items-center gap-2">
                  <p className="-mb-2 w-64 text-right text-xl">
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
                    <p
                      onClick={() => {
                        setEditingKey(key);
                        setPathKey(path.at(-1) ?? null);
                      }}
                      className="w-24 border border-dark bg-white p-1 px-2 font-sans"
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

const headerNamesMapping: { [key: string]: string } = {
  airConditioners: "KLIMATYZATORY",
  addons: "KOSZTY DODATKOWE",
};

const dataNamesMappings: { [key: string]: string } = {
  "copperPipe1/4+3/8": "RURA MIEDZIANA 1/4+3/8",
  "copperCable1/5": "PRZEWÓD MIEDZIANY 1,5",
  "copperCable1/6": "PRZEWÓD MIEDZIANY 1,6",
  dashPipe: "RURA SKROPLIN",
  airConditionerSupport: "WSPORNIK KLIMATYZATORA",
  gutter: "KORYTO 8x6",
  connector: "ŁĄCZNIKI / KOLANKA",
  elasticPipe: "RURA ELASTYCZNA",
  installationTape: "TAŚMA",
  wallHole: "PRZEPUST ŚCIENNY",
  montage: "MONTAŻ",
  syfon: "SYFON",
  dashPump: "POMPA SKROPLIN",
  area: "POWIERZCHNIA",
  power: "MOC",
  price: "CENA",
  option: "OPCJE",
  energyType: "ENERGOOSZCZĘDNOŚĆ",
};
