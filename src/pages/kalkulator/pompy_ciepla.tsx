import React, { useEffect } from "react";

import { Overlay, ScrollArea } from "@mantine/core";
import {
  SideBar,
  Navbar,
  InputComponent,
  SelectComponent,
  Loading,
} from "~/components";
import { Preview } from "~/components/heatPumps/lazyLoading";
import { useHeatPump } from "~/hooks/useHeatPump";
import useStore from "~/store";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { type HeatPumpDataToCalculationType } from "~/server/api/routers/heatpump/interfaces";
import { useRouter } from "next/router";

const Pompy_ciepla = () => {
  const store = useStore();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { heatPumpStore, heatPumpCalcStore, mutations } = useHeatPump();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  const { data } =
    api.heatPumpDataFlowRouter.downloadFile.useQuery<HeatPumpDataToCalculationType>(
      sessionData?.user.id
    );

  useEffect(() => {
    if (data && heatPumpStore.buforType !== "")
      mutations.setBufforCost({
        bufforType: heatPumpStore.buforType,
        buffors: data?.bufory,
      });
  }, [data, heatPumpStore.buforType]);

  useEffect(() => {
    if (data) {
      mutations.setMontageInCascadeCost({
        isChoosed: heatPumpStore.isAnotherHeatPumpInCascade,
        montageCost: data.dodatki.kolejna_kaskada,
      });
    }
  }, [heatPumpStore.isAnotherHeatPumpInCascade, data]);
  useEffect(() => {
    if (data) {
      mutations.setPlacementWithBurstCost({
        isChoosed: heatPumpStore.isPlacemnetWithBurst,
        placementCost: data.dodatki.posadowienie_rozsaczanie,
      });
    }
  }, [heatPumpStore.isPlacemnetWithBurst, data]);
  useEffect(() => {
    if (data) {
      mutations.setNewDrillings({
        isChoosed: heatPumpStore.newDrillings,
        newDrillingsCost: data.dodatki.przewierty,
      });
    }
  }, [heatPumpStore.newDrillings, data]);
  useEffect(() => {
    if (data) {
      mutations.setLongerIsolationFromMineralWoolCost({
        isolationLength: heatPumpStore.longerIsolationFromMineralWool,
        longerIsolationFromMineralWoolCost:
          data.dodatki.poprowadzenie_instalacji_wierzchu,
      });
    }
  }, [heatPumpStore.longerIsolationFromMineralWool, data]);
  useEffect(() => {
    if (data) {
      mutations.setpreisolatedPipeCost({
        isChoosed: heatPumpStore.isPreIsolatedPipe,
        preisolatedPipeCost: data.dodatki.rura_preizolowana,
      });
    }
  }, [heatPumpStore.isPreIsolatedPipe, data]);
  useEffect(() => {
    if (data) {
      mutations.setLongerPreIsolatedPipeCost({
        preIsolationCost: data.dodatki.dodatkowe_rury_preizolowane,
        preIsolationLength: heatPumpStore.longerPreIsolatedPipe,
      });
    }
  }, [heatPumpStore.longerPreIsolatedPipe, data]);
  useEffect(() => {
    if (data) {
      mutations.setCirculationMontageCost({
        isChoosed: heatPumpStore.isMontageCirculationCWU,
        circulationCost: data.dodatki.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.isMontageCirculationCWU, data]);
  useEffect(() => {
    if (data) {
      mutations.setDemontageOldBoilerCost({
        isChoosed: heatPumpStore.demontageOldBoiler,
        demontageCost: data.dodatki.demontaz_kotla,
      });
    }
  }, [heatPumpStore.demontageOldBoiler, data]);
  useEffect(() => {
    if (data) {
      mutations.setCleaningPlacementCost({
        isChoosed: heatPumpStore.cleanMontagePlacement,
        cleaningCost: data.dodatki.posprzatanie,
      });
    }
  }, [heatPumpStore.cleanMontagePlacement, data]);
  useEffect(() => {
    if (data) {
      mutations.setMoveCwuCost({
        isChoosed: heatPumpStore.moveCwu,
        moveCwuCost: data.dodatki.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.moveCwu, data]);
  useEffect(() => {
    if (data) {
      mutations.setEnergeticConnectionCost({
        isChoosed: heatPumpStore.makeEnergeticConnection,
        energeticConnectionCost: data.dodatki.cyrkulacja_cwu,
      });
    }
  }, [heatPumpStore.makeEnergeticConnection, data]);
  useEffect(() => {
    if (data) {
      mutations.setBuforWithSupportCost({
        isChoosed: heatPumpStore.mergeNewBufforWithOld,
        buforWithSupportCost: data.dodatki.spiecie_bufora,
      });
    }
  }, [heatPumpStore.mergeNewBufforWithOld, data]);
  useEffect(() => {
    if (data) {
      mutations.setCloseOpenedSystemCost({
        isChoosed: heatPumpStore.closingOpenSytem,
        closeSystemCost: data.dodatki.zamkniecie_ukladu_otwartego,
      });
    }
  }, [heatPumpStore.closingOpenSytem, data]);
  useEffect(() => {
    if (data && heatPumpStore.suggestedPump) {
      mutations.setHeatPumpCost({
        heatPumpCost: data.pompy_ciepla[heatPumpStore.suggestedPump]!.cena,
      });
    }
  }, [heatPumpStore.suggestedPump, data]);
  useEffect(() => {
    if (data && sessionData?.user && heatPumpStore.suggestedPump) {
      mutations.setMarkupCosts({
        system_power:
          data.pompy_ciepla[heatPumpStore.suggestedPump]!.mnozik_prowizji,
        officeFee: sessionData.user.feePerkwHeatPump,
        constantFee: sessionData.user.imposedFeeHeatPump,
        consultantFee: heatPumpStore.consultantMarkup,
        creatorId:
          sessionData.user.role === 3 ? sessionData.user.creatorId : "",
      });
    }
  }, [
    heatPumpStore.consultantMarkup,
    sessionData?.user,
    heatPumpStore.suggestedPump,
    data?.pompy_ciepla,
  ]);
  useEffect(() => {
    mutations.setAddonsSumCost({
      buforWithSupportCost: heatPumpCalcStore.buforWithSupportCost,
      circulationMontageCost: heatPumpCalcStore.circulationMontageCost,
      closeOpenedSystemCost: heatPumpCalcStore.closeOpenedSystemCost,
      demontageOldBoilerCost: heatPumpCalcStore.demontageOldBoilerCost,
      cleanPlacementCost: heatPumpCalcStore.cleanPlacementCost,
      energeticConnectionCost: heatPumpCalcStore.energeticConnectionCost,
      longerIsolationFromMineralWoolCost:
        heatPumpCalcStore.longerIsolationFromMineralWoolCost,
      longerPreIsolatedPipeCost: heatPumpCalcStore.longerPreIsolatedPipeCost,
      montagePumpInCascadeCost: heatPumpCalcStore.montagePumpInCascadeCost,
      moveCwuCost: heatPumpCalcStore.moveCwuCost,
      newDrillingsCost: heatPumpCalcStore.newDrillingsCost,
      placementWithBurstCost: heatPumpCalcStore.placementWithBurstCost,
      preisolatedPipeCost: heatPumpCalcStore.preisolatedPipeCost,
      markupSumValue: heatPumpCalcStore.markupCosts.markupSumValue,
    });
  }, [
    heatPumpCalcStore.buforWithSupportCost,
    heatPumpCalcStore.circulationMontageCost,
    heatPumpCalcStore.closeOpenedSystemCost,
    heatPumpCalcStore.demontageOldBoilerCost,
    heatPumpCalcStore.cleanPlacementCost,
    heatPumpCalcStore.energeticConnectionCost,
    heatPumpCalcStore.longerIsolationFromMineralWoolCost,
    heatPumpCalcStore.longerPreIsolatedPipeCost,
    heatPumpCalcStore.montagePumpInCascadeCost,
    heatPumpCalcStore.newDrillingsCost,
    heatPumpCalcStore.moveCwuCost,
    heatPumpCalcStore.placementWithBurstCost,
    heatPumpCalcStore.preisolatedPipeCost,
    heatPumpCalcStore.markupCosts,
  ]);
  useEffect(() => {
    mutations.setHeatPumpPricingBeforeDotations({
      addonsSumCost: heatPumpCalcStore.addonSumCost,
      buforCost: heatPumpCalcStore.bufforCost,
      netPriceForHeatPump: heatPumpCalcStore.heatPumpCost,
      vat: heatPumpStore.forCompany ? 0.23 : 0.08,
    });
  }, [
    heatPumpCalcStore.addonSumCost,
    heatPumpCalcStore.bufforCost,
    heatPumpCalcStore.heatPumpCost,
    heatPumpStore.forCompany,
  ]);
  useEffect(() => {
    if (data) {
      mutations.setHeatStoreDotationValue({
        modernizationDotation:
          data.dotacje.modernizacja_CO_CWU[
            heatPumpStore.choosedHeatPumpDotation
          ],
        heatStoreDotation:
          data.dotacje.pc[heatPumpStore.choosedHeatPumpDotation],
      });
    }
  }, [data?.dotacje, heatPumpStore.choosedHeatPumpDotation]);

  useEffect(() => {
    if (data) {
      mutations.setFinallGrossInstalationCost({
        dotationModernizationCoCwu:
          data.dotacje.modernizacja_CO_CWU[
            heatPumpStore.choosedHeatPumpDotation
          ],
        grossSystemValue:
          heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
        heatPumpDotation:
          heatPumpCalcStore.heatStoreDotations.heatStoreDotationValue,
        termoModernizationRelifAmount:
          heatPumpCalcStore.termoModernizationRelif,
      });
    }
  }, [
    data?.dotacje.modernizacja_CO_CWU,
    heatPumpCalcStore.heatStoreDotations,
    heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
    heatPumpCalcStore.termoModernizationRelif,
  ]);
  useEffect(() => {
    if (data) {
      mutations.setLoanForPurcharse({
        creditPercentage: data.oprocentowanie_kredytu,
        finall_installation_cost: heatPumpCalcStore.finallGrossInstalationCost,
        grossInstalltaionBeforeDotationsCost:
          heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue,
        instalmentNumber: heatPumpStore.installmentNumber,
      });
    }
  }, [
    heatPumpStore.installmentNumber,
    heatPumpCalcStore.heatPumpPricingBeforeDotations,
    heatPumpCalcStore.finallGrossInstalationCost,
    data?.oprocentowanie_kredytu,
  ]);
  useEffect(() => {
    if (data) {
      mutations.setHeatingWithHeatPump({
        yearlyHeatingUsage: heatPumpStore.yearlyHeatingUsage,
        cop: data.cop,
        priceOf1kWh: data.cena1kWh,
      });
    }
  }, [data, heatPumpStore.yearlyHeatingUsage]);
  useEffect(() => {
    mutations.setTermoModernizationRelif({
      dotationModernizationCoCwu:
        heatPumpCalcStore.heatStoreDotations.modernizationDotation,
      heatPumpDotation:
        heatPumpCalcStore.heatStoreDotations.heatStoreDotationValue,
      netSystemValue:
        heatPumpCalcStore.heatPumpPricingBeforeDotations.netSystemValue,
    });
  }, [
    heatPumpCalcStore.heatPumpPricingBeforeDotations.netSystemValue,
    heatPumpCalcStore.heatStoreDotations,
  ]);

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!data && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
            <h1
              style={{ textShadow: " 24px 24px #bebebe" }}
              className="z-50 mb-10 font-orkneyBold text-5xl"
            >
              POMPA CIEPŁA
            </h1>
            <ScrollArea h={"78%"}>
              <div className=" mr-4">
                <h2 className="font-orkneyBold">
                  DANE Z PORTALU CIEPŁO WŁAŚCIWE
                </h2>
                <InputComponent
                  title="POWIERZCHNIA OGRZEWANA W M²"
                  onChange={(e) =>
                    store.updateHeatPump("heatedArea", e.target.valueAsNumber)
                  }
                  value={heatPumpStore.heatedArea}
                  step={10}
                />
                <InputComponent
                  title="WYSOKOŚĆ POMIESZCZEŃ W CM"
                  onChange={(e) =>
                    store.updateHeatPump("roomHeight", e.target.valueAsNumber)
                  }
                  value={heatPumpStore.roomHeight}
                  step={10}
                />
                <SelectComponent
                  title="DEKLAROWANA IZOLACJA BUDYNKU"
                  onChange={(e) =>
                    store.updateHeatPump("buildingIsolation", String(e))
                  }
                  value={heatPumpStore.buildingIsolation}
                  data={[
                    {
                      value: "OCIEPLENIE STYROPIAN / WEŁNA 5 CM",
                      label: "STYROPIAN / WEŁNA 5 CM",
                    },
                    {
                      value: "OCIEPLENIE STYROPIAN / WEŁNA 10 CM",
                      label: "STYROPIAN / WEŁNA 10 CM",
                    },
                    {
                      value: "OCIEPLENIE STYROPIAN / WEŁNA 15 CM",
                      label: "STYROPIAN / WEŁNA 15 CM",
                    },
                    {
                      value: "OCIEPLENIE STYROPIAN / WEŁNA 20 CM",
                      label: "STYROPIAN / WEŁNA 20 CM",
                    },
                    {
                      value: "OCIEPLENIE STYROPIAN / WEŁNA 25 CM",
                      label: "STYROPIAN / WEŁNA 25 CM",
                    },
                  ]}
                />
                <SelectComponent
                  title="OKNA"
                  onChange={(e) =>
                    store.updateHeatPump("windowLayers", String(e))
                  }
                  value={heatPumpStore.windowLayers}
                  data={[
                    {
                      value: "OKNA CIEPŁE 1 SZYBOWE",
                      label: "CIEPŁE 1 SZYBOWE",
                    },
                    {
                      value: "OKNA CIEPŁE 2 SZYBOWE",
                      label: "CIEPŁE 2 SZYBOWE",
                    },
                    {
                      value: "OKNA CIEPŁE 3 SZYBOWE",
                      label: "CIEPŁE 3 SZYBOWE",
                    },
                  ]}
                />
                <SelectComponent
                  title="PRZESZKLENIA"
                  onChange={(e) =>
                    store.updateHeatPump("glazingType", String(e))
                  }
                  value={heatPumpStore.glazingType}
                  data={[
                    {
                      value: "STANDARDOWE PRZESZKLENIA",
                      label: "STANDARDOWE",
                    },
                    { value: "DUŻE PRZESZKLENIA", label: "DUŻE" },
                  ]}
                />
                <SelectComponent
                  title="STROP"
                  onChange={(e) =>
                    store.updateHeatPump("isolatedCeiling", String(e))
                  }
                  value={heatPumpStore.isolatedCeiling}
                  data={[
                    {
                      value: "IZOLOWANY STROP",
                      label: "IZOLOWANY",
                    },
                    { value: "NIEIZOLOWANY STROP", label: "NIEIZOLOWANY" },
                  ]}
                />
                <SelectComponent
                  title="DRZWI"
                  onChange={(e) =>
                    store.updateHeatPump("isolatedDoor", String(e))
                  }
                  value={heatPumpStore.isolatedDoor}
                  data={[
                    {
                      value: "IZOLOWANE DRZWI",
                      label: "IZOLOWANE",
                    },
                    { value: "NIEIZOLOWANE DRZWI", label: "NIEIZOLOWANE" },
                  ]}
                />
                <SelectComponent
                  title="GRZEJNIKI"
                  onChange={(e) =>
                    store.updateHeatPump("heatersType", String(e))
                  }
                  value={heatPumpStore.heatersType}
                  data={[
                    {
                      value: "GRZEJNIKI WYSOKOTEMPERATUROWE",
                      label: "WYSOKOTEMPERATUROWE",
                    },
                    {
                      value: "GRZEJNIKI NISKOTEMPERATUROWE",
                      label: "NISKOTEMPERATUROWE",
                    },
                  ]}
                />
                <InputComponent
                  title="SUGEROWANA MOC URZĄDZENIA GRZEWCZEGO"
                  onChange={(e) =>
                    store.updateHeatPump(
                      "suggestedPumpPower",
                      e.target.valueAsNumber
                    )
                  }
                  value={heatPumpStore.suggestedPumpPower}
                  step={1}
                />
                <InputComponent
                  title="ROCZNE ZUŻYCIE ENERGII CIEPLNEJ NA OGRZEWANIE"
                  onChange={(e) =>
                    store.updateHeatPump(
                      "yearlyHeatingUsage",
                      e.target.valueAsNumber
                    )
                  }
                  value={heatPumpStore.yearlyHeatingUsage}
                  step={1}
                />
                <h2 className="mt-5 font-orkneyBold">AKTUALNE OGRZEWANIE</h2>
                <SelectComponent
                  title="OBECNIE STOSOWANE PALIWO DO OGRZEWANIA"
                  onChange={(e) =>
                    store.updateHeatPump("currentFuelToHeat", String(e))
                  }
                  value={heatPumpStore.currentFuelToHeat}
                  data={[
                    "ENERGIA ELEKTRYCZNA",
                    "WĘGIEL KAMIENNY",
                    "MIAŁ WĘGLOWY 23 KWK CHWAŁOWICE",
                    "FLOT 20 KWK CHWAŁOWICE",
                    "GROSZEK",
                    "BIOMASA / PELET",
                    "OLEJ OPAŁOWY",
                    "GAZ PŁYNNY LPG",
                    "GAZ ZIEMNY",
                    "POMPA CIEPŁA COP= WG. J13",
                    "KOLEKTORY SŁONECZNE",
                    "PEC",
                  ]}
                />
                <InputComponent
                  title="CENA ZAKUPU 1 TONY"
                  onChange={(e) => {
                    store.updateHeatPump(
                      "oneTonneOfResourceCost",
                      e.target.valueAsNumber
                    );
                  }}
                  value={heatPumpStore.oneTonneOfResourceCost}
                  step={1}
                />
                <InputComponent
                  title="DOTYCHCZASOWY ROCZNY KOSZT OGRZEWANIA DOMU"
                  onChange={(e) => {
                    store.updateHeatPump(
                      "yearlyHeatingHomeCost",
                      e.target.valueAsNumber
                    );
                  }}
                  value={heatPumpStore.yearlyHeatingHomeCost}
                  step={1}
                />
                <h2 className="mt-5 font-orkneyBold">
                  INSTALACJA POMPY CIEPŁA
                </h2>
                <SelectComponent
                  title="PROPONOWANA POMPA CIEPŁA"
                  onChange={(e) => {
                    store.updateHeatPump("suggestedPump", String(e));
                  }}
                  value={heatPumpStore.suggestedPump}
                  data={[
                    "JGB2-PC10KW",
                    "JGB2-PC15KW",
                    "LAZAR-HTi20V8KW",
                    "LAZAR-HTi20V12KW",
                    "LAZAR-HTi20V16KW",
                    "ZEO-VCP-PRO10KW",
                    "ZEO-VCP-PRO15KW",
                    "ZEO-VCP-H4516KW",
                    "ZEO-SATELLITE16KW",
                    "POMPACIEPLA-czystepowietrze",
                  ]}
                />
                <SelectComponent
                  title="PUNKT BIWALENTYN POMPY CIEPŁA"
                  onChange={(e) =>
                    store.updateHeatPump("minimalWorkingTemp", Number(e))
                  }
                  value={heatPumpStore.minimalWorkingTemp}
                  data={[
                    { value: "-7", label: "-7" },
                    { value: "-12", label: "-12" },
                    { value: "-15", label: "-15" },
                    { value: "-20", label: "-20" },
                  ]}
                  smallField
                />
                {heatPumpStore.suggestedPump !==
                  "POMPACIEPLA-czystepowietrze" && (
                  <SelectComponent
                    title="SCHEMAT PRZYŁĄCZENIOWY"
                    onChange={(e) =>
                      store.updateHeatPump("isBufor", e == "true")
                    }
                    value={heatPumpStore.isBufor}
                    data={yesNoData}
                    smallField
                  />
                )}
                {heatPumpStore.isBufor && (
                  <SelectComponent
                    title="RODZAJ BUFORA"
                    onChange={(e) => {
                      store.updateHeatPump("buforType", String(e));
                    }}
                    value={heatPumpStore.buforType}
                    data={[
                      "Bufor 100l Szeregowo przyłącze schemat 17",
                      "Bufor 100l Szeregowo przyłącze schemat 24",
                      "Bufor 100l Szeregowo przyłącze schemat 34",
                      "Bufor 300l Szeregowo przyłącze schemat 17",
                      "Bufor 300l Szeregowo przyłącze schemat 24",
                      "Bufor 300l Szeregowo przyłącze schemat 34",
                      "Bufor 500l Szeregowo przyłącze schemat 17",
                      "Bufor 500l Szeregowo przyłącze schemat 24",
                      "Bufor 500l Szeregowo przyłącze schemat 34",
                    ]}
                  />
                )}
                <SelectComponent
                  title="MONTAŻ NA FIRMĘ Z VATEM 23%"
                  onChange={(e) =>
                    store.updateHeatPump("forCompany", e == "true")
                  }
                  value={heatPumpStore.forCompany}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="PRZEDŁUŻONA GWARANCJA NA POMPĘ CIEPŁA DO 8 LAT"
                  onChange={(e) =>
                    store.updateHeatPump("isLongerGuarantee", e == "true")
                  }
                  value={heatPumpStore.isLongerGuarantee}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="MONTAŻ KOLEJNEJ POMPY CIEPŁA W KASKADZIE"
                  onChange={(e) =>
                    store.updateHeatPump(
                      "isAnotherHeatPumpInCascade",
                      e == "true"
                    )
                  }
                  value={heatPumpStore.isAnotherHeatPumpInCascade}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="POSADOWIENIE NA PRZYGOTOWANYM PODŁOŻU WG WYTYCZNYCH LUB KOSTKA, BLOCZKI"
                  onChange={(e) =>
                    store.updateHeatPump(
                      "isPumpPlacementOnCobblestone",
                      e == "true"
                    )
                  }
                  value={heatPumpStore.isPumpPlacementOnCobblestone}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="POSADOWIENIE Z ROZSĄCZANIEM"
                  onChange={(e) =>
                    store.updateHeatPump("isPlacemnetWithBurst", e == "true")
                  }
                  value={heatPumpStore.isPlacemnetWithBurst}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="DODATKOWE PRZEWIERTY DO KOLEJNEGO POMIESZCZENIA Z MASZYNOWNI"
                  onChange={(e) =>
                    store.updateHeatPump("newDrillings", e == "true")
                  }
                  value={heatPumpStore.newDrillings}
                  data={yesNoData}
                  smallField
                />
                <InputComponent
                  title="POPROWADZENIE INSTALACJI OD PC DO BUDYNKU PO WIERZCHU W IZOLACJI Z WEŁNY MINERALNEJ (DO 2,5M OD BUDYNKU W CENIE) WPISAĆ ILOŚC PONAD STANDARD W MB"
                  onChange={(e) => {
                    store.updateHeatPump(
                      "longerIsolationFromMineralWool",
                      e.target.valueAsNumber
                    );
                  }}
                  value={heatPumpStore.longerIsolationFromMineralWool}
                  step={1}
                  smallField
                />
                <SelectComponent
                  title="RURA PREIZOLOWANA (W GRUNCIE) - PIERWSZE 2MB"
                  onChange={(e) =>
                    store.updateHeatPump("isPreIsolatedPipe", e == "true")
                  }
                  value={heatPumpStore.isPreIsolatedPipe}
                  data={yesNoData}
                  smallField
                />
                <InputComponent
                  title="KAŻDY NASTĘPNY MB (WPISZ ILOŚĆ METRÓW)"
                  onChange={(e) => {
                    store.updateHeatPump(
                      "longerPreIsolatedPipe",
                      e.target.valueAsNumber
                    );
                  }}
                  value={heatPumpStore.longerPreIsolatedPipe}
                  step={1}
                  smallField
                />
                <SelectComponent
                  title="MONTAŻ CYRKULACJI DO CWU"
                  onChange={(e) =>
                    store.updateHeatPump("isMontageCirculationCWU", e == "true")
                  }
                  value={heatPumpStore.isMontageCirculationCWU}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="DEMONTAŻ STAREGO KOTŁA BEZ WYNOSZENIA (WĘGLOWEGO, GROSZEK)"
                  onChange={(e) =>
                    store.updateHeatPump("demontageOldBoiler", e == "true")
                  }
                  value={heatPumpStore.demontageOldBoiler}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="PRZYGOTOWANIE POPRZEZ POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMENTÓW MASZYNOWNI"
                  onChange={(e) =>
                    store.updateHeatPump("cleanMontagePlacement", e == "true")
                  }
                  value={heatPumpStore.cleanMontagePlacement}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA"
                  onChange={(e) => store.updateHeatPump("moveCwu", e == "true")}
                  value={heatPumpStore.moveCwu}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC (SKRZYNKA Z ZABEZPIECZANIAMI)"
                  onChange={(e) =>
                    store.updateHeatPump("makeEnergeticConnection", e == "true")
                  }
                  value={heatPumpStore.makeEnergeticConnection}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="SPIĘCIE BUFORA CO, Z DODATKOWYM ŹRÓDŁEM GRZEWCZYM (KOCIOŁ GAZOWY, OLEJOWY, BEZ WĘGLA ITP.)"
                  onChange={(e) =>
                    store.updateHeatPump("mergeNewBufforWithOld", e == "true")
                  }
                  value={heatPumpStore.mergeNewBufforWithOld}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="ZAMKNIĘCIE UKŁADU OTWARTEGO (NIE ZAMYKAMY UKŁADÓW Z POZOSTAWIONYM KOTŁEM NA PALIWA STAŁE)"
                  onChange={(e) =>
                    store.updateHeatPump("closingOpenSytem", e == "true")
                  }
                  value={heatPumpStore.closingOpenSytem}
                  data={yesNoData}
                  smallField
                />
                <SelectComponent
                  title="DOTACJA"
                  onChange={(e) =>
                    store.updateHeatPump("choosedHeatPumpDotation", String(e))
                  }
                  value={heatPumpStore.choosedHeatPumpDotation}
                  data={[
                    { label: "PRÓG 1", value: "prog1" },
                    { label: "PRÓG 2", value: "prog2" },
                    { label: "PRÓG 3", value: "prog3" },
                    { label: "Mój Prąd", value: "mojPrad" },
                  ]}
                  smallField
                />
                <InputComponent
                  title="ILOŚĆ RAT"
                  onChange={(e) =>
                    store.updateHeatPump(
                      "installmentNumber",
                      e.target.valueAsNumber
                    )
                  }
                  value={heatPumpStore.installmentNumber}
                  step={1}
                />
              </div>
            </ScrollArea>
          </div>
          <Preview cop={data?.cop} />
        </div>
      </div>
    </main>
  );
};

export default Pompy_ciepla;
