import { ScrollArea } from "@mantine/core";
import React from "react";
import { InputComponent, SelectComponent } from "../../";
import { usePhotovoltaic } from "~/hooks/usePhotovoltaic";
import useStore from "~/store";
import { type PhotovoltaicDataToCalculation } from "~/server/api/routers/photovoltaic/interfaces";
import { YESNO } from "~/constans/formsData";

const PhotovoltaicFormulas = ({
  data,
}: {
  data: PhotovoltaicDataToCalculation | undefined;
}) => {
  const store = useStore();

  const { photovoltaicStore, mutations } = usePhotovoltaic();

  return (
    <div id="FORM" className="h-full p-3 laptop:w-[55%] laptop:min-w-[500px] ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl"
      >
        FOTOWOLTAIKA
      </h1>
      <ScrollArea h={"78%"}>
        <div className="laptop:mr-4">
          <h2 className="font-orkneyBold">CENA ENERGII</h2>
          <InputComponent
            title="W LIMICIE"
            onChange={mutations.handleInLimitOnChange}
            step={0.1}
            value={photovoltaicStore.energyPriceInLimit}
          />
          <InputComponent
            title="POZA LIMICIE"
            onChange={mutations.handleOutOfLimitOnChange}
            step={0.1}
            value={photovoltaicStore.energyPriceOutOfLimit}
          />
          <InputComponent
            title="ILOŚĆ ENERGII ZUŻYWANEJ ŚREDNIO ROCZNIE"
            onChange={(e) => {
              store.updatePhotovoltaic(
                "recentYearTrendUsage",
                e.target.valueAsNumber
              );
            }}
            step={500}
            value={
              store.photovoltaicStore.recentYearTrendUsage === 0
                ? ""
                : store.photovoltaicStore.recentYearTrendUsage
            }
          />
          <InputComponent
            title="LIMIT ZUŻYCIA"
            onChange={(e) => {
              store.updatePhotovoltaic("usageLimit", e.target.valueAsNumber);
            }}
            step={500}
            value={
              photovoltaicStore.usageLimit === 0
                ? ""
                : photovoltaicStore.usageLimit
            }
          />
          <h2 className="mt-5 font-orkneyBold">INSTALACJA FOTOWOLTAICZNA</h2>
          <SelectComponent
            title="MOC POJEDYŃCZEGO PANELA W KW"
            onChange={(e) => {
              store.updatePhotovoltaic("panelPower", Number(e));
            }}
            value={photovoltaicStore.panelPower}
            data={[
              { value: "415", label: "415" },
              { value: "455", label: "455" },
              { value: "500", label: "500" },
            ]}
          />
          <InputComponent
            title="LICZBA MODUŁÓW"
            onChange={(e) =>
              store.updatePhotovoltaic("modulesCount", e.target.valueAsNumber)
            }
            step={1}
            value={photovoltaicStore.modulesCount}
          />
          <SelectComponent
            title="MONTAŻ NA GRUNCIE"
            onChange={(e) =>
              store.updatePhotovoltaic("isGroundMontage", e == "true")
            }
            value={photovoltaicStore.isGroundMontage}
            data={YESNO}
          />
          <SelectComponent
            title="STOPIEŃ AUTOKONSUMPCJI ENERGII Z PV"
            onChange={(e) => {
              store.updatePhotovoltaic("autoconsumptionInPercent", Number(e));
            }}
            value={photovoltaicStore.autoconsumptionInPercent}
            data={[
              { value: "0.1", label: "10%" },
              { value: "0.2", label: "20%" },
              { value: "0.3", label: "30%" },
              { value: "0.4", label: "40%" },
              { value: "0.5", label: "50%" },
              { value: "0.6", label: "60%" },
              { value: "0.7", label: "70%" },
              { value: "0.8", label: "80%" },
            ]}
          />
          {!photovoltaicStore.isGroundMontage && (
            <SelectComponent
              title="DACH SKIEROWANY NA POŁUDNIE"
              onChange={(e) =>
                store.updatePhotovoltaic("southRoof", e == "true")
              }
              value={photovoltaicStore.southRoof}
              data={YESNO}
            />
          )}
          <SelectComponent
            title="MONTAŻ NA WIELU POWIERZCHNIACH - SOLAR EDGE"
            onChange={(e) =>
              store.updatePhotovoltaic("isSolarEdgeChoosed", e == "true")
            }
            value={photovoltaicStore.isSolarEdgeChoosed}
            data={YESNO}
          />
          {!photovoltaicStore.isGroundMontage && (
            <SelectComponent
              title="MONTAŻ NA DACHU PŁASKIM - EKIERKI"
              onChange={(e) =>
                store.updatePhotovoltaic("isEccentricsChoosed", e == "true")
              }
              value={photovoltaicStore.isEccentricsChoosed}
              data={YESNO}
            />
          )}
          {!photovoltaicStore.isGroundMontage && (
            <SelectComponent
              title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
              onChange={(e) =>
                store.updatePhotovoltaic("isRoofWeightSystem", e == "true")
              }
              value={photovoltaicStore.isRoofWeightSystem}
              data={YESNO}
            />
          )}
          <InputComponent
            title="OPTYMALIZATORY TIGO DO ZACIEMNIONYCH MODUŁÓW"
            onChange={(e) => {
              store.updatePhotovoltaic("tigoCount", e.target.valueAsNumber);
              mutations.handleTigoinput(e);
            }}
            step={1}
            value={
              photovoltaicStore.tigoCount == 0
                ? ""
                : photovoltaicStore.tigoCount
            }
          />
          <SelectComponent
            title="INWERTER HYBRYDOWY"
            onChange={(e) =>
              store.updatePhotovoltaic("isInwerterChoosed", e == "true")
            }
            value={photovoltaicStore.isInwerterChoosed}
            data={YESNO}
          />
          <SelectComponent
            title="MAGAZYN CIEPŁA"
            onChange={(e) =>
              store.updatePhotovoltaic("heatStoreDotation", e == "true")
            }
            value={photovoltaicStore.heatStoreDotation}
            data={YESNO}
          />
          {photovoltaicStore.heatStoreDotation && data && (
            <SelectComponent
              title={"WIELKOŚĆ ZBIORNIKA CWU"}
              onChange={(e) => {
                store.updatePhotovoltaic("tankSize", String(e));
                mutations.set_heatStore_cost({
                  choosed_tank_type: String(e),
                  tanks_costs: data?.zbiorniki,
                });
              }}
              value={photovoltaicStore.tankSize}
              data={[
                { value: "Brak", label: "Brak" },
                {
                  value: "Zbiornik 140L z wężownicą",
                  label: "Zbiornik 140L z wężownicą",
                },
                {
                  value: "Zbiornik 200L z wężownicą",
                  label: "Zbiornik 200L z wężownicą",
                },
              ]}
            />
          )}
          <SelectComponent
            title="EMS"
            onChange={(e) =>
              store.updatePhotovoltaic("emsDotation", e == "true")
            }
            value={photovoltaicStore.emsDotation}
            data={YESNO}
          />
          <SelectComponent
            title="MAGAZYN ENERGII"
            onChange={(e) =>
              store.updatePhotovoltaic("energyStoreDotation", e == "true")
            }
            value={photovoltaicStore.energyStoreDotation}
            data={YESNO}
          />

          {photovoltaicStore.energyStoreDotation && (
            <>
              <SelectComponent
                title="PRODUCENT MAGAZYNU ENERGII"
                onChange={(e) =>
                  store.updatePhotovoltaic("energyStoreProducent", String(e))
                }
                value={photovoltaicStore.energyStoreProducent}
                data={["SOLAX", "HIPONTECH"]}
              />
              {photovoltaicStore.energyStoreProducent === "SOLAX" ? (
                <SelectComponent
                  title="MOC MAGAZYNU ENERGII"
                  onChange={(e) => {
                    store.updatePhotovoltaic("energyStorePower", Number(e));
                  }}
                  value={photovoltaicStore.energyStorePower}
                  data={[
                    { value: "3.1", label: "3.1 - 1 faza" },
                    { value: "6.1", label: "6.1 - 1/3 fazy" },
                    { value: "11.6", label: "11.6 - 3 fazy" },
                    { value: "17.4", label: "17.4 - 3 fazy" },
                    { value: "23.2", label: "23.2 - 3 fazy" },
                    { value: "29", label: "29 - 3 fazy" },
                    { value: "34.8", label: "34.8 - 3 fazy" },
                    { value: "40.6", label: "40.6 - 3 fazy" },
                    { value: "46.4", label: "46.4 - 3 fazy" },
                  ]}
                />
              ) : (
                <SelectComponent
                  title="MOC MAGAZYNU ENERGII"
                  onChange={(e) => {
                    store.updatePhotovoltaic("energyStorePower", Number(e));
                  }}
                  value={photovoltaicStore.energyStorePower}
                  data={[
                    { value: "7.2", label: "7.2 - 3 fazy" },
                    { value: "10.8", label: "10.8 - 3 fazy" },
                    { value: "14.4", label: "14.4 - 3 fazy" },
                  ]}
                />
              )}
            </>
          )}

          <SelectComponent
            title="CAR PORT"
            onChange={(e) => store.updatePhotovoltaic("isCarPort", e == "true")}
            value={photovoltaicStore.isCarPort}
            data={YESNO}
          />
          {photovoltaicStore.isCarPort && (
            <SelectComponent
              title="WIELKOŚĆ CAR PORTU"
              onChange={(e) =>
                store.updatePhotovoltaic("choosedCarPort", String(e))
              }
              value={photovoltaicStore.choosedCarPort}
              data={[
                { value: "0_stan", label: "BRAK" },
                { value: "stan1", label: "1 STAN. 10 MODUŁÓW" },
                { value: "stan2", label: "2 STAN. 15 MODUŁÓW" },
                { value: "stan4", label: "4 STAN. 30 MODUŁÓW" },
                { value: "stan6", label: "6 STAN. 45 MODUŁÓW" },
                { value: "stan8", label: "8 STAN. 60 MODUŁÓW" },
                { value: "stan10", label: "10 STAN. 75 MODUŁÓW" },
                { value: "stan12", label: "12 STAN. 90 MODUŁÓW" },
              ]}
            />
          )}
          <SelectComponent
            title="ULGA PODATKOWA"
            onChange={(e) => store.updatePhotovoltaic("taxCredit", Number(e))}
            value={photovoltaicStore.taxCredit}
            data={[
              { value: "0", label: "0%" },
              { value: "0.12", label: "12%" },
              { value: "0.32", label: "32%" },
            ]}
          />
          <SelectComponent
            title="UWZGLĘDNIJ PROMOCJĘ"
            onChange={(e) =>
              store.updatePhotovoltaic("isPromotion", e == "true")
            }
            value={photovoltaicStore.isPromotion}
            data={YESNO}
          />
          <InputComponent
            title="LICZBA RAT"
            onChange={(e) => {
              store.updatePhotovoltaic(
                "installmentNumber",
                e.target.valueAsNumber
              );
            }}
            step={10}
            value={photovoltaicStore.installmentNumber}
          />
          <InputComponent
            title="PROMOCJA"
            onChange={(e) =>
              store.updatePhotovoltaic(
                "promotionAmount",
                e.target.valueAsNumber
              )
            }
            step={100}
            value={photovoltaicStore.promotionAmount}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default PhotovoltaicFormulas;
