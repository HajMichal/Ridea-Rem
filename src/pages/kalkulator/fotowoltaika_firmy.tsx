import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputComponent, SelectComponent } from "~/components";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { Preview } from "~/components/forCompany";
import { useForCompany } from "~/hooks/useForCompany";
import { ForCompanyDataToCalcualtionType } from "~/server/api/routers/forCompany/interfaces";
import useStore from "~/store";
import { api } from "~/utils/api";

const Fotowoltaika_firmy = () => {
  const store = useStore();
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data } =
    api.forCompanyDataFlowRouter.downloadFile.useQuery<ForCompanyDataToCalcualtionType>(
      sessionData?.user.id
    );

  const { mutations, forCompanyStore, forCompanyCalcStore } = useForCompany();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    } else if (sessionData?.user.role !== 1) void router.push("/home");
  }, [sessionData, router]);

  useEffect(() => {
    if (forCompanyStore.wantedInstalationPower > 0)
      mutations.setCalculateModuleCount({
        wantedInstaltionPower: forCompanyStore.wantedInstalationPower,
      });
  }, [forCompanyStore.wantedInstalationPower]);

  useEffect(() => {
    mutations.setAllSystemPowers({
      calculateModuleCount: forCompanyCalcStore.calculateModuleCount,
    });
  }, [forCompanyCalcStore.calculateModuleCount]);

  useEffect(() => {
    if (forCompanyCalcStore.allSystemPowers.systemPower400 && data)
      mutations.setBaseInstallationsPricing({
        system_power: forCompanyCalcStore.allSystemPowers,
        dane: data.dane,
      });
  }, [forCompanyCalcStore.allSystemPowers, data]);

  useEffect(() => {
    mutations.setEstimatedKWHProd({
      systemPower: forCompanyCalcStore.sysPower ?? 0,
    });
  }, [forCompanyCalcStore.sysPower]);

  useEffect(() => {
    mutations.setAutoconsumption({
      autoconsumptionStep: forCompanyStore.autoconsumptionInPercent,
      estimatedKWHProd: forCompanyCalcStore.estimatedKWHProd,
    });
  }, [
    forCompanyCalcStore.estimatedKWHProd,
    forCompanyStore.autoconsumptionInPercent,
  ]);

  useEffect(() => {
    if (forCompanyStore.panelPower === 400) {
      store.updateForCompanyCalculation(
        "sysPower",
        forCompanyCalcStore.allSystemPowers.systemPower400
      );
    } else if (forCompanyStore.panelPower === 455) {
      store.updateForCompanyCalculation(
        "sysPower",
        forCompanyCalcStore.allSystemPowers.systemPower455
      );
    } else if (forCompanyStore.panelPower === 500) {
      store.updateForCompanyCalculation(
        "sysPower",
        forCompanyCalcStore.allSystemPowers.systemPower500
      );
    }
  }, [forCompanyCalcStore.allSystemPowers, forCompanyStore.panelPower]);
  useEffect(() => {
    if (forCompanyStore.panelPower === 400) {
      store.updateForCompanyCalculation(
        "modulesCount",
        forCompanyCalcStore.calculateModuleCount.modulesCount400
      );
    } else if (forCompanyStore.panelPower === 455) {
      store.updateForCompanyCalculation(
        "modulesCount",
        forCompanyCalcStore.calculateModuleCount.modulesCount455
      );
    } else if (forCompanyStore.panelPower === 500) {
      store.updateForCompanyCalculation(
        "modulesCount",
        forCompanyCalcStore.calculateModuleCount.modulesCount500
      );
    }
  }, [forCompanyCalcStore.calculateModuleCount, forCompanyStore.panelPower]);

  useEffect(() => {
    if (data)
      mutations.setFor1KwAndBaseInstallationPrice({
        dane: mutations.getDataDependsOnPanelPower()!,
        system_power: forCompanyCalcStore.sysPower ?? 0,
      });
  }, [forCompanyStore.panelPower, forCompanyCalcStore.sysPower, data]);

  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setBloczkiPrice({
        isChoosed: forCompanyStore.isRoofWeightSystem,
        price: data?.koszty_dodatkowe.bloczki,
        modules_count: forCompanyCalcStore.sysPower,
      });
  }, [
    forCompanyCalcStore.modulesCount,
    data,
    forCompanyStore.isRoofWeightSystem,
  ]);
  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setEkierkiPrice({
        isChoosed: forCompanyStore.isEccentricsChoosed,
        price: data?.koszty_dodatkowe.ekierki,
        modules_count: forCompanyStore.eccentricsCount,
      });
  }, [
    forCompanyCalcStore.modulesCount,
    forCompanyStore.eccentricsCount,
    data,
    forCompanyStore.isEccentricsChoosed,
  ]);
  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setTigoPrice({
        isChoosed: forCompanyStore.isTigoChoosed,
        price: data?.koszty_dodatkowe.tigo,
        modules_count: forCompanyStore.tigoCount,
      });
  }, [
    forCompanyCalcStore.modulesCount,
    forCompanyStore.tigoCount,
    data,
    forCompanyStore.isTigoChoosed,
  ]);
  useEffect(() => {
    if (
      data &&
      forCompanyStore.groundPanelCount <= forCompanyCalcStore.modulesCount
    )
      mutations.setGruntPrice({
        isChoosed: forCompanyStore.isGroundMontage,
        price: data?.koszty_dodatkowe.grunt,
        modules_count: forCompanyStore.groundPanelCount,
      });
  }, [
    forCompanyStore.groundPanelCount,
    forCompanyCalcStore.modulesCount,
    data,
    forCompanyStore.isGroundMontage,
  ]);
  useEffect(() => {
    mutations.setAddonSum({
      bloczkiPrice: forCompanyCalcStore.addonBloczkiPrice,
      ekierkiPrice: forCompanyCalcStore.addonEkierkiPrice,
      groundMontagePrice: forCompanyCalcStore.addonGruntPrice,
      tigoPrice: forCompanyCalcStore.addonTigoPrice,
      markupSumValue: forCompanyCalcStore.officeMarkup.markupSumValue,
    });
  }, [
    forCompanyCalcStore.addonBloczkiPrice,
    forCompanyCalcStore.addonEkierkiPrice,
    forCompanyCalcStore.addonGruntPrice,
    forCompanyCalcStore.addonTigoPrice,
    forCompanyCalcStore.officeMarkup,
  ]);
  useEffect(() => {
    if (data && forCompanyCalcStore.sysPower && sessionData)
      mutations.setOfficeMarkup({
        system_power: forCompanyCalcStore.sysPower,
        officeFee: sessionData.user.feePerkw,
        constantFee: sessionData.user.imposedFee,
        consultantFee: forCompanyStore.consultantMarkup,
        officeFeeFromJsonFile: data.prowizjaBiura,
        creatorId:
          sessionData.user.role === 3 ? sessionData.user.creatorId : "",
      });
  }, [
    sessionData?.user,
    data,
    forCompanyStore.consultantMarkup,
    forCompanyCalcStore.sysPower,
  ]);
  useEffect(() => {
    mutations.setTotalInstallationCosts({
      addonsSum: forCompanyCalcStore.addonSum,
      baseInstallationCost:
        forCompanyCalcStore.for1KwAndBaseInstallationPrice
          .baseInstallationPrice,
      vatValue: forCompanyStore.vatValue,
    });
  }, [
    forCompanyCalcStore.for1KwAndBaseInstallationPrice,
    forCompanyCalcStore.addonSum,
    forCompanyStore.vatValue,
  ]);
  useEffect(() => {
    if (data)
      mutations.setLoanForPurcharse({
        creditPercentage: data.oprocentowanie_kredytu,
        finallInstallationCost:
          forCompanyCalcStore.totalInstallationCosts.grossPrice,
        grossInstalltaionBeforeDotationsCost:
          forCompanyCalcStore.totalInstallationCosts.grossPrice,
        instalmentNumber: forCompanyStore.installmentNumber,
      });
  }, [
    forCompanyStore.installmentNumber,
    data,
    forCompanyCalcStore.totalInstallationCosts,
  ]);

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
            <h1
              style={{ textShadow: " 24px 24px #bebebe" }}
              className="z-50 mb-10 font-orkneyBold text-5xl"
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
                  data={yesNoData}
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
                  data={yesNoData}
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
                  data={yesNoData}
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
                  data={yesNoData}
                />
                {forCompanyStore.isTigoChoosed && (
                  <InputComponent
                    title="LICZBA OPTYMALIZATORÓW TIGO"
                    onChange={(e) => {
                      store.updateForCompany(
                        "tigoCount",
                        e.target.valueAsNumber
                      );
                    }}
                    step={1}
                    value={forCompanyStore.tigoCount}
                  />
                )}
                <SelectComponent
                  title="STOPIEŃ AUTOKONSUMPCJI ENERGII Z PV"
                  onChange={(e) => {
                    store.updateForCompany(
                      "autoconsumptionInPercent",
                      Number(e)
                    );
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
                  data={[
                    { value: "400", label: "400" },
                    { value: "455", label: "455" },
                    { value: "500", label: "500" },
                  ]}
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
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika_firmy;
