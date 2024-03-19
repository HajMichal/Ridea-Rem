import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import { type ForCompanyDataToCalcualtionType } from "~/server/api/routers/forCompany/interfaces";
import { api } from "~/utils/api";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionForm {
  [key: string]: { [key: string]: ForCompanyDataToCalcualtionType };
}

export const EditionForm = ({ data }: EditionForm) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate } = api.forCompanyDataFlowRouter.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });
  const dynamicKey = Object.keys(data!)[0];
  const dynamicPropValues = data![dynamicKey!];
  const { register, handleSubmit } = useForm<ForCompanyDataToCalcualtionType>();

  const onSubmit: SubmitHandler<ForCompanyDataToCalcualtionType> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };

  const jsxPanel400Elements = [];
  const jsxPanel455Elements = [];
  const jsxPanel500Elements = [];

  for (const panelData in dynamicPropValues?.dane.czterysta) {
    const title = dataNamesMappings[panelData]!;
    if (dynamicPropValues.dane.czterysta.hasOwnProperty(panelData)) {
      const registerAddonKey =
        `dane.czterysta.${panelData}` as keyof typeof dynamicPropValues;
      const panelDataPrice =
        dynamicPropValues.dane.czterysta[
          panelData as keyof typeof dynamicPropValues.dane.czterysta
        ];
      jsxPanel400Elements.push(
        <ChangeDataInputComponent
          {...register(registerAddonKey, {
            valueAsNumber: true,
          })}
          title={title}
          defaultValue={panelDataPrice}
        />
      );
    }
  }
  for (const panelData in dynamicPropValues?.dane.czterysta_piecdziesiat) {
    const title = dataNamesMappings[panelData]!;
    if (
      dynamicPropValues.dane.czterysta_piecdziesiat.hasOwnProperty(panelData)
    ) {
      const registerAddonKey =
        `dane.czterysta_piecdziesiat.${panelData}` as keyof typeof dynamicPropValues;
      const panelDataPrice =
        dynamicPropValues.dane.czterysta_piecdziesiat[
          panelData as keyof typeof dynamicPropValues.dane.czterysta_piecdziesiat
        ];
      jsxPanel455Elements.push(
        <ChangeDataInputComponent
          {...register(registerAddonKey, {
            valueAsNumber: true,
          })}
          title={title}
          defaultValue={panelDataPrice}
        />
      );
    }
  }
  for (const panelData in dynamicPropValues?.dane.piecset) {
    const title = dataNamesMappings[panelData]!;
    if (dynamicPropValues.dane.piecset.hasOwnProperty(panelData)) {
      const registerAddonKey =
        `dane.piecset.${panelData}` as keyof typeof dynamicPropValues;
      const panelDataPrice =
        dynamicPropValues.dane.piecset[
          panelData as keyof typeof dynamicPropValues.dane.piecset
        ];
      jsxPanel500Elements.push(
        <ChangeDataInputComponent
          {...register(registerAddonKey, {
            valueAsNumber: true,
          })}
          title={title}
          defaultValue={panelDataPrice}
        />
      );
    }
  }

  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicKey}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">DANE </h2>
        <div className="flex">
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 400
            </h2>
            {jsxPanel400Elements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 455
            </h2>
            {jsxPanel455Elements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 500
            </h2>
            {jsxPanel500Elements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
        </div>
        <h2 className="mt-10 w-full text-center text-2xl">KOSZTY DODATKOWE</h2>
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.bloczki", {
            valueAsNumber: true,
          })}
          title="BLOCZKI"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.bloczki}
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.tigo", {
            valueAsNumber: true,
          })}
          title="TIGO"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.tigo}
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.ekierki", {
            valueAsNumber: true,
          })}
          title="EKIERKI"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.ekierki}
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.grunt", {
            valueAsNumber: true,
          })}
          title="GRUNT"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.grunt}
        />
        <h2 className="mt-10 w-full text-center text-2xl">POZOSTAŁE</h2>
        <ChangeDataInputComponent
          {...register("cena_skupu_pradu", {
            valueAsNumber: true,
          })}
          title="CENA SKUPU PRĄDU"
          defaultValue={dynamicPropValues!.cena_skupu_pradu}
        />
        <ChangeDataInputComponent
          {...register("prowizjaBiura", {
            valueAsNumber: true,
          })}
          title="PROWIZJA BIURA"
          defaultValue={dynamicPropValues!.prowizjaBiura}
        />
        <ChangeDataInputComponent
          {...register("oprocentowanie_kredytu", {
            valueAsNumber: true,
          })}
          title="OPROCENTOWANIE KREDYTU"
          defaultValue={dynamicPropValues!.oprocentowanie_kredytu}
        />
      </form>
      <button
        onClick={open}
        className="fixed bottom-20 right-56 mx-5 h-12 self-center rounded-xl bg-dark px-10 py-2 font-semibold text-white duration-300 hover:bg-brand hover:text-dark"
      >
        Zatwierdź
      </button>
      <Modal
        opened={opened}
        onClose={close}
        title="CZY NA PEWNO CHCESZ ZAPISAĆ ZMIENIONE WARTOŚCI ?"
        className="text-center font-orkneyBold"
        centered
      >
        <p className="font-orkney">
          Będzie to skutkowało zmianami w bazie danych, przez co ceny nowych
          wyliczeń za instalację ulegną zmianie.
        </p>
        <div className="flex w-full justify-between p-4">
          <button
            onClick={close}
            className="rounded-2xl bg-red p-2 px-4 font-orkneyBold duration-100 hover:scale-110"
          >
            ANULUJ
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="rounded-2xl bg-green-500 p-2 px-4 font-orkneyBold duration-100 hover:scale-110"
          >
            TAK
          </button>
        </div>
      </Modal>
    </>
  );
};

const dataNamesMappings: { [key: string]: string } = {
  dwa: "OD 0 DO 2",
  cztery: "OD 2.1 DO 4",
  szesc: "OD 4.1 DO 6",
  osiem: "OD 6.1 DO 8",
  dwanascie: "OD 8.1 DO 12",
  dwadziescia: "OD 12.1 DO 20",
  trzydziesci: "OD 20.1 DO 30",
  piecdziesiat: "OD 30.1 DO 50",
  overpiecdziesiat: "OD 50",
};
