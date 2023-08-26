import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { Modal, TextInput } from "@mantine/core";
import { type JsonFileData } from "../kalkulator/fotowoltaika";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";

interface FormTypes {
  dane?: {
    dwa?: number;
    cztery?: number;
    szesc?: number;
    osiem?: number;
    dwanascie?: number;
    dwadziescia?: number;
    trzydziesci?: number;
    piecdziesiat?: number;
  };
  dotacje?: {
    magazynCiepla?: number;
    menagerEnergii?: number;
    mojPrad?: number;
    mp_mc?: number;
  };
  koszty_dodatkowe?: {
    bloczki?: number;
    tigo?: number;
    ekierki?: number;
    grunt?: number;
    inwerterHybrydowy?: number;
    solarEdge?: number;
  };
  magazynCiepla?: number;
  tarczaSolidarnosciowa?: string[];
  prowizjaBiura?: number;
}

const DaneFotowoltaiki = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [opened, { open, close }] = useDisclosure(false);

  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();

  const { mutate } = api.dataFlow.editJSONFile.useMutation();
  const { register, handleSubmit, watch } = useForm<FormTypes>(
    data?.kalkulator.dotacje && {
      defaultValues: {
        dane: {
          dwa: data?.kalkulator.dane.dwa,
          cztery: data?.kalkulator.dane.cztery,
          szesc: data?.kalkulator.dane.szesc,
          osiem: data?.kalkulator.dane.osiem,
          dwanascie: data?.kalkulator.dane.dwanascie,
          dwadziescia: data?.kalkulator.dane.dwadziescia,
          trzydziesci: data?.kalkulator.dane.trzydziesci,
          piecdziesiat: data?.kalkulator.dane.piecdziesiat,
        },
        dotacje: {
          magazynCiepla: data?.kalkulator.dotacje.magazynCiepla,
          menagerEnergii: data?.kalkulator.dotacje.menagerEnergii,
          mojPrad: data?.kalkulator.dotacje.mojPrad,
          mp_mc: data?.kalkulator.dotacje.mp_mc,
        },
        koszty_dodatkowe: {
          bloczki: data?.kalkulator.koszty_dodatkowe.bloczki,
          ekierki: data?.kalkulator.koszty_dodatkowe.ekierki,
          grunt: data?.kalkulator.koszty_dodatkowe.grunt,
          inwerterHybrydowy:
            data?.kalkulator.koszty_dodatkowe.inwerterHybrydowy,
          solarEdge: data?.kalkulator.koszty_dodatkowe.solarEdge,
          tigo: data?.kalkulator.koszty_dodatkowe.tigo,
        },
        magazynCiepla: data?.kalkulator.magazynCiepla,
        prowizjaBiura: data?.kalkulator.prowizjaBiura,
        tarczaSolidarnosciowa: data?.kalkulator.tarczaSolidarnosciowa,
      },
    }
  );

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    console.log(watch("dane"));
    //   if (data) {
    //   // data.kalkulator.dane.dwa =
    //   mutate(data);
    // }
  };

  // const handleIsDataAndValue = () => {
  //   if (data) {
  //     // data.kalkulator.dane.dwa =
  //     mutate(data);
  //   }
  // };

  useEffect(() => {
    if ((sessionData && sessionData?.user.role !== 1) || sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />

      <div className="flex max-h-screen w-full flex-wrap justify-center">
        <Navbar />
        <div className="flex max-h-[80%] w-full max-w-3xl justify-center overflow-y-scroll">
          <form>
            <h2 className="mt-5 w-full text-center text-2xl">DANE</h2>
            <ChangeDataInputComponent
              {...register("dane.dwa")}
              title="OD 0 DO 2"
              defaultValue={data?.kalkulator.dane.dwa}
            />
            <ChangeDataInputComponent
              {...register("dane.cztery")}
              title="OD 2.1 DO 4"
              defaultValue={data?.kalkulator.dane.cztery}
            />
            <ChangeDataInputComponent
              {...register("dane.szesc")}
              title="OD 4.1 DO 6"
              defaultValue={data?.kalkulator.dane.szesc}
            />
            <ChangeDataInputComponent
              {...register("dane.osiem")}
              title="OD 6.1 DO 8"
              defaultValue={data?.kalkulator.dane.osiem}
            />
            <ChangeDataInputComponent
              {...register("dane.dwanascie")}
              title="OD 8.1 DO 12"
              defaultValue={data?.kalkulator.dane.dwanascie}
            />
            <ChangeDataInputComponent
              {...register("dane.dwadziescia")}
              title="OD 12.1 DO 20"
              defaultValue={data?.kalkulator.dane.dwadziescia}
            />
            <ChangeDataInputComponent
              {...register("dane.trzydziesci")}
              title="OD 20.1 DO 30"
              defaultValue={data?.kalkulator.dane.trzydziesci}
            />
            <ChangeDataInputComponent
              {...register("dane.piecdziesiat")}
              title="OD 30.1 DO 50"
              defaultValue={data?.kalkulator.dane.piecdziesiat}
            />
            <h2 className="mt-10 w-full text-center text-2xl">DOTACJE</h2>
            <ChangeDataInputComponent
              {...register("dotacje.magazynCiepla")}
              title="MAGAZYN CIEPŁA"
              defaultValue={data?.kalkulator.dotacje.magazynCiepla}
            />
            <ChangeDataInputComponent
              {...register("dotacje.menagerEnergii")}
              title="MENAGER ENERGII"
              defaultValue={data?.kalkulator.dotacje.menagerEnergii}
            />
            <ChangeDataInputComponent
              {...register("dotacje.mojPrad")}
              title="MÓJ PRĄD"
              defaultValue={data?.kalkulator.dotacje.mojPrad}
            />
            <ChangeDataInputComponent
              {...register("dotacje.mp_mc")}
              title="MÓJ PRĄD + MAGAZYN CIEPŁA"
              defaultValue={data?.kalkulator.dotacje.mp_mc}
            />
            <h2 className="mt-10 w-full text-center text-2xl">
              KOSZTY DODATKOWE
            </h2>
            <ChangeDataInputComponent
              {...register("koszty_dodatkowe.bloczki")}
              title="BLOCZKI"
              defaultValue={data?.kalkulator.koszty_dodatkowe.bloczki}
            />
            <ChangeDataInputComponent
              {...register("koszty_dodatkowe.tigo")}
              title="TIGO"
              defaultValue={data?.kalkulator.koszty_dodatkowe.tigo}
            />
            <ChangeDataInputComponent
              {...register("koszty_dodatkowe.ekierki")}
              title="EKIERKI"
              defaultValue={data?.kalkulator.koszty_dodatkowe.ekierki}
            />
            <ChangeDataInputComponent
              {...register("koszty_dodatkowe.grunt")}
              title="GRUNT"
              defaultValue={data?.kalkulator.koszty_dodatkowe.grunt}
            />
            <ChangeDataInputComponent
              {...register("koszty_dodatkowe.inwerterHybrydowy")}
              title="INWERTER HYBRYDOWY"
              defaultValue={data?.kalkulator.koszty_dodatkowe.inwerterHybrydowy}
            />
            <ChangeDataInputComponent
              {...register("koszty_dodatkowe.solarEdge")}
              title="SOLAR EDGE"
              defaultValue={data?.kalkulator.koszty_dodatkowe.solarEdge}
            />
            <h2 className="mt-10 w-full text-center text-2xl">
              TARCZA SOLIDARNOŚCIOWA
            </h2>
            <ChangeDataInputComponent
              {...register("tarczaSolidarnosciowa")}
              title="TARCZA SOLIDARNOŚCIOWA"
              defaultValue={data?.kalkulator.tarczaSolidarnosciowa}
            />
            <h2 className="mt-10 w-full text-center text-2xl">POZOSTAŁE</h2>
            <ChangeDataInputComponent
              {...register("magazynCiepla")}
              title="MAGAZYN CIEPŁA - CENA"
              defaultValue={data?.kalkulator.magazynCiepla}
            />
            <ChangeDataInputComponent
              {...register("prowizjaBiura")}
              title="PROWIZJA BIURA"
              defaultValue={data?.kalkulator.prowizjaBiura}
            />
          </form>
          <button
            onClick={open}
            className="fixed bottom-20 right-56 mx-5 h-12 self-center rounded-xl bg-dark px-10 py-2 font-semibold text-white duration-300 hover:bg-brand hover:text-dark"
          >
            Zatwierdź
          </button>
        </div>
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
      </div>
    </div>
  );
};
interface ChangeDataInputComponentType {
  title: string;
  defaultValue: number | string[] | undefined;
}
const ChangeDataInputComponent = React.forwardRef<
  HTMLInputElement,
  ChangeDataInputComponentType
>(({ title, defaultValue, ...props }: ChangeDataInputComponentType, ref) => {
  if (Array.isArray(defaultValue)) {
    return (
      <div className="grid grid-cols-2 items-end justify-center gap-5">
        <h2 className="text-end">{title}</h2>
        {defaultValue.map((value, index) => {
          return (
            <TextInput
              key={index}
              {...props}
              label={`Wpisz nową wartość ${value}`}
              defaultValue={Number(value)}
              className="max-w-[150px]"
              ref={ref}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 items-end justify-center gap-5">
      <h2 className="text-end">{title}</h2>
      <TextInput
        {...props}
        label={"Wpisz nową wartość"}
        defaultValue={defaultValue}
        className="max-w-[150px]"
        ref={ref}
      />
    </div>
  );
});
ChangeDataInputComponent.displayName = "ChangeDataInputComponent";
export default DaneFotowoltaiki;
