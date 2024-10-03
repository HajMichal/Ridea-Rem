import { useDisclosure } from "@mantine/hooks";
import { AirCondition } from "@prisma/client";
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import { type AirConditionDataToCalculation } from "~/server/api/routers/airCondition/interfaces";
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

export const EditionForm = ({ data }: EditionForm) => {
  const [dataToChange, setDataToChange] = useState({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [pathKey, setPathKey] = useState<string | null>(null);
  const airConditionersArr: AirConditionerArr[] = [];

  const { mutate } = api.airCondMenagerData.edit.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  // This loop helps set default values of non changable data from json file
  data?.airConditioners.forEach((airConditioner) =>
    airConditionersArr.push({
      type: airConditioner.type,
      power: airConditioner.power,
      option: airConditioner.option,
      area: airConditioner.area,
      energyType: airConditioner.energyType,
    })
  );

  const { register, handleSubmit } = useForm<AirConditionDataToCalculation>({
    // defaultValues: {
    //   airConditioner: airConditionersArr,
    // },
  });

  const onSubmit: SubmitHandler<AirConditionDataToCalculation> = (data) => {
    // mutate({ [dynamicKey!]: data });
    close();
  };

  // //  I could merge those 2 function into 1 bigger recursive
  // //  function but imho its more readable now
  // function displayAirConditionersForms() {
  //   if (dynamicValues) {
  //     return dynamicValues.airConditioners.map(
  //       ({ type, price }: AirConditionData, index) => {
  //         return (
  //           <ChangeDataInputComponent
  //             {...register(
  //               `airConditioner[${index}].price` as keyof typeof dynamicValues,
  //               {
  //                 valueAsNumber: true,
  //               }
  //             )}
  //             title={type}
  //             defaultValue={price}
  //             key={type}
  //           />
  //         );
  //       }
  //     );
  //   }
  // }
  // function displayAddonsForms() {
  //   if (dynamicValues) {
  //     const addonsEntries = Object.entries(dynamicValues.addons);
  //     return addonsEntries.map(([key, value]: [key: string, value: number]) => {
  //       return (
  //         <ChangeDataInputComponent
  //           {...register(`addons.${key}` as keyof typeof dynamicValues, {
  //             valueAsNumber: true,
  //           })}
  //           title={dataNamesMappings[key] ?? key}
  //           defaultValue={value}
  //           key={key}
  //         />
  //       );
  //     });
  //   }
  // }

  function displayData(calcData: object, path: string[] = [], depth = 0) {
    if (depth === 6) return null;

    const saveChanges = () => {
      setEditingKey(null);
      setPathKey(null);
      // mutate({
      //   dataToChange,
      //   path,
      //   userId: menagers.length === 0 ? [data.userId] : menagers,
      // });
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
              key === "updatedAt"
            )
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
                        setPathKey(path[0] ?? null);
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
};
