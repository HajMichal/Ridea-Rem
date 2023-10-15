import { Loader, Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { ChangeDataInputComponent, Navbar, SideBar } from "~/components";
import {
  type EachMenagerHeatPump,
  type HeatPumpDataToCalculationType,
} from "~/server/api/routers/heatpump/interfaces";
import { api } from "~/utils/api";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionFormType {
  [key: string]: EachMenagerHeatPump;
}

const DanePompyCiepla = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: entireJsonData } =
    api.heatPumpDataFlowRouter.downloadEntireJsonFile.useQuery();
  useEffect(() => {
    if ((sessionData && sessionData?.user.role !== 1) || sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <Toaster />
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap ">
        <Navbar />
        <div className="max-h-[88%] w-full overflow-y-scroll">
          <Tabs
            color="gray"
            // orientation="vertical"
            defaultValue="Adrian Szymborski"
          >
            <Tabs.List className="fixed z-50 w-full bg-backgroundGray">
              {entireJsonData?.kalkulator.map((eachUserRate, index) => {
                const dynamicKey = Object.keys(eachUserRate)[0];
                return (
                  <Tabs.Tab value={dynamicKey!} key={index}>
                    {dynamicKey}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>

            <div className="flex w-full justify-center ">
              {entireJsonData ? (
                entireJsonData.kalkulator.map((eachUserData, index) => {
                  const dynamicKey = Object.keys(eachUserData)[0];
                  return (
                    <Tabs.Panel value={dynamicKey!} key={index}>
                      <EditionForm data={eachUserData} />
                    </Tabs.Panel>
                  );
                })
              ) : (
                <Loader
                  color="yellow"
                  size="lg"
                  variant="dots"
                  className=" absolute top-40"
                />
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const EditionForm = ({ data }: EditionFormType) => {
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
  dynamicPropValues && {
    bufory: {
      bufory100l: {
        przylaczeSchemat17:
          dynamicPropValues.bufory.bufory100l.przylaczeSchemat17,
        przylaczeSchemat24:
          dynamicPropValues.bufory.bufory100l.przylaczeSchemat24,
        przylaczeSchemat34:
          dynamicPropValues.bufory.bufory100l.przylaczeSchemat34,
      },
      bufory300l: {
        przylaczeSchemat17:
          dynamicPropValues.bufory.bufory300l.przylaczeSchemat17,
        przylaczeSchemat24:
          dynamicPropValues.bufory.bufory300l.przylaczeSchemat24,
        przylaczeSchemat34:
          dynamicPropValues.bufory.bufory300l.przylaczeSchemat34,
      },
      bufory500l: {
        przylaczeSchemat17:
          dynamicPropValues.bufory.bufory500l.przylaczeSchemat17,
        przylaczeSchemat24:
          dynamicPropValues.bufory.bufory500l.przylaczeSchemat24,
        przylaczeSchemat34:
          dynamicPropValues.bufory.bufory500l.przylaczeSchemat34,
      },
    },
    pompy_ciepla: {
      "Z-PRO53/4MitsubishiInv11-16": {
        cena: dynamicPropValues.pompy_ciepla["Z-PRO53/4MitsubishiInv11-16"]!
          .cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["Z-PRO53/4MitsubishiInv11-16"]!
            .mnozik_prowizji,
      },
      "Z-PRO53/4MitsubishiIHO11-16": {
        cena: dynamicPropValues.pompy_ciepla["Z-PRO53/4MitsubishiIHO11-16"]!
          .cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["Z-PRO53/4MitsubishiIHO11-16"]!
            .mnozik_prowizji,
      },
      "SAT63DanfossInv14-23": {
        cena: dynamicPropValues.pompy_ciepla["SAT63DanfossInv14-23"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SAT63DanfossInv14-23"]!
            .mnozik_prowizji,
      },
      "SAT63DanfossIHO14-24": {
        cena: dynamicPropValues.pompy_ciepla["SAT63DanfossIHO14-24"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SAT63DanfossIHO14-24"]!
            .mnozik_prowizji,
      },

      "SATELI82P19i17-29": {
        cena: dynamicPropValues.pompy_ciepla["SATELI82P19i17-29"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI82P19i17-29"]!.mnozik_prowizji,
      },
      "SATELI83P23i20-32": {
        cena: dynamicPropValues.pompy_ciepla["SATELI83P23i20-32"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI83P23i20-32"]!.mnozik_prowizji,
      },
      "SATELI83P26i23-34": {
        cena: dynamicPropValues.pompy_ciepla["SATELI83P26i23-34"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI83P26i23-34"]!.mnozik_prowizji,
      },
      "SATELI83P30i25-37": {
        cena: dynamicPropValues.pompy_ciepla["SATELI83P30i25-37"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI83P30i25-37"]!.mnozik_prowizji,
      },

      "SATELI82P19iHO25-35": {
        cena: dynamicPropValues.pompy_ciepla["SATELI82P19iHO25-35"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI82P19iHO25-35"]!
            .mnozik_prowizji,
      },
      "SATELI83P23iHO30-41": {
        cena: dynamicPropValues.pompy_ciepla["SATELI83P23iHO30-41"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI83P23iHO30-41"]!
            .mnozik_prowizji,
      },
      "SATELI83P26iHO35-45": {
        cena: dynamicPropValues.pompy_ciepla["SATELI83P26iHO35-45"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI83P26iHO35-45"]!
            .mnozik_prowizji,
      },
      "SATELI83P30iHO37-48": {
        cena: dynamicPropValues.pompy_ciepla["SATELI83P30iHO37-48"]!.cena,
        mnozik_prowizji:
          dynamicPropValues.pompy_ciepla["SATELI83P30iHO37-48"]!
            .mnozik_prowizji,
      },
    },
    dodatki: {
      kolejna_kaskada: dynamicPropValues.dodatki.kolejna_kaskada,
      posadowienie_rozsaczanie:
        dynamicPropValues.dodatki.posadowienie_rozsaczanie,
      przewierty: dynamicPropValues.dodatki.przewierty,
      poprowadzenie_instalacji_wierzchu:
        dynamicPropValues.dodatki.poprowadzenie_instalacji_wierzchu,
      rura_preizolowana: dynamicPropValues.dodatki.rura_preizolowana,
      dodatkowe_rury_preizolowane:
        dynamicPropValues.dodatki.dodatkowe_rury_preizolowane,
      cyrkulacja_cwu: dynamicPropValues.dodatki.cyrkulacja_cwu,
      demontaz_kotla: dynamicPropValues.dodatki.demontaz_kotla,
      posprzatanie: dynamicPropValues.dodatki.posprzatanie,
      przeniesienie_zasobnika:
        dynamicPropValues.dodatki.przeniesienie_zasobnika,
      wykonanie_przylacza: dynamicPropValues.dodatki.wykonanie_przylacza,
      spiecie_bufora: dynamicPropValues.dodatki.spiecie_bufora,
      zamkniecie_ukladu_otwartego:
        dynamicPropValues.dodatki.zamkniecie_ukladu_otwartego,
    },
    dotacje: {
      modernizacja_CO_CWU: {
        prog1: dynamicPropValues.dotacje.modernizacja_CO_CWU.prog1,
        prog2: dynamicPropValues.dotacje.modernizacja_CO_CWU.prog2,
        prog3: dynamicPropValues.dotacje.modernizacja_CO_CWU.prog3,
      },
      pc: {
        prog1: dynamicPropValues.dotacje.pc.prog1,
        prog2: dynamicPropValues.dotacje.pc.prog2,
        prog3: dynamicPropValues.dotacje.pc.prog3,
      },
    },
    oprocentowanie_kredytu: dynamicPropValues.oprocentowanie_kredytu,
  };
  const onSubmit: SubmitHandler<HeatPumpDataToCalculationType> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };

  const jsxAddonsElements = [];
  for (const addonName in dynamicPropValues?.dodatki) {
    if (dynamicPropValues.dodatki.hasOwnProperty(addonName)) {
      const registerAddonKey =
        `dodatki.${addonName}` as keyof typeof dynamicPropValues;
      const addonPrice =
        dynamicPropValues.dodatki[
          addonName as keyof typeof dynamicPropValues.dodatki
        ];
      const nameMappings: { [key: string]: string } = {
        kolejna_kaskada: "KOLEJNA POMPA CIEPŁA W KASKADZIE",
        posadowienie_rozsaczanie: "POSADOWIENIE Z ROZSĄCZANIEM",
        przewierty: "DODATKOWE PRZEWIERTY",
        poprowadzenie_instalacji_wierzchu:
          "POPROWADZENIE INSTALACJI OD PC DO BUDYNKU PO WIERZCHU W IZOLACJI Z WEŁNY MINERALNEJ",
        rura_preizolowana: "RURA PREIZOLOWANA",
        dodatkowe_rury_preizolowane: "KAŻDY NASTĘPNY MB RURY PREIZOLOWANEJ",
        cyrkulacja_cwu: "MONTAŻ CYRKULACJI DO CWU",
        demontaz_kotla: "DEMONTAŻ STAREGO KOTŁA",
        posprzatanie:
          "PRZYGOTOWANIE POPRZEZ POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMNTÓW MASZYNOWNI",
        przeniesienie_zasobnika:
          "PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA",
        wykonanie_przylacza:
          "WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC",
        spiecie_bufora: "SPIĘCIE BUFOR CO Z DODATKOOWYM ŹRÓDŁEM GRZEWCZYM",
        zamkniecie_ukladu_otwartego: "ZAMKNIĘCIE UKŁADU OTWARTEGO",
      };
      const title = nameMappings[addonName]!;
      jsxAddonsElements.push(
        <ChangeDataInputComponent
          {...register(registerAddonKey, {
            valueAsNumber: true,
          })}
          title={title}
          defaultValue={addonPrice}
        />
      );
    }
  }
  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicKey}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">POMPY CIEPŁA</h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues.pompy_ciepla).map((key, index) => {
            const nameMappings: { [key: string]: string } = {
              "Z-PRO53/4MitsubishiInv11-16": "Z-PRO.5.3/4.Mitsubishi.Inv.11-16",
              "Z-PRO53/4MitsubishiIHO11-16": "Z-PRO.5.3/4.Mitsubishi.IHO.11-16",
              "SAT63DanfossInv14-23": "SAT.6.3.Danfoss.Inv.14-23",
              "SAT63DanfossIHO14-24": "SAT.6.3.Danfoss.IHO.14-24",
              "SATELI82P19i17-29": "SAT.ELI.8.2.P19i.17-29",
              "SATELI83P23i20-32": "SAT.ELI.8.3.P23i.20-32",
              "SATELI83P26i23-34": "SAT.ELI.8.3.P26i.23-34",
              "SATELI83P30i25-37": "SAT.ELI.8.3.P30i.25-37",
              "SATELI82P19iHO25-35": "SAT.ELI.8.2.P19iHO.25-35",
              "SATELI83P23iHO30-41": "SAT.ELI.8.3.P23iHO.30-41",
              "SATELI83P26iHO35-45": "SAT.ELI.8.3.P26iHO.35-45",
              "SATELI83P30iHO37-48": "SAT.ELI.8.3.P30iHO.37-48",
            };
            return (
              <div className="my-7" key={index}>
                <ChangeDataInputComponent
                  {...register(
                    `pompy_ciepla.${key[0]}.cena` as keyof typeof dynamicPropValues,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  title={nameMappings[key[0]] || key[0]}
                  defaultValue={key[1].cena}
                />
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
        <h2 className="mt-5 w-full text-center text-3xl">DODATKI</h2>
        {jsxAddonsElements.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
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

export default DanePompyCiepla;
