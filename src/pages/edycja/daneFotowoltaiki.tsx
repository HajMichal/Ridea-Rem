import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { TextInput } from "@mantine/core";
import { type JsonFileData } from "../kalkulator/fotowoltaika";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";

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

  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();

  const { mutate } = api.dataFlow.editJSONFile.useMutation();
  const { register, handleSubmit, watch } = useForm<FormTypes>({
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
        inwerterHybrydowy: data?.kalkulator.koszty_dodatkowe.inwerterHybrydowy,
        solarEdge: data?.kalkulator.koszty_dodatkowe.solarEdge,
        tigo: data?.kalkulator.koszty_dodatkowe.tigo,
      },
      magazynCiepla: data?.kalkulator.magazynCiepla,
      prowizjaBiura: data?.kalkulator.prowizjaBiura,
      tarczaSolidarnosciowa: data?.kalkulator.tarczaSolidarnosciowa,
    },
  });
  console.log(watch("dane.dwa"));

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    console.log(data);
  };

  // const handleIsDataAndValue = () => {
  //   if (data && inptValue) {
  //     data.kalkulator.dane.dwa = inptValue;
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
    <div className="flex h-full min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />

      <div className="w-full">
        <Navbar />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mt-5 w-full text-center text-2xl">DANE</h2>
          <ChangeDataInputComponent
            {...register("dane.dwa")}
            title="OD 0 DO 2"
            defaultValue={data!.kalkulator.dane.dwa}
          />
          <ChangeDataInputComponent
            {...register("dane.cztery")}
            title="OD 2.1 DO 4"
            defaultValue={data!.kalkulator.dane.cztery}
          />
          <ChangeDataInputComponent
            {...register("dane.szesc")}
            title="OD 4.1 DO 6"
            defaultValue={data!.kalkulator.dane.szesc}
          />
          <ChangeDataInputComponent
            {...register("dane.osiem")}
            title="OD 6.1 DO 8"
            defaultValue={data!.kalkulator.dane.osiem}
          />
          <ChangeDataInputComponent
            {...register("dane.dwanascie")}
            title="OD 8.1 DO 12"
            defaultValue={data!.kalkulator.dane.dwanascie}
          />
          <ChangeDataInputComponent
            {...register("dane.dwadziescia")}
            title="OD 12.1 DO 20"
            defaultValue={data!.kalkulator.dane.dwadziescia}
          />
          <ChangeDataInputComponent
            {...register("dane.trzydziesci")}
            title="OD 20.1 DO 30"
            defaultValue={data!.kalkulator.dane.trzydziesci}
          />
          <ChangeDataInputComponent
            {...register("dane.piecdziesiat")}
            title="OD 30.1 DO 50"
            defaultValue={data!.kalkulator.dane.piecdziesiat}
          />
          <h2 className="mt-10 w-full text-center text-2xl">DOTACJE</h2>
          <ChangeDataInputComponent
            {...register("dane.piecdziesiat")}
            title="OD 30.1 DO 50"
            defaultValue={data!.kalkulator.dane.piecdziesiat}
          />
          <button
            // onClick={handleIsDataAndValue}
            className="rounded-xl bg-green-500 px-5 py-2 font-semibold"
          >
            Zatwierdź
          </button>
        </form>
      </div>
    </div>
  );
};
interface ChangeDataInputComponentType {
  title: string;
  defaultValue: number | undefined;
}
const ChangeDataInputComponent = React.forwardRef<
  HTMLInputElement,
  ChangeDataInputComponentType
>(({ title, defaultValue, ...props }: ChangeDataInputComponentType, ref) => {
  return (
    <div className="flex items-end justify-center gap-5">
      <h2>{title}</h2>
      <TextInput
        {...props}
        label={"Wpisz nową wartość"}
        defaultValue={defaultValue}
        ref={ref}
      />
    </div>
  );
});
ChangeDataInputComponent.displayName = "ChangeDataInputComponent";
export default DaneFotowoltaiki;
