import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { api } from "~/utils/api";
import { AddElement } from "./AddElement";
import { Button } from "@mantine/core";
import { MdOutlineAddchart } from "react-icons/md";
import { RemoveElement } from "./RemoveElement";
import React, { useState } from "react";

interface EditionForm {
  data: PhotovoltaicDataToCalculation;
  menagers: string[];
}

export const EditionForm = ({ data, menagers }: EditionForm) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dataToChange, setDataToChange] = useState({});

  const { mutate } = api.dataFlow.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: (err) => {
      console.log(err);
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });
  const { handleSubmit } = useForm<PhotovoltaicDataToCalculation>();

  // const onSubmit: SubmitHandler<PhotovoltaicDataToCalculation> = (formData) => {
  //   console.log(menagers, formData);
  //   mutate({
  //     userId: menagers.length === 0 ? [data.userId] : menagers,
  //     schema: { ...formData, userId: data.userId },
  //   });
  //   close();
  // };

  function DisplayData(calcData: object, path: string[] = [], depth = 0) {
    const [editingKey, setEditingKey] = useState<string | null>(null);
    if (depth === 6) return null;

    return (
      <>
        {Object.entries(calcData).map(
          ([key, value]: [key: string, value: number | object]) => {
            const isEditing = editingKey === key;
            if (typeof value !== "number" && typeof value !== "string") {
              return (
                <div key={key}>
                  <h1>{key}</h1>
                  {DisplayData(value, [...path, key], depth + 1)}
                </div>
              );
            } else {
              return (
                <div key={key} className="flex gap-2">
                  <p>{key}:</p>
                  {/* <p>{value}</p> */}
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
                      />
                      <button
                        onClick={() => {
                          setEditingKey(null);
                          mutate({
                            dataToChange,
                            path,
                            userId:
                              menagers.length === 0 ? [data.userId] : menagers,
                          });
                          console.log(path, dataToChange);
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingKey(null);
                          setDataToChange({});
                        }}
                      >
                        Discard
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{value}</p>
                      <button
                        className="h-6 w-10"
                        onClick={() => {
                          setEditingKey(key);
                        }}
                      >
                        edit
                      </button>
                    </>
                  )}
                </div>
              );
            }
          }
        )}
      </>
    );
  }

  return (
    <>
      <h1 className="w-full pt-14 text-center">{data.userName}</h1>
      <div>{DisplayData(data)}</div>
      <div className="fixed bottom-10 right-56 flex flex-col gap-4">
        <Button
          onClick={open}
          size="md"
          radius="md"
          leftIcon={<MdOutlineAddchart size={18} />}
          className="bg-gradient-to-br from-dark to-blue-900 tracking-wider text-white duration-150 hover:bg-blend-hard-light hover:shadow-xl"
        >
          Zatwierdź
        </Button>

        <AddElement />
      </div>

      {/* <ConfirmationModal
        title="CZY NA PEWNO CHCESZ ZAPISAĆ ZMIENIONE WARTOŚCI ?"
        close={close}
        opened={opened}
        handleFunction={handleSubmit(onSubmit)}
        description="Będzie to skutkowało zmianami w bazie danych, przez co ceny nowych
        wyliczeń za instalację ulegną zmianie."
      /> */}
    </>
  );
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
};
