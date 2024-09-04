import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { api } from "~/utils/api";

interface EditionForm {
  data: PhotovoltaicDataToCalculation;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EditionForm = ({ data }: EditionForm) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate } = api.dataFlow.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: (err) => {
      console.log(err);
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });
  const { register, handleSubmit } = useForm<PhotovoltaicDataToCalculation>();

  const onSubmit: SubmitHandler<PhotovoltaicDataToCalculation> = (data) => {
    mutate(data);
    close();
  };

  const jsxPanel400Elements = [];
  const jsxmediumPanelElements = [];
  const jsxlargestPanelElements = [];

  for (const panelData in data?.panels_small) {
    const title = dataNamesMappings[panelData]!;
    if (data.panels_small.hasOwnProperty(panelData)) {
      const registerAddonKey = `panels_small.${panelData}` as keyof typeof data;
      const panelDataPrice =
        data.panels_small[panelData as keyof typeof data.panels_small];
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
  for (const panelData in data?.panels_medium) {
    const title = dataNamesMappings[panelData]!;
    if (data.panels_medium.hasOwnProperty(panelData)) {
      const registerAddonKey =
        `panels_medium.${panelData}` as keyof typeof data;
      const panelDataPrice =
        data.panels_medium[panelData as keyof typeof data.panels_medium];
      jsxmediumPanelElements.push(
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
  for (const panelData in data?.panels_large) {
    const title = dataNamesMappings[panelData]!;
    if (data.panels_large.hasOwnProperty(panelData)) {
      const registerAddonKey = `panels_large.${panelData}` as keyof typeof data;
      const panelDataPrice =
        data.panels_large[panelData as keyof typeof data.panels_large];
      jsxlargestPanelElements.push(
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
      <h1 className="w-full pt-14 text-center">{data.userName}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">DANE </h2>
        <div className="flex">
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 410
            </h2>
            {jsxPanel400Elements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 455
            </h2>
            {jsxmediumPanelElements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 580
            </h2>
            {jsxlargestPanelElements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
        </div>
        <h2 className="mt-10 w-full text-center text-2xl">MAGAZYN ENERGII</h2>
        {data &&
          Object.entries(data.energyStore).map((key, index) => {
            return (
              <ChangeDataInputComponent
                key={index}
                {...register(`energyStore.${key[0]}` as keyof typeof data, {
                  valueAsNumber: true,
                })}
                title={key[0]}
                defaultValue={key[1]}
              />
            );
          })}

        <h2 className="mt-10 w-full text-center text-2xl">DOTACJE</h2>
        <ChangeDataInputComponent
          {...register("dotations.magazynCiepla", {
            valueAsNumber: true,
          })}
          title="MAGAZYN CIEPŁA"
          defaultValue={data.dotations.magazynCiepla}
        />
        <ChangeDataInputComponent
          {...register("dotations.menagerEnergii", {
            valueAsNumber: true,
          })}
          title="MENAGER ENERGII"
          defaultValue={data.dotations.menagerEnergii}
        />
        <ChangeDataInputComponent
          {...register("dotations.mojPrad", {
            valueAsNumber: true,
          })}
          title="MÓJ PRĄD"
          defaultValue={data.dotations.mojPrad}
        />
        <ChangeDataInputComponent
          {...register("dotations.mp_mc", {
            valueAsNumber: true,
          })}
          title="MÓJ PRĄD + MAGAZYN CIEPŁA"
          defaultValue={data.dotations.mp_mc}
        />
        <h2 className="mt-10 w-full text-center text-2xl">KOSZTY DODATKOWE</h2>
        <ChangeDataInputComponent
          {...register("addons.bloczki", {
            valueAsNumber: true,
          })}
          title="BLOCZKI"
          defaultValue={data.addons.bloczki}
        />
        <ChangeDataInputComponent
          {...register("addons.tigo", {
            valueAsNumber: true,
          })}
          title="TIGO"
          defaultValue={data.addons.tigo}
        />
        <ChangeDataInputComponent
          {...register("addons.ekierki", {
            valueAsNumber: true,
          })}
          title="STANDARDOWE EKIERKI"
          defaultValue={data.addons.ekierki}
        />
        <ChangeDataInputComponent
          {...register("addons.certyfikowaneEkierki", {
            valueAsNumber: true,
          })}
          title="CERTYFIKOWANE EKIERKI"
          defaultValue={data.addons.certyfikowaneEkierki}
        />
        <ChangeDataInputComponent
          {...register("addons.grunt", {
            valueAsNumber: true,
          })}
          title="GRUNT"
          defaultValue={data.addons.grunt}
        />
        <ChangeDataInputComponent
          {...register("addons.inwerterHybrydowy", {
            valueAsNumber: true,
          })}
          title="INWERTER HYBRYDOWY"
          defaultValue={data.addons.inwerterHybrydowy}
        />
        <ChangeDataInputComponent
          {...register("addons.magazynCiepla", {
            valueAsNumber: true,
          })}
          title="MAGAZYN CIEPŁA - CENA"
          defaultValue={data.addons.magazynCiepla}
        />
        <ChangeDataInputComponent
          {...register("addons.ems", {
            valueAsNumber: true,
          })}
          title="EMS"
          defaultValue={data.addons.ems}
        />
        <h2 className="mt-10 w-full text-center text-2xl">CAR PORT</h2>
        {data &&
          Object.entries(data.carPort).map((key, index) => {
            return (
              <ChangeDataInputComponent
                {...register(`carPort.${key[0]}` as keyof typeof data, {
                  valueAsNumber: true,
                })}
                title={key[0]}
                defaultValue={data.carPort[key[0] as keyof typeof data.carPort]}
                key={index}
              />
            );
          })}
        <h2 className="mt-10 w-full text-center text-2xl">ZBIORNIKI CWU</h2>
        <ChangeDataInputComponent
          {...register("boilers.zbiornik_100L", {
            valueAsNumber: true,
          })}
          title="Zbiornik 100L"
          defaultValue={data.boilers.zbiornik_100L}
        />
        <ChangeDataInputComponent
          {...register("boilers.zbiornik_140L", {
            valueAsNumber: true,
          })}
          title="Zbiornik 140L"
          defaultValue={data.boilers.zbiornik_140L}
        />
        <ChangeDataInputComponent
          {...register("boilers.zbiornik_140L_z_wezem", {
            valueAsNumber: true,
          })}
          title="Zbiornik 140L Z wężownicą"
          defaultValue={data.boilers.zbiornik_140L_z_wezem}
        />
        <ChangeDataInputComponent
          {...register("boilers.zbiornik_200L", {
            valueAsNumber: true,
          })}
          title="Zbiornik 200L"
          defaultValue={data.boilers.zbiornik_200L}
        />
        <ChangeDataInputComponent
          {...register("boilers.zbiornik_200L_z_wezem", {
            valueAsNumber: true,
          })}
          title="Zbiornik 200L z wężownicą"
          defaultValue={data.boilers.zbiornik_200L_z_wezem}
        />

        <h2 className="mt-10 w-full text-center text-2xl">POZOSTAŁE</h2>

        <ChangeDataInputComponent
          {...register("electricityPrice", {
            valueAsNumber: true,
          })}
          title="CENA SKUPU PRĄDU"
          defaultValue={data.electricityPrice}
        />
        <ChangeDataInputComponent
          {...register("creditPercentage", {
            valueAsNumber: true,
          })}
          title="OPROCENTOWANIE KREDYTU"
          defaultValue={data.creditPercentage}
        />
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
        description="Będzie to skutkowało zmianami w bazie danych, przez co ceny nowych
        wyliczeń za instalację ulegną zmianie."
      />
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
