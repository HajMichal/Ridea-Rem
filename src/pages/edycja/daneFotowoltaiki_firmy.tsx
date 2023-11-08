import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { Loader, Modal, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import { Toaster, toast } from "react-hot-toast";
import { ChangeDataInputComponent } from "~/components";
import { type ForCompanyDataToCalcualtionType } from "~/server/api/routers/forCompany/interfaces";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionForm {
  [key: string]: { [key: string]: ForCompanyDataToCalcualtionType };
}

const EditionForm = ({ data }: EditionForm) => {
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
  dynamicPropValues && {
    defaultValues: {
      cena_skupu_pradu: dynamicPropValues.cena_skupu_pradu,
      dane: {
        czterysta: {
          dwa: dynamicPropValues.dane.czterysta.dwa,
          cztery: dynamicPropValues.dane.czterysta.cztery,
          szesc: dynamicPropValues.dane.czterysta.szesc,
          osiem: dynamicPropValues.dane.czterysta.osiem,
          dwanascie: dynamicPropValues.dane.czterysta.dwanascie,
          dwadziescia: dynamicPropValues.dane.czterysta.dwadziescia,
          trzydziesci: dynamicPropValues.dane.czterysta.trzydziesci,
          piecdziesiat: dynamicPropValues.dane.czterysta.piecdziesiat,
        },
        czterysta_piecdziesiat: {
          dwa: dynamicPropValues.dane.czterysta_piecdziesiat.dwa,
          cztery: dynamicPropValues.dane.czterysta_piecdziesiat.cztery,
          szesc: dynamicPropValues.dane.czterysta_piecdziesiat.szesc,
          osiem: dynamicPropValues.dane.czterysta_piecdziesiat.osiem,
          dwanascie: dynamicPropValues.dane.czterysta_piecdziesiat.dwanascie,
          dwadziescia:
            dynamicPropValues.dane.czterysta_piecdziesiat.dwadziescia,
          trzydziesci:
            dynamicPropValues.dane.czterysta_piecdziesiat.trzydziesci,
          piecdziesiat:
            dynamicPropValues.dane.czterysta_piecdziesiat.piecdziesiat,
        },
        piecset: {
          dwa: dynamicPropValues.dane.piecset.dwa,
          cztery: dynamicPropValues.dane.piecset.cztery,
          szesc: dynamicPropValues.dane.piecset.szesc,
          osiem: dynamicPropValues.dane.piecset.osiem,
          dwanascie: dynamicPropValues.dane.piecset.dwanascie,
          dwadziescia: dynamicPropValues.dane.piecset.dwadziescia,
          trzydziesci: dynamicPropValues.dane.piecset.trzydziesci,
          piecdziesiat: dynamicPropValues.dane.piecset.piecdziesiat,
        },
      },
      koszty_dodatkowe: {
        bloczki: dynamicPropValues.koszty_dodatkowe.bloczki,
        ekierki: dynamicPropValues.koszty_dodatkowe.ekierki,
        grunt: dynamicPropValues.koszty_dodatkowe.grunt,
        tigo: dynamicPropValues.koszty_dodatkowe.tigo,
      },
      oprocentowanie_kredytu: dynamicPropValues.oprocentowanie_kredytu,
      prowizjaBiura: dynamicPropValues.prowizjaBiura,
    },
  };
  const onSubmit: SubmitHandler<ForCompanyDataToCalcualtionType> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };

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
            <ChangeDataInputComponent
              {...register("dane.czterysta.dwa", {
                valueAsNumber: true,
              })}
              title="OD 0 DO 2"
              defaultValue={dynamicPropValues!.dane.czterysta.dwa}
            />

            <ChangeDataInputComponent
              {...register("dane.czterysta.cztery", {
                valueAsNumber: true,
              })}
              title="OD 2.1 DO 4"
              defaultValue={dynamicPropValues!.dane.czterysta.cztery}
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta.szesc", {
                valueAsNumber: true,
              })}
              title="OD 4.1 DO 6"
              defaultValue={dynamicPropValues!.dane.czterysta.szesc}
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta.osiem", {
                valueAsNumber: true,
              })}
              title="OD 6.1 DO 8"
              defaultValue={dynamicPropValues!.dane.czterysta.osiem}
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta.dwanascie", {
                valueAsNumber: true,
              })}
              title="OD 8.1 DO 12"
              defaultValue={dynamicPropValues!.dane.czterysta.dwanascie}
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta.dwadziescia", {
                valueAsNumber: true,
              })}
              title="OD 12.1 DO 20"
              defaultValue={dynamicPropValues!.dane.czterysta.dwadziescia}
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta.trzydziesci", {
                valueAsNumber: true,
              })}
              title="OD 20.1 DO 30"
              defaultValue={dynamicPropValues!.dane.czterysta.trzydziesci}
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta.piecdziesiat", {
                valueAsNumber: true,
              })}
              title="OD 30.1 DO 50"
              defaultValue={dynamicPropValues!.dane.czterysta.piecdziesiat}
            />
          </div>
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 455
            </h2>
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.dwa", {
                valueAsNumber: true,
              })}
              title="OD 0 DO 2"
              defaultValue={dynamicPropValues!.dane.czterysta_piecdziesiat.dwa}
            />

            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.cztery", {
                valueAsNumber: true,
              })}
              title="OD 2.1 DO 4"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.cztery
              }
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.szesc", {
                valueAsNumber: true,
              })}
              title="OD 4.1 DO 6"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.szesc
              }
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.osiem", {
                valueAsNumber: true,
              })}
              title="OD 6.1 DO 8"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.osiem
              }
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.dwanascie", {
                valueAsNumber: true,
              })}
              title="OD 8.1 DO 12"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.dwanascie
              }
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.dwadziescia", {
                valueAsNumber: true,
              })}
              title="OD 12.1 DO 20"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.dwadziescia
              }
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.trzydziesci", {
                valueAsNumber: true,
              })}
              title="OD 20.1 DO 30"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.trzydziesci
              }
            />
            <ChangeDataInputComponent
              {...register("dane.czterysta_piecdziesiat.piecdziesiat", {
                valueAsNumber: true,
              })}
              title="OD 30.1 DO 50"
              defaultValue={
                dynamicPropValues!.dane.czterysta_piecdziesiat.piecdziesiat
              }
            />
          </div>
          <div>
            <h2 className="mb-2 ml-3 mt-5 w-full text-center font-orkneyLight text-2xl">
              PANEL 500
            </h2>
            <ChangeDataInputComponent
              {...register("dane.piecset.dwa", {
                valueAsNumber: true,
              })}
              title="OD 0 DO 2"
              defaultValue={dynamicPropValues!.dane.piecset.dwa}
            />

            <ChangeDataInputComponent
              {...register("dane.piecset.cztery", {
                valueAsNumber: true,
              })}
              title="OD 2.1 DO 4"
              defaultValue={dynamicPropValues!.dane.piecset.cztery}
            />
            <ChangeDataInputComponent
              {...register("dane.piecset.szesc", {
                valueAsNumber: true,
              })}
              title="OD 4.1 DO 6"
              defaultValue={dynamicPropValues!.dane.piecset.szesc}
            />
            <ChangeDataInputComponent
              {...register("dane.piecset.osiem", {
                valueAsNumber: true,
              })}
              title="OD 6.1 DO 8"
              defaultValue={dynamicPropValues!.dane.piecset.osiem}
            />
            <ChangeDataInputComponent
              {...register("dane.piecset.dwanascie", {
                valueAsNumber: true,
              })}
              title="OD 8.1 DO 12"
              defaultValue={dynamicPropValues!.dane.piecset.dwanascie}
            />
            <ChangeDataInputComponent
              {...register("dane.piecset.dwadziescia", {
                valueAsNumber: true,
              })}
              title="OD 12.1 DO 20"
              defaultValue={dynamicPropValues!.dane.piecset.dwadziescia}
            />
            <ChangeDataInputComponent
              {...register("dane.piecset.trzydziesci", {
                valueAsNumber: true,
              })}
              title="OD 20.1 DO 30"
              defaultValue={dynamicPropValues!.dane.piecset.trzydziesci}
            />
            <ChangeDataInputComponent
              {...register("dane.piecset.piecdziesiat", {
                valueAsNumber: true,
              })}
              title="OD 30.1 DO 50"
              defaultValue={dynamicPropValues!.dane.piecset.piecdziesiat}
            />
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

const DaneFotowoltaiki_firm = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: entireJsonData } =
    api.forCompanyDataFlowRouter.getEntireJsonFile.useQuery();

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

export default DaneFotowoltaiki_firm;
