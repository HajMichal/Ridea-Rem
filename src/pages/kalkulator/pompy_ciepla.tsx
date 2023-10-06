import React from "react";

import { ScrollArea } from "@mantine/core";
import { SideBar, Navbar, InputComponent, SelectComponent } from "~/components";
import { Preview } from "~/components/heatPumps";
import { useHeatPump } from "~/hooks/useHeatPump";
import useStore from "~/store";

const Pompy_ciepla = () => {
  const store = useStore();
  const { heatPumpStore, mutations } = useHeatPump();

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];
  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
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
                  onChange={mutations.setHeatedArea}
                  value={heatPumpStore.heatedArea}
                  step={10}
                />
                <InputComponent
                  title="WYSOKOŚĆ POMIESZCZEŃ W CM"
                  onChange={mutations.setRoomHeight}
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
                  onChange={mutations.setSuggestedPower}
                  value={heatPumpStore.suggestedPumpPower}
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
                  onChange={mutations.setOneTonneOfResourceCost}
                  value={heatPumpStore.oneTonneOfResourceCost}
                  step={1}
                />
                <InputComponent
                  title="DOTYCHCZASOWY ROCZNY KOSZT OGRZEWANIA DOMU"
                  onChange={mutations.setYearlyHeatingCosts}
                  value={heatPumpStore.yearlyHeatingHomeCost}
                  step={1}
                />
                <h2 className="mt-5 font-orkneyBold">
                  INSTALACJA POMPY CIEPŁA
                </h2>
                <SelectComponent
                  title="MINIMALNA TEMPERATURA PRACY POMPY BEZ WSPOMAGANIA"
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
                />

                <SelectComponent
                  title="PROPONOWANA POMPA CIEPŁA"
                  onChange={(e) =>
                    store.updateHeatPump("suggestedPump", String(e))
                  }
                  value={heatPumpStore.suggestedPump}
                  data={[
                    "Z-PRO.5.3/4.Mitsubishi.Inv.11-16",
                    "Z-PRO.5.3/4.Mitsubishi.IHO.11-16",
                    "SAT.6.3.Danfoss.Inv.14-23",
                    "SAT.6.3.Danfoss.IHO.14-24",
                    "SAT.ELI.8.2.P19i.17-29",
                    "SAT.ELI.8.3.P23i.20-32",
                    "SAT.ELI.8.3.P26i.23-34",
                    "SAT.ELI.8.3.P30i.25-37",
                    "SAT.ELI.8.2.P19iHO.25-35",
                    "SAT.ELI.8.3.P23iHO.30-41",
                    "SAT.ELI.8.3.P26iHO.35-45",
                    "SAT.ELI.8.3.P30iHO.37-48",
                  ]}
                />
                <SelectComponent
                  title="BUFOR 300L PRZYŁĄCZE SCHEMAT 34"
                  onChange={(e) =>
                    store.updateHeatPump("isBufor300L", e == "true")
                  }
                  value={heatPumpStore.isBufor300L}
                  data={yesNoData}
                />
                <SelectComponent
                  title="MONTAŻ NA FIRMĘ Z WATEM 23%"
                  onChange={(e) =>
                    store.updateHeatPump("forCompany", e == "true")
                  }
                  value={heatPumpStore.forCompany}
                  data={yesNoData}
                />
                <SelectComponent
                  title="PRZEDŁUŻONA GWARANCJA NA POMPĘ CIEPŁA DO 10 LAT"
                  onChange={(e) =>
                    store.updateHeatPump("isLongerGuarantee", e == "true")
                  }
                  value={heatPumpStore.isLongerGuarantee}
                  data={yesNoData}
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
                />
                <SelectComponent
                  title="POSADOWIENIE Z ROZSĄCZANIEM"
                  onChange={(e) =>
                    store.updateHeatPump("isPlacemnetWithBurst", e == "true")
                  }
                  value={heatPumpStore.isPlacemnetWithBurst}
                  data={yesNoData}
                />
                <SelectComponent
                  title="DODATKOWE PRZEWIERTY DO KOLEJNEGO POMIESZCZENIA Z MASZYNOWNI"
                  onChange={(e) =>
                    store.updateHeatPump("newDrillings", e == "true")
                  }
                  value={heatPumpStore.newDrillings}
                  data={yesNoData}
                />
                <InputComponent
                  title="POPROWADZENIE INSTALACJI OD PC DO BUDYNKU PO WIERZCHU W IZOLACJI Z WEŁNY MINERALNEJ (DO 2,5M OD BUDYNKU W CENIE) WPISAĆ ILOŚC PONAD STANDART W MB"
                  onChange={mutations.setLongerIsolationFromMineralWool}
                  value={heatPumpStore.longerIsolationFromMineralWool}
                  step={1}
                />
                <SelectComponent
                  title="RURA PREIZOLOWANA (W GRUNCIE) - PIERWSZE 2MB"
                  onChange={(e) =>
                    store.updateHeatPump("isPreIsolatedPipe", e == "true")
                  }
                  value={heatPumpStore.isPreIsolatedPipe}
                  data={yesNoData}
                />
                <InputComponent
                  title="KAŻDY NASTĘPNY MB (WPISZ ILOŚĆ METRÓW)"
                  onChange={mutations.setLongerPreIsolatedPipe}
                  value={heatPumpStore.longerPreIsolatedPipe}
                  step={1}
                />
                <SelectComponent
                  title="MONTAŻ CYRKULACJI DO CWU"
                  onChange={(e) =>
                    store.updateHeatPump("isMontageCirculationCWU", e == "true")
                  }
                  value={heatPumpStore.isMontageCirculationCWU}
                  data={yesNoData}
                />
                <SelectComponent
                  title="DEMONTAŻ STAREGO KOTŁA BEZ WYNOSZENIA (WĘGLOWEGO, GROSZEK)"
                  onChange={(e) =>
                    store.updateHeatPump("demontageOldBoiler", e == "true")
                  }
                  value={heatPumpStore.demontageOldBoiler}
                  data={yesNoData}
                />
                <SelectComponent
                  title="PRZYGOTOWANIE POPRZEZ POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMTNÓW MASZYNOWNI"
                  onChange={(e) =>
                    store.updateHeatPump("cleanMontagePlacement", e == "true")
                  }
                  value={heatPumpStore.cleanMontagePlacement}
                  data={yesNoData}
                />
                <SelectComponent
                  title="PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA"
                  onChange={(e) => store.updateHeatPump("moveCwu", e == "true")}
                  value={heatPumpStore.moveCwu}
                  data={yesNoData}
                />
                <SelectComponent
                  title="WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC (SKRZYNKA Z ZABEZPIECZANIAMI)"
                  onChange={(e) =>
                    store.updateHeatPump("makeEnergeticConnection", e == "true")
                  }
                  value={heatPumpStore.makeEnergeticConnection}
                  data={yesNoData}
                />
                <SelectComponent
                  title="SPIĘCIE BUFORA CO, Z DODATKOWYM ŹRÓDŁEM GRZEWCZYM (KOCIOŁ GAZOWY, OLEJOWY, BEZ WĘGLA ITP.)"
                  onChange={(e) =>
                    store.updateHeatPump("mergeNewBufforWithOld", e == "true")
                  }
                  value={heatPumpStore.mergeNewBufforWithOld}
                  data={yesNoData}
                />
                <SelectComponent
                  title="ZAMKNIĘCIE UKŁADU OTWARTEGO (NIE ZAMYKAMY UKŁADÓW Z POZOSTAWIONYM KOTŁEM NA PALIWA STAŁE)"
                  onChange={(e) =>
                    store.updateHeatPump("closingOpenSytem", e == "true")
                  }
                  value={heatPumpStore.closingOpenSytem}
                  data={yesNoData}
                />
              </div>
            </ScrollArea>
          </div>
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Pompy_ciepla;
