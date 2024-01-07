import { Loader, Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ChangeDataInputComponent, Navbar, SideBar } from "~/components";
import {
  type EachMenagerHeatHome,
  type HeatHomeDataCalculationType,
} from "~/server/api/routers/heatHome/interfaces";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface EditionFormType {
  [key: string]: EachMenagerHeatHome;
}

const DaneCieploWlasciwe = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data: entireJsonData } =
    api.heatHomeDataFlowRouter.downloadEntireJsonFile.useQuery();
  useEffect(() => {
    if ((sessionData && sessionData?.user.role !== 1) || sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-[#E8E7E7] font-orkney">
      <Toaster />
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap">
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

            <div className="flex min-h-[85vh] w-full justify-center">
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

  const { mutate } = api.heatHomeDataFlowRouter.editJSONFile.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: () => {
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  const dynamicName = Object.keys(data!)[0];
  const dynamicPropValues = data![dynamicName!];
  const { register, handleSubmit } = useForm<HeatHomeDataCalculationType>();
  dynamicPropValues && {
    ocieplenia: dynamicPropValues.ocieplenia,
    m2_ocieplenia: dynamicPropValues.m2_ocieplenia,
    parapety: dynamicPropValues.parapety,
    tynk: dynamicPropValues.tynk,
    wykonczenie: dynamicPropValues.wykonczenie,
  };

  const onSubmit: SubmitHandler<HeatHomeDataCalculationType> = (data) => {
    mutate({ [dynamicName!]: data });
    close();
  };

  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicName}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">CIEPŁO WŁAŚCIWE</h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues).map(
            (value: [string, number], index) => {
              return (
                <ChangeDataInputComponent
                  {...register(
                    `${value[0]}` as keyof typeof dynamicPropValues,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  title={jsonKeyNamesMapping[value[0] || value[0]]!}
                  defaultValue={value[1]}
                  key={index}
                />
              );
            }
          )}
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
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const jsonKeyNamesMapping: { [key: string]: string } = {
  ocieplenia: "GRUBOŚĆ OCIEPLENIA",
  m2_ocieplenia: "M² OCIEPLENIA",
  parapety: "PARAPETY",
  tynk: "M² TYNK",
  wykonczenie: "M² WYKOŃCZENIE GÓRNE",
};

export default DaneCieploWlasciwe;
