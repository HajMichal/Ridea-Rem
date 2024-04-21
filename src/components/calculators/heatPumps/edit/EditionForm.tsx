import { useDisclosure } from "@mantine/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ChangeDataInputComponent } from "~/components/changeDataInputComponent";
import {
  type EachMenagerHeatPump,
  type HeatPumpDataToCalculationType,
} from "~/server/api/routers/heatpump/interfaces";
import { api } from "~/utils/api";
import { AddNewHeatPump } from "./AddNewHeatPump";
import { RemovePump } from "./RemovePump";
import { ConfirmationModal } from "~/components/ConfirmationModal";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionFormType {
  [key: string]: EachMenagerHeatPump;
}

export const EditionForm = ({ data }: EditionFormType) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate } = api.heatPumpDataFlowRouter.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  const dynamicKey = Object.keys(data!)[0];
  const dynamicPropValues = data![dynamicKey!];

  const { register, handleSubmit } = useForm<HeatPumpDataToCalculationType>();

  const onSubmit: SubmitHandler<HeatPumpDataToCalculationType> = (data) => {
    mutate({ [dynamicKey!]: data });

    close();
  };

  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicKey}</h1>
      <form className="w-full pb-20 pt-3">
        <span className="flex w-full items-center justify-center gap-5">
          <h2 className="mt-5 text-center text-3xl ">POMPY CIEPŁA</h2>
          <AddNewHeatPump />
        </span>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues.pompy_ciepla).map((key, index) => {
            return (
              <div className="my-7 flex flex-col items-center" key={index}>
                <div className="flex items-end">
                  <RemovePump pumpName={key[0]} />
                  <ChangeDataInputComponent
                    {...register(
                      `pompy_ciepla.${key[0]}.cena` as keyof typeof dynamicPropValues,
                      {
                        valueAsNumber: true,
                      }
                    )}
                    title={key[0]}
                    defaultValue={key[1].cena}
                  />
                </div>
                <ChangeDataInputComponent
                  {...register(
                    `pompy_ciepla.${key[0]}.mnozik_prowizji` as keyof typeof dynamicPropValues,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  title="MNOŻNIK PROWIZJI"
                  defaultValue={key[1].mnozik_prowizji}
                />
              </div>
            );
          })}
        <h2 className="mt-5 w-full text-center text-3xl">BUFORY</h2>
        <h2 className="mt-5 w-full text-center text-xl">BUFORY 100L</h2>
        <ChangeDataInputComponent
          {...register("bufory.bufory100l.przylaczeSchemat17", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 17"
          defaultValue={dynamicPropValues!.bufory.bufory100l.przylaczeSchemat17}
        />
        <ChangeDataInputComponent
          {...register("bufory.bufory100l.przylaczeSchemat24", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 24"
          defaultValue={dynamicPropValues!.bufory.bufory100l.przylaczeSchemat24}
        />
        <ChangeDataInputComponent
          {...register("bufory.bufory100l.przylaczeSchemat34", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 34"
          defaultValue={dynamicPropValues!.bufory.bufory100l.przylaczeSchemat34}
        />
        <h2 className="mt-5 w-full text-center text-xl">BUFORY 300L</h2>
        <ChangeDataInputComponent
          {...register("bufory.bufory300l.przylaczeSchemat17", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 17"
          defaultValue={dynamicPropValues!.bufory.bufory300l.przylaczeSchemat17}
        />
        <ChangeDataInputComponent
          {...register("bufory.bufory300l.przylaczeSchemat24", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 24"
          defaultValue={dynamicPropValues!.bufory.bufory300l.przylaczeSchemat24}
        />
        <ChangeDataInputComponent
          {...register("bufory.bufory300l.przylaczeSchemat34", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 34"
          defaultValue={dynamicPropValues!.bufory.bufory300l.przylaczeSchemat34}
        />
        <h2 className="mt-5 w-full text-center text-xl">BUFORY 500L</h2>
        <ChangeDataInputComponent
          {...register("bufory.bufory500l.przylaczeSchemat17", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 17"
          defaultValue={dynamicPropValues!.bufory.bufory500l.przylaczeSchemat17}
        />
        <ChangeDataInputComponent
          {...register("bufory.bufory500l.przylaczeSchemat24", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 24"
          defaultValue={dynamicPropValues!.bufory.bufory500l.przylaczeSchemat24}
        />
        <ChangeDataInputComponent
          {...register("bufory.bufory500l.przylaczeSchemat34", {
            valueAsNumber: true,
          })}
          title="PRZYŁĄCZE SCHEMAT 34"
          defaultValue={dynamicPropValues!.bufory.bufory500l.przylaczeSchemat34}
        />
        {/* {jsxAddonsElements.map((element, index) => (
            <div key={index}>{element}</div>
          ))} */}
        <h2 className="mt-5 w-full text-center text-3xl">DODATKI</h2>

        {dynamicPropValues &&
          Object.entries(dynamicPropValues.dodatki).map((key, index) => {
            return (
              <ChangeDataInputComponent
                {...register(
                  `dodatki.${key[0]}` as keyof typeof dynamicPropValues,
                  {
                    valueAsNumber: true,
                  }
                )}
                title={addonNamesMappings[key[0]]!}
                defaultValue={
                  dynamicPropValues.dodatki[
                    key[0] as keyof typeof dynamicPropValues.dodatki
                  ]
                }
                key={index}
              />
            );
          })}
        <h2 className="mt-5 w-full text-center text-3xl">
          DOTACJE I OPROCENTOWANIA
        </h2>
        <ChangeDataInputComponent
          {...register("dotacje.modernizacja_CO_CWU.prog1", {
            valueAsNumber: true,
          })}
          title="MODERNIZACJA CO ORAZ CWU PRÓG 1"
          defaultValue={dynamicPropValues!.dotacje.modernizacja_CO_CWU.prog1}
        />
        <ChangeDataInputComponent
          {...register("dotacje.modernizacja_CO_CWU.prog2", {
            valueAsNumber: true,
          })}
          title="MODERNIZACJA CO ORAZ CWU PRÓG 2"
          defaultValue={dynamicPropValues!.dotacje.modernizacja_CO_CWU.prog2}
        />
        <ChangeDataInputComponent
          {...register("dotacje.modernizacja_CO_CWU.prog3", {
            valueAsNumber: true,
          })}
          title="MODERNIZACJA CO ORAZ CWU PRÓG 3"
          defaultValue={dynamicPropValues!.dotacje.modernizacja_CO_CWU.prog3}
        />
        <ChangeDataInputComponent
          {...register("dotacje.modernizacja_CO_CWU.mojPrad", {
            valueAsNumber: true,
          })}
          title="MODERNIZACJA CO ORAZ CWU MÓJ PRĄD"
          defaultValue={dynamicPropValues!.dotacje.modernizacja_CO_CWU.mojPrad}
        />
        <ChangeDataInputComponent
          {...register("dotacje.pc.prog1", {
            valueAsNumber: true,
          })}
          title="DOTACJA PC PRÓG 1"
          defaultValue={dynamicPropValues!.dotacje.pc.prog1}
        />
        <ChangeDataInputComponent
          {...register("dotacje.pc.prog2", {
            valueAsNumber: true,
          })}
          title="DOTACJA PC PRÓG 2"
          defaultValue={dynamicPropValues!.dotacje.pc.prog2}
        />
        <ChangeDataInputComponent
          {...register("dotacje.pc.prog3", {
            valueAsNumber: true,
          })}
          title="DOTACJA PC PRÓG 3"
          defaultValue={dynamicPropValues!.dotacje.pc.prog3}
        />
        <ChangeDataInputComponent
          {...register("dotacje.pc.mojPrad", {
            valueAsNumber: true,
          })}
          title="DOTACJA PC MÓJ PRĄD"
          defaultValue={dynamicPropValues!.dotacje.pc.mojPrad}
        />
        <ChangeDataInputComponent
          {...register("oprocentowanie_kredytu", {
            valueAsNumber: true,
          })}
          title="OPROCENTOWANIE KREDYTU"
          defaultValue={dynamicPropValues!.oprocentowanie_kredytu}
        />
        <ChangeDataInputComponent
          {...register("cena1kWh", {
            valueAsNumber: true,
          })}
          title="CENA ZA 1 kWh"
          defaultValue={dynamicPropValues!.cena1kWh}
        />
        <ChangeDataInputComponent
          {...register("cop", {
            valueAsNumber: true,
          })}
          title="WSPÓŁCZYNNIK COP"
          defaultValue={dynamicPropValues!.cop}
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
        description=" Będzie to skutkowało zmianami w bazie danych, przez co ceny nowych
        wyliczeń za instalację ulegną zmianie."
      />
    </>
  );
};

const addonNamesMappings: { [key: string]: string } = {
  kolejna_kaskada: "KOLEJNA POMPA CIEPŁA W KASKADZIE",
  posadowienie_rozsaczanie: "POSADOWIENIE Z ROZSĄCZANIEM",
  przewierty: "DODATKOWE PRZEWIERTY",
  poprowadzenie_instalacji_wierzchu:
    "INSTALACJA OD PC DO BUDYNKU W IZOLACJI Z WEŁNY MINERALNEJ",
  rura_preizolowana: "RURA PREIZOLOWANA",
  dodatkowe_rury_preizolowane: "KAŻDY NASTĘPNY MB RURY PREIZOLOWANEJ",
  cyrkulacja_cwu: "MONTAŻ CYRKULACJI DO CWU",
  demontaz_kotla: "DEMONTAŻ STAREGO KOTŁA",
  posprzatanie: "POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMNTÓW MASZYNOWNI",
  przeniesienie_zasobnika: "PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA",
  wykonanie_przylacza: "WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC",
  spiecie_bufora: "SPIĘCIE BUFOR CO Z DODATKOOWYM ŹRÓDŁEM GRZEWCZYM",
  zamkniecie_ukladu_otwartego: "ZAMKNIĘCIE UKŁADU OTWARTEGO",
};
