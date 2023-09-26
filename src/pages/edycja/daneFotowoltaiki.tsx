import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { Loader, Modal, Tabs, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import { Toaster, toast } from "react-hot-toast";

interface FormTypes {
  cena_skupu_pradu: number;
  magazynCiepla: number;
  prowizjaBiura: number;
  dane: {
    dwa: number;
    cztery: number;
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
  dotacje: {
    magazynCiepla: number;
    menagerEnergii: number;
    mojPrad: number;
    mp_mc: number;
  };
  koszty_dodatkowe: {
    bloczki: number;
    tigo: number;
    ekierki: number;
    grunt: number;
    inwerterHybrydowy: number;
    solarEdge: number;
  };
  zbiorniki: {
    zbiornik_100L: number;
    zbiornik_140L: number;
    zbiornik_200L: number;
    zbiornik_200L_z_wezem: number;
  };
}
/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionForm {
  [key: string]: { [key: string]: FormTypes };
}

const EditionForm = ({ data }: EditionForm) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate } = api.dataFlow.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  const dynamicKey = Object.keys(data!)[0];
  const dynamicPropValues = data![dynamicKey!];

  const { register, handleSubmit } = useForm<FormTypes>();
  dynamicPropValues && {
    defaultValues: {
      cena_skupu_pradu: dynamicPropValues.cena_skupu_pradu,
      dane: {
        dwa: dynamicPropValues.dane.dwa,
        cztery: dynamicPropValues.dane.cztery,
        szesc: dynamicPropValues.dane.szesc,
        osiem: dynamicPropValues.dane.osiem,
        dwanascie: dynamicPropValues.dane.dwanascie,
        dwadziescia: dynamicPropValues.dane.dwadziescia,
        trzydziesci: dynamicPropValues.dane.trzydziesci,
        piecdziesiat: dynamicPropValues.dane.piecdziesiat,
      },
      dotacje: {
        magazynCiepla: dynamicPropValues.dotacje.magazynCiepla,
        menagerEnergii: dynamicPropValues.dotacje.menagerEnergii,
        mojPrad: dynamicPropValues.dotacje.mojPrad,
        mp_mc: dynamicPropValues.dotacje.mp_mc,
      },
      koszty_dodatkowe: {
        bloczki: dynamicPropValues.koszty_dodatkowe.bloczki,
        ekierki: dynamicPropValues.koszty_dodatkowe.ekierki,
        grunt: dynamicPropValues.koszty_dodatkowe.grunt,
        inwerterHybrydowy: dynamicPropValues.koszty_dodatkowe.inwerterHybrydowy,
        solarEdge: dynamicPropValues.koszty_dodatkowe.solarEdge,
        tigo: dynamicPropValues.koszty_dodatkowe.tigo,
      },
      zbiorniki: {
        zbiornik_100L: dynamicPropValues.zbiorniki.zbiornik_100L,
        zbiornik_140L: dynamicPropValues.zbiorniki.zbiornik_140L,
        zbiornik_200L: dynamicPropValues.zbiorniki.zbiornik_200L,
        zbiornik_200L_z_wezem:
          dynamicPropValues.zbiorniki.zbiornik_200L_z_wezem,
      },
      magazynCiepla: dynamicPropValues.magazynCiepla,
      prowizjaBiura: dynamicPropValues.prowizjaBiura,
    },
  };
  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };
  return (
    <>
      <form className="w-full pb-20 pt-10">
        <h2 className="mt-5 w-full text-center text-2xl">DANE {dynamicKey}</h2>

        <ChangeDataInputComponent
          {...register("dane.dwa", {
            valueAsNumber: true,
          })}
          title="OD 0 DO 2"
          defaultValue={dynamicPropValues!.dane.dwa}
        />

        <ChangeDataInputComponent
          {...register("dane.cztery", {
            valueAsNumber: true,
          })}
          title="OD 2.1 DO 4"
          defaultValue={dynamicPropValues!.dane.cztery}
        />
        <ChangeDataInputComponent
          {...register("dane.szesc", {
            valueAsNumber: true,
          })}
          title="OD 4.1 DO 6"
          defaultValue={dynamicPropValues!.dane.szesc}
        />
        <ChangeDataInputComponent
          {...register("dane.osiem", {
            valueAsNumber: true,
          })}
          title="OD 6.1 DO 8"
          defaultValue={dynamicPropValues!.dane.osiem}
        />
        <ChangeDataInputComponent
          {...register("dane.dwanascie", {
            valueAsNumber: true,
          })}
          title="OD 8.1 DO 12"
          defaultValue={dynamicPropValues!.dane.dwanascie}
        />
        <ChangeDataInputComponent
          {...register("dane.dwadziescia", {
            valueAsNumber: true,
          })}
          title="OD 12.1 DO 20"
          defaultValue={dynamicPropValues!.dane.dwadziescia}
        />
        <ChangeDataInputComponent
          {...register("dane.trzydziesci", {
            valueAsNumber: true,
          })}
          title="OD 20.1 DO 30"
          defaultValue={dynamicPropValues!.dane.trzydziesci}
        />
        <ChangeDataInputComponent
          {...register("dane.piecdziesiat", {
            valueAsNumber: true,
          })}
          title="OD 30.1 DO 50"
          defaultValue={dynamicPropValues!.dane.piecdziesiat}
        />
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
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.inwerterHybrydowy", {
            valueAsNumber: true,
          })}
          title="INWERTER HYBRYDOWY"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.inwerterHybrydowy}
        />
        <ChangeDataInputComponent
          {...register("koszty_dodatkowe.solarEdge", {
            valueAsNumber: true,
          })}
          title="SOLAR EDGE"
          defaultValue={dynamicPropValues!.koszty_dodatkowe.solarEdge}
        />
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
          title="Cena Skupu Prądu"
          defaultValue={dynamicPropValues!.cena_skupu_pradu}
        />
        <ChangeDataInputComponent
          {...register("prowizjaBiura", {
            valueAsNumber: true,
          })}
          title="PROWIZJA BIURA"
          defaultValue={dynamicPropValues!.prowizjaBiura}
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

const DaneFotowoltaiki = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: entireJsonData } = api.dataFlow.getEntireJsonFile.useQuery();

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
            defaultValue="Admin Konto"
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
interface ChangeDataInputComponentType {
  title: string;
  defaultValue: number;
}
const ChangeDataInputComponent = React.forwardRef<
  HTMLInputElement,
  ChangeDataInputComponentType
>(({ title, defaultValue, ...props }: ChangeDataInputComponentType, ref) => {
  return (
    <div className="grid grid-cols-2 items-end justify-center gap-5">
      <h2 className="text-end">{title}</h2>
      {defaultValue && (
        <TextInput
          {...props}
          label={"Wpisz nową wartość"}
          defaultValue={defaultValue}
          className="max-w-[150px]"
          ref={ref}
        />
      )}
    </div>
  );
});
ChangeDataInputComponent.displayName = "ChangeDataInputComponent";
export default DaneFotowoltaiki;
