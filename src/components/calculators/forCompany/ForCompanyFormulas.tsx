import { ScrollArea } from "@mantine/core";
import React, { useEffect } from "react";
import { InputComponent, SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";
import { useForCompany } from "~/hooks/useForCompany";
import useStore from "~/store";

export const ForCompanyFormulas = () => {
  const store = useStore();

  const { forCompanyStore, forCompanyCalcStore } = useForCompany();

  useEffect(() => {
    if (forCompanyStore.panelPower === smallestPanel) {
      store.updateForCompanyCalculation(
        "sysPower",
        forCompanyCalcStore.allSystemPowers.systemPower400
      );
    } else if (forCompanyStore.panelPower === mediumPanel) {
      store.updateForCompanyCalculation(
        "sysPower",
        forCompanyCalcStore.allSystemPowers.systemPower455
      );
    } else if (forCompanyStore.panelPower === largestPanel) {
      store.updateForCompanyCalculation(
        "sysPower",
        forCompanyCalcStore.allSystemPowers.systemPower500
      );
    }
  }, [forCompanyCalcStore.allSystemPowers, forCompanyStore.panelPower]);

  useEffect(() => {
    if (forCompanyStore.panelPower === smallestPanel) {
      store.updateForCompanyCalculation(
        "modulesCount",
        forCompanyCalcStore.calculateModuleCount.modulesCount400
      );
    } else if (forCompanyStore.panelPower === mediumPanel) {
      store.updateForCompanyCalculation(
        "modulesCount",
        forCompanyCalcStore.calculateModuleCount.modulesCount455
      );
    } else if (forCompanyStore.panelPower === largestPanel) {
      store.updateForCompanyCalculation(
        "modulesCount",
        forCompanyCalcStore.calculateModuleCount.modulesCount500
      );
    }
  }, [forCompanyCalcStore.calculateModuleCount, forCompanyStore.panelPower]);

  return (
    <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        FOTOWOLTAIKA DLA FIRM
      </h1>
      <ScrollArea h={"78%"}>
        <div className=" mr-4">
          <h2 className="font-orkneyBold">INSTALACJA FOTOWOLTAICZNA</h2>
          <InputComponent
            title="PRZYJĘTA MOC INSTALACJI"
            onChange={(e) =>
              store.updateForCompany(
                "wantedInstalationPower",
                e.target.valueAsNumber
              )
            }
            step={1}
            value={forCompanyStore.wantedInstalationPower}
          />
          <SelectComponent
            title="MONTAŻ NA GRUNCIE"
            onChange={(e) =>
              store.updateForCompany("isGroundMontage", e == "true")
            }
            value={forCompanyStore.isGroundMontage}
            data={YESNO}
          />
          {forCompanyStore.isGroundMontage && (
            <InputComponent
              title="LICZBA PANELI NA GRUNCIE"
              onChange={(e) =>
                store.updateForCompany(
                  "groundPanelCount",
                  e.target.valueAsNumber
                )
              }
              step={1}
              value={forCompanyStore.groundPanelCount}
            />
          )}
          <SelectComponent
            title="MONTAŻ NA DACHU PŁASKIM - EKIERKI"
            onChange={(e) =>
              store.updateForCompany("isEccentricsChoosed", e == "true")
            }
            value={forCompanyStore.isEccentricsChoosed}
            data={YESNO}
          />
          {forCompanyStore.isEccentricsChoosed && (
            <InputComponent
              title="LICZBA EKIEREK"
              onChange={(e) =>
                store.updateForCompany(
                  "eccentricsCount",
                  e.target.valueAsNumber
                )
              }
              step={1}
              value={forCompanyStore.eccentricsCount}
            />
          )}
          <SelectComponent
            title="SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY"
            onChange={(e) =>
              store.updateForCompany("isRoofWeightSystem", e == "true")
            }
            value={forCompanyStore.isRoofWeightSystem}
            data={YESNO}
          />
          {forCompanyStore.isRoofWeightSystem && (
            <InputComponent
              title="LICZBA SYSTEMÓW OBCIĄŻENIOWYCH LUB BALASTOWYCH"
              onChange={(e) =>
                store.updateForCompany(
                  "roofWeightSystemCount",
                  e.target.valueAsNumber
                )
              }
              step={1}
              value={forCompanyStore.roofWeightSystemCount}
            />
          )}
          <SelectComponent
            title="OPTYMALIZATORY TIGO DO ZACIEMNIONYCH MODUŁÓW"
            onChange={(e) =>
              store.updateForCompany("isTigoChoosed", e == "true")
            }
            value={forCompanyStore.isTigoChoosed}
            data={YESNO}
          />
          {forCompanyStore.isTigoChoosed && (
            <InputComponent
              title="LICZBA OPTYMALIZATORÓW TIGO"
              onChange={(e) => {
                store.updateForCompany("tigoCount", e.target.valueAsNumber);
              }}
              step={1}
              value={forCompanyStore.tigoCount}
            />
          )}
          <SelectComponent
            title="STOPIEŃ AUTOKONSUMPCJI ENERGII Z PV"
            onChange={(e) => {
              store.updateForCompany("autoconsumptionInPercent", Number(e));
            }}
            value={forCompanyStore.autoconsumptionInPercent}
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

          <SelectComponent
            title="MOC POJEDYŃCZEGO PANELA W KW"
            onChange={(e) => {
              store.updateForCompany("panelPower", Number(e));
            }}
            value={forCompanyStore.panelPower}
            data={[largestPanel.toString()]}
          />
          <SelectComponent
            title="STAWKA VAT"
            onChange={(e) => {
              store.updateForCompany("vatValue", Number(e));
            }}
            value={forCompanyStore.vatValue}
            data={[
              { value: "0.23", label: "23%" },
              { value: "0.08", label: "8%" },
            ]}
          />
          <InputComponent
            title="LICZBA RAT"
            onChange={(e) => {
              store.updateForCompany(
                "installmentNumber",
                e.target.valueAsNumber
              );
            }}
            step={10}
            value={forCompanyStore.installmentNumber}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
