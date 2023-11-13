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
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface EditionForm {
  [key: string]: { [key: string]: PhotovoltaicDataToCalculation };
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
  const { register, handleSubmit } = useForm<PhotovoltaicDataToCalculation>();
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
        zbiornik_140L_z_wezem:
          dynamicPropValues.zbiorniki.zbiornik_140L_z_wezem,
        zbiornik_200L: dynamicPropValues.zbiorniki.zbiornik_200L,
        zbiornik_200L_z_wezem:
          dynamicPropValues.zbiorniki.zbiornik_200L_z_wezem,
      },
      magazyn_energii_solax: {
        prog0: dynamicPropValues.magazyn_energii_solax.prog0,
        prog1: dynamicPropValues.magazyn_energii_solax.prog1,
        prog2: dynamicPropValues.magazyn_energii_solax.prog2,
        prog3: dynamicPropValues.magazyn_energii_solax.prog3,
        prog4: dynamicPropValues.magazyn_energii_solax.prog4,
        prog5: dynamicPropValues.magazyn_energii_solax.prog5,
        prog6: dynamicPropValues.magazyn_energii_solax.prog6,
        prog7: dynamicPropValues.magazyn_energii_solax.prog7,
        prog8: dynamicPropValues.magazyn_energii_solax.prog8,
      },
      magazyn_energii_hipontech: {
        prog0: dynamicPropValues.magazyn_energii_hipontech.prog0,
        prog1: dynamicPropValues.magazyn_energii_hipontech.prog1,
        prog2: dynamicPropValues.magazyn_energii_hipontech.prog2,
      },
      magazynCiepla: dynamicPropValues.magazynCiepla,
      oprocentowanie_kredytu: dynamicPropValues.oprocentowanie_kredytu,
      prowizjaBiura: dynamicPropValues.prowizjaBiura,
      ems: dynamicPropValues.ems,
    },
  };
  const onSubmit: SubmitHandler<PhotovoltaicDataToCalculation> = (data) => {
    mutate({ [dynamicKey!]: data });
    close();
  };

  const jsxPanel400Elements = [];
  const jsxPanel455Elements = [];
  const jsxPanel500Elements = [];

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
      jsxPanel455Elements.push(
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
      jsxPanel500Elements.push(
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
    <div>
      {/* Render components based on data */}
      {dynamicPropValues &&
        Object.keys(dynamicPropValues).map((key) => {
          return (
            <div key={key}>
              {/* You can customize the rendering logic based on your data structure */}
              <h3>{key}</h3>
              {Object.keys(
                dynamicPropValues[key as keyof typeof dynamicPropValues]
              ).map((innerKey) => {
                return (
                  <div key={innerKey}>
                    <p>{innerKey}</p>
                    {/* You can further customize the rendering based on your needs */}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
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
    <div className="flex h-full max-h-screen min-h-screen justify-center overflow-hidden bg-[#E8E7E7] font-orkney">
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
            <Tabs.List className="fixed z-50 -mt-24 w-full bg-backgroundGray">
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

export default DaneFotowoltaiki;
