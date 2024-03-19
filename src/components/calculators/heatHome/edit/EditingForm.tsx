import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import {
  type EachMenagerHeatHome,
  type HeatHomeDataCalculationType,
} from "~/server/api/routers/heatHome/interfaces";
import { api } from "~/utils/api";

interface HeatingThicknessType {
  grubosciOcieplenia: {
    cm_15: number;
    cm_20: number;
    cm_25: number;
  };
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface EditionFormType {
  [key: string]: EachMenagerHeatHome;
}
export const EditionForm = ({ data }: EditionFormType) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate } = api.heatHomeDataFlowRouter.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  const dynamicName = Object.keys(data!)[0];
  const dynamicPropValues = data![dynamicName!];
  const { register, handleSubmit } = useForm<HeatHomeDataCalculationType>();

  const onSubmit: SubmitHandler<HeatHomeDataCalculationType> = (data) => {
    mutate({ [dynamicName!]: data });
    close();
  };

  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicName}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">CIEPŁO WŁAŚCIWE</h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues).map(
            (value: [string, number | HeatingThicknessType], index) => {
              if (typeof value[1] !== "number") {
                return Object.entries(dynamicPropValues.grubosciOcieplenia).map(
                  (value: [string, number], index) => (
                    <ChangeDataInputComponent
                      {...register(
                        `grubosciOcieplenia.${value[0]}` as keyof typeof dynamicPropValues,
                        {
                          valueAsNumber: true,
                        }
                      )}
                      title={
                        heatingThicknessNamesMapping[value[0] || value[0]]!
                      }
                      defaultValue={value[1]}
                      key={index}
                    />
                  )
                );
              } else {
                return (
                  <ChangeDataInputComponent
                    {...register(
                      `${value[0]}` as keyof typeof dynamicPropValues,
                      {
                        valueAsNumber: true,
                      }
                    )}
                    title={jsonKeyNamesMapping[value[0] || value[0]]!}
                    defaultValue={value[1]}
                    key={index}
                  />
                );
              }
            }
          )}
      </form>
      <button
        onClick={open}
        className="fixed bottom-20 right-56 mx-5 h-12 self-center rounded-xl bg-dark px-10 py-2 font-semibold text-white duration-300 hover:bg-brand hover:text-dark"
      >
        Zatwierdź
      </button>
      <ConfirmationModal
        title="CZY NA PEWNO CHCESZ ZAPISAĆ ZMIENIONE WARTOŚCI ?"
        close={close}
        opened={opened}
        handleFunction={handleSubmit(onSubmit)}
        description=" Będzie to skutkowało zmianami w bazie danych, przez co ceny nowych
        wyliczeń za instalację ulegną zmianie."
      />
    </>
  );
};
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const jsonKeyNamesMapping: { [key: string]: string } = {
  m2_ocieplenia: "M² OCIEPLENIA",
  parapety: "PARAPETY",
  tynk: "M² TYNK",
  wykonczenie: "M² WYKOŃCZENIE GÓRNE",
};
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const heatingThicknessNamesMapping: { [key: string]: string } = {
  cm_15: "15 CM GRUBOŚCI",
  cm_20: "20 CM GRUBOŚCI",
  cm_25: "25 CM GRUBOŚCI",
};
