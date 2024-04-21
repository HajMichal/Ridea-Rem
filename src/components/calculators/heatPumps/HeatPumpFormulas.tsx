import { ScrollArea } from "@mantine/core";
import React from "react";
import { InputComponent, SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useHeatPump } from "~/hooks/useHeatPump";
import { type HeatPumpDataToCalculationType } from "~/server/api/routers/heatpump/interfaces";
import useStore from "~/store";

const HeatPumpFormulas = ({
  data,
}: {
  data: HeatPumpDataToCalculationType | undefined;
}) => {
  const store = useStore();

  const { heatPumpStore } = useHeatPump();

  return (
    <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        POMPA CIEPŁA
      </h1>
      <ScrollArea h={"78%"}>
        <div className=" mr-4">
          <h2 className="font-orkneyBold">DANE Z PORTALU CIEPŁO WŁAŚCIWE</h2>
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
            onChange={(e) => store.updateHeatPump("windowLayers", String(e))}
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
            onChange={(e) => store.updateHeatPump("glazingType", String(e))}
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
            onChange={(e) => store.updateHeatPump("isolatedCeiling", String(e))}
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
            onChange={(e) => store.updateHeatPump("isolatedDoor", String(e))}
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
            onChange={(e) => store.updateHeatPump("heatersType", String(e))}
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
              store.updateHeatPump("suggestedPumpPower", e.target.valueAsNumber)
            }
            value={heatPumpStore.suggestedPumpPower}
            step={1}
          />
          <InputComponent
            title="ROCZNE ZUŻYCIE ENERGII CIEPLNEJ NA OGRZEWANIE"
            onChange={(e) =>
              store.updateHeatPump("yearlyHeatingUsage", e.target.valueAsNumber)
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
          <h2 className="mt-5 font-orkneyBold">INSTALACJA POMPY CIEPŁA</h2>
          <SelectComponent
            title="PROPONOWANA POMPA CIEPŁA"
            onChange={(e) => {
              store.updateHeatPump("suggestedPump", String(e));
            }}
            value={heatPumpStore.suggestedPump}
            data={data ? Object.keys(data.pompy_ciepla) : []}
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
          {heatPumpStore.suggestedPump !== "POMPACIEPLA-czystepowietrze" && (
            <SelectComponent
              title="SCHEMAT PRZYŁĄCZENIOWY"
              onChange={(e) => store.updateHeatPump("isBufor", e == "true")}
              value={heatPumpStore.isBufor}
              data={YESNO}
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
            onChange={(e) => store.updateHeatPump("forCompany", e == "true")}
            value={heatPumpStore.forCompany}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="PRZEDŁUŻONA GWARANCJA NA POMPĘ CIEPŁA DO 8 LAT"
            onChange={(e) =>
              store.updateHeatPump("isLongerGuarantee", e == "true")
            }
            value={heatPumpStore.isLongerGuarantee}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="MONTAŻ KOLEJNEJ POMPY CIEPŁA W KASKADZIE"
            onChange={(e) =>
              store.updateHeatPump("isAnotherHeatPumpInCascade", e == "true")
            }
            value={heatPumpStore.isAnotherHeatPumpInCascade}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="POSADOWIENIE NA PRZYGOTOWANYM PODŁOŻU WG WYTYCZNYCH LUB KOSTKA, BLOCZKI"
            onChange={(e) =>
              store.updateHeatPump("isPumpPlacementOnCobblestone", e == "true")
            }
            value={heatPumpStore.isPumpPlacementOnCobblestone}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="POSADOWIENIE Z ROZSĄCZANIEM"
            onChange={(e) =>
              store.updateHeatPump("isPlacemnetWithBurst", e == "true")
            }
            value={heatPumpStore.isPlacemnetWithBurst}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="DODATKOWE PRZEWIERTY DO KOLEJNEGO POMIESZCZENIA Z MASZYNOWNI"
            onChange={(e) => store.updateHeatPump("newDrillings", e == "true")}
            value={heatPumpStore.newDrillings}
            data={YESNO}
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
            data={YESNO}
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
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="DEMONTAŻ STAREGO KOTŁA BEZ WYNOSZENIA (WĘGLOWEGO, GROSZEK)"
            onChange={(e) =>
              store.updateHeatPump("demontageOldBoiler", e == "true")
            }
            value={heatPumpStore.demontageOldBoiler}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="PRZYGOTOWANIE POPRZEZ POSPRZĄTANIE MIEJSCA POSADOWIENIA ELEMENTÓW MASZYNOWNI"
            onChange={(e) =>
              store.updateHeatPump("cleanMontagePlacement", e == "true")
            }
            value={heatPumpStore.cleanMontagePlacement}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA"
            onChange={(e) => store.updateHeatPump("moveCwu", e == "true")}
            value={heatPumpStore.moveCwu}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="WYKONANIE PRZYŁĄCZA ENERGETYCZNEGO DO ZASILANIA PC (SKRZYNKA Z ZABEZPIECZANIAMI)"
            onChange={(e) =>
              store.updateHeatPump("makeEnergeticConnection", e == "true")
            }
            value={heatPumpStore.makeEnergeticConnection}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="SPIĘCIE BUFORA CO, Z DODATKOWYM ŹRÓDŁEM GRZEWCZYM (KOCIOŁ GAZOWY, OLEJOWY, BEZ WĘGLA ITP.)"
            onChange={(e) =>
              store.updateHeatPump("mergeNewBufforWithOld", e == "true")
            }
            value={heatPumpStore.mergeNewBufforWithOld}
            data={YESNO}
            smallField
          />
          <SelectComponent
            title="ZAMKNIĘCIE UKŁADU OTWARTEGO (NIE ZAMYKAMY UKŁADÓW Z POZOSTAWIONYM KOTŁEM NA PALIWA STAŁE)"
            onChange={(e) =>
              store.updateHeatPump("closingOpenSytem", e == "true")
            }
            value={heatPumpStore.closingOpenSytem}
            data={YESNO}
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
              store.updateHeatPump("installmentNumber", e.target.valueAsNumber)
            }
            value={heatPumpStore.installmentNumber}
            step={1}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default HeatPumpFormulas;
