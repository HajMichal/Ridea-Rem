import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { api } from "~/utils/api";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionForm {
  [key: string]: { [key: string]: PhotovoltaicDataToCalculation };
}

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
  const dynamicKey = Object.keys(data!)[0];
  const dynamicPropValues = data![dynamicKey!];
  const { register, handleSubmit } = useForm<PhotovoltaicDataToCalculation>();

  const onSubmit: SubmitHandler<PhotovoltaicDataToCalculation> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };

  const jsxPanel400Elements = [];
  const jsxmediumPanelElements = [];
  const jsxlargestPanelElements = [];

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
  for (const panelData in dynamicPropValues?.dane.piecset) {
    const title = dataNamesMappings[panelData]!;
    if (dynamicPropValues.dane.piecset.hasOwnProperty(panelData)) {
      const registerAddonKey =
        `dane.piecset.${panelData}` as keyof typeof dynamicPropValues;
      const panelDataPrice =
        dynamicPropValues.dane.piecset[
          panelData as keyof typeof dynamicPropValues.dane.piecset
        ];
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
      <h1 className="w-full pt-14 text-center">{dynamicKey}</h1>
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
        <h2 className="mt-10 w-full text-center text-2xl">
          MAGAZYN ENERGII SOLAX
        </h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues.magazyn_energii_solax).map(
            (key, index) => {
              const nameMappings: { [key: string]: string } = {
                prog0: "3.1 kWh",
                prog1: "6.1 kWh",
                prog2: "11.6 kWh",
                prog3: "17.4 kWh",
                prog4: "23.2 kWh",
                prog5: "29 kWh",
                prog6: "34.8 kWh",
                prog7: "40.6 kWh",
                prog8: "46.4 kWh",
              };
              return (
                <ChangeDataInputComponent
                  key={index}
                  {...register(
                    `magazyn_energii_solax.${key[0]}` as keyof typeof dynamicPropValues,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  title={nameMappings[key[0]] || key[0]}
                  defaultValue={key[1]}
                />
              );
            }
          )}
        <h2 className="mt-10 w-full text-center text-2xl">
          MAGAZYN ENERGII HYPONTECH
        </h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues.magazyn_energii_hipontech).map(
            (key, index) => {
              const nameMappings: { [key: string]: string } = {
                prog0: "7.2 kWh",
                prog1: "10.8 kWh",
                prog2: "14.4kWh",
              };
              return (
                <ChangeDataInputComponent
                  key={index}
                  {...register(
                    `magazyn_energii_hipontech.${key[0]}` as keyof typeof dynamicPropValues,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  title={nameMappings[key[0]] || key[0]}
                  defaultValue={key[1]}
                />
              );
            }
          )}

        <h2 className="mt-10 w-full text-center text-2xl">DOTACJE</h2>
        <ChangeDataInputComponent
          {...register("dotacje.magazynCiepla", {
            valueAsNumber: true,
          })}
          title="MAGAZYN CIEPŁA"
          defaultValue={dynamicPropValues!.dotacje.magazynCiepla}
        />
        <ChangeDataInputComponent
          {...register("dotacje.menagerEnergii", {
            valueAsNumber: true,
          })}
          title="MENAGER ENERGII"
          defaultValue={dynamicPropValues!.dotacje.menagerEnergii}
        />
        <ChangeDataInputComponent
          {...register("dotacje.mojPrad", {
            valueAsNumber: true,
          })}
          title="MÓJ PRĄD"
          defaultValue={dynamicPropValues!.dotacje.mojPrad}
        />
        <ChangeDataInputComponent
          {...register("dotacje.mp_mc", {
            valueAsNumber: true,
          })}
          title="MÓJ PRĄD + MAGAZYN CIEPŁA"
          defaultValue={dynamicPropValues!.dotacje.mp_mc}
        />
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
          title="STANDARDOWE EKIERKI"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.ekierki}
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.certyfikowaneEkierki", {
            valueAsNumber: true,
          })}
          title="CERTYFIKOWANE EKIERKI"
          defaultValue={
            dynamicPropValues!.koszty_dodatkowe.certyfikowaneEkierki
          }
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.grunt", {
            valueAsNumber: true,
          })}
          title="GRUNT"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.grunt}
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.inwerterHybrydowy", {
            valueAsNumber: true,
          })}
          title="INWERTER HYBRYDOWY"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.inwerterHybrydowy}
        />
        <h2 className="mt-10 w-full text-center text-2xl">CAR PORT</h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues.carPort).map((key, index) => {
            return (
              <ChangeDataInputComponent
                {...register(
                  `carPort.${key[0]}` as keyof typeof dynamicPropValues,
                  {
                    valueAsNumber: true,
                  }
                )}
                title={key[0]}
                defaultValue={
                  dynamicPropValues.carPort[
                    key[0] as keyof typeof dynamicPropValues.carPort
                  ]
                }
                key={index}
              />
            );
          })}
        <h2 className="mt-10 w-full text-center text-2xl">ZBIORNIKI CWU</h2>
        <ChangeDataInputComponent
          {...register("zbiorniki.zbiornik_100L", {
            valueAsNumber: true,
          })}
          title="Zbiornik 100L"
          defaultValue={dynamicPropValues!.zbiorniki.zbiornik_100L}
        />
        <ChangeDataInputComponent
          {...register("zbiorniki.zbiornik_140L", {
            valueAsNumber: true,
          })}
          title="Zbiornik 140L"
          defaultValue={dynamicPropValues!.zbiorniki.zbiornik_140L}
        />
        <ChangeDataInputComponent
          {...register("zbiorniki.zbiornik_140L_z_wezem", {
            valueAsNumber: true,
          })}
          title="Zbiornik 140L Z wężownicą"
          defaultValue={dynamicPropValues!.zbiorniki.zbiornik_140L_z_wezem}
        />
        <ChangeDataInputComponent
          {...register("zbiorniki.zbiornik_200L", {
            valueAsNumber: true,
          })}
          title="Zbiornik 200L"
          defaultValue={dynamicPropValues!.zbiorniki.zbiornik_200L}
        />
        <ChangeDataInputComponent
          {...register("zbiorniki.zbiornik_200L_z_wezem", {
            valueAsNumber: true,
          })}
          title="Zbiornik 200L z wężownicą"
          defaultValue={dynamicPropValues!.zbiorniki.zbiornik_200L_z_wezem}
        />

        <h2 className="mt-10 w-full text-center text-2xl">POZOSTAŁE</h2>
        <ChangeDataInputComponent
          {...register("magazynCiepla", {
            valueAsNumber: true,
          })}
          title="MAGAZYN CIEPŁA - CENA"
          defaultValue={dynamicPropValues!.magazynCiepla}
        />
        <ChangeDataInputComponent
          {...register("cena_skupu_pradu", {
            valueAsNumber: true,
          })}
          title="CENA SKUPU PRĄDU"
          defaultValue={dynamicPropValues!.cena_skupu_pradu}
        />
        <ChangeDataInputComponent
          {...register("ems", {
            valueAsNumber: true,
          })}
          title="EMS"
          defaultValue={dynamicPropValues!.ems}
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

const dataNamesMappings: { [key: string]: string } = {
  dwa: "OD 0 DO 2",
  cztery: "OD 2.1 DO 4",
  szesc: "OD 4.1 DO 6",
  osiem: "OD 6.1 DO 8",
  dwanascie: "OD 8.1 DO 12",
  dwadziescia: "OD 12.1 DO 20",
  trzydziesci: "OD 20.1 DO 30",
  piecdziesiat: "OD 30.1 DO 50",
};
