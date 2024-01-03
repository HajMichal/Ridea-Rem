import { Loader, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ChangeDataInputComponent, Navbar, SideBar } from "~/components";
import {
  EachMenagerHeatHome,
  HeatHomeDataCalculationType,
} from "~/server/api/routers/heatHome/interfaces";
import { api } from "~/utils/api";

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

  const { mutate } = api.heatPumpDataFlowRouter.editJSONFile.useMutation({
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
    // mutate({ [dynamicName!]: data });
    close();
  };

  return (
    <>
      <h1 className="w-full pt-14 text-center">{dynamicName}</h1>
      <form className="w-full pb-20 pt-3">
        <h2 className="mt-5 w-full text-center text-3xl">CIEPŁO WŁAŚCIWE</h2>
        {dynamicPropValues &&
          Object.entries(dynamicPropValues).map((value, index) => {
            return (
              <ChangeDataInputComponent
                {...register(`${value}` as keyof typeof dynamicPropValues, {
                  valueAsNumber: true,
                })}
                title={jsonKeyNamesMapping[value[0] || value[0]]!}
                defaultValue={value[1]}
                key={index}
              />
            );
          })}
      </form>
    </>
  );
};

const jsonKeyNamesMapping: { [key: string]: string } = {
  ocieplenia: "GRUBOŚĆ OCIEPLENIA",
  m2_ocieplenia: "M² OCIEPLENIA",
  parapety: "PARAPETY",
  tynk: "M² TYNK",
  wykonczenie: "M² WYKOŃCZENIE GÓRNE",
};

export default DaneCieploWlasciwe;
