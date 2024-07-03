import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import {
  AirConditionData,
  type AirConditionDataToCalculation,
} from "~/server/api/routers/airCondition/interfaces";
import { api } from "~/utils/api";

interface EditionForm {
  [key: string]: { [key: string]: AirConditionDataToCalculation };
}
interface AirConditionerArr {
  type: string;
  power: number;
  option: string;
  area: string;
  energyType: string;
}

export const EditionForm = ({ data }: EditionForm) => {
  const [opened, { open, close }] = useDisclosure(false);
  const airConditionersArr: AirConditionerArr[] = [];

  const { mutate } = api.airConditionDataFlowRouter.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });
  const dynamicKey = Object.keys(data!)[0];
  const dynamicValues = data![dynamicKey!];

  // This loop helps set default values of non changable data from json file
  dynamicValues?.airConditioner.forEach((airConditioner) =>
    airConditionersArr.push({
      type: airConditioner.type,
      power: airConditioner.power,
      option: airConditioner.option,
      area: airConditioner.area,
      energyType: airConditioner.energyType,
    })
  );

  const { register, handleSubmit } = useForm<AirConditionDataToCalculation>({
    defaultValues: {
      airConditioner: airConditionersArr,
    },
  });

  const onSubmit: SubmitHandler<AirConditionDataToCalculation> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };

  //  I could merge those 2 function into 1 bigger recursive
  //  function but imho its more readable now
  function displayAirConditionersForms() {
    if (dynamicValues) {
      return dynamicValues.airConditioner.map(
        ({ type, price }: AirConditionData, index) => {
          return (
            <ChangeDataInputComponent
              {...register(
                `airConditioner[${index}].price` as keyof typeof dynamicValues,
                {
                  valueAsNumber: true,
                }
              )}
              title={type}
              defaultValue={price}
              key={type}
            />
          );
        }
      );
    }
  }
  function displayAddonsForms() {
    if (dynamicValues) {
      const addonsEntries = Object.entries(dynamicValues.addons);
      return addonsEntries.map(([key, value]: [key: string, value: number]) => {
        return (
          <ChangeDataInputComponent
            {...register(`addons.${key}` as keyof typeof dynamicValues, {
              valueAsNumber: true,
            })}
            title={dataNamesMappings[key] ?? key}
            defaultValue={value}
            key={key}
          />
        );
      });
    }
  }
  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicKey}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">DANE </h2>
        {displayAirConditionersForms()}
        <h2 className="mt-10 w-full text-center text-2xl">KOSZTY DODATKOWE</h2>
        {displayAddonsForms()}
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
