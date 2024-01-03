import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { InputComponent, Navbar, SelectComponent, SideBar } from "~/components";
import { Preview } from "~/components/heatHome/Preview";
import { useHeatHome } from "~/hooks/useHeatHome";
import useStore from "~/store";
import { api } from "~/utils/api";

const Cieplo_wlasciwe = () => {
  const { data: sessionData } = useSession();
  const store = useStore();
  const { jsonData, mutations, heatHomeStore, heatHomeCalcStore } =
    useHeatHome();

  useEffect(() => {
    if (jsonData)
      mutations.setHeatedAreaCost({
        area: heatHomeStore.areaToHeat,
        cost: jsonData.m2_ocieplenia,
      });
  }, [heatHomeStore.areaToHeat, jsonData?.m2_ocieplenia]);

  useEffect(() => {
    if (jsonData)
      mutations.setHeatingThicknessCost({
        area: heatHomeStore.heatThickness,
        cost: jsonData.ocieplenia,
      });
  }, [heatHomeStore.heatThickness, jsonData?.ocieplenia]);

  useEffect(() => {
    if (jsonData)
      mutations.setWindowSillCost({
        area: heatHomeStore.windowSillCount,
        cost: jsonData.parapety,
      });
  }, [heatHomeStore.windowSillCount, jsonData?.parapety]);

  useEffect(() => {
    if (jsonData)
      mutations.setPlasterAreaCost({
        area: heatHomeStore.plasterArea,
        cost: jsonData.tynk,
      });
  }, [heatHomeStore.plasterArea, jsonData?.tynk]);

  useEffect(() => {
    if (jsonData)
      mutations.setTopFinishCost({
        area: heatHomeStore.topFinish,
        cost: jsonData.wykonczenie,
      });
  }, [heatHomeStore.topFinish, jsonData?.wykonczenie]);

  useEffect(() => {
    if (sessionData?.user) {
      mutations.setMarkupCosts({
        officeFee: sessionData?.user.feePerkwPhotovoltaic,
        constantFee: sessionData.user.imposedFeePhotovoltaic,
        consultantFee: heatHomeStore.consultantMarkup,
        heatingArea: heatHomeStore.areaToHeat,
        creatorId: sessionData.user.creatorId ?? "",
      });
    }
  }, [
    sessionData?.user.imposedFeeHeatHome,
    sessionData?.user.feePerkwHeatHome,
    heatHomeStore.consultantMarkup,
    heatHomeStore.areaToHeat,
  ]);

  useEffect(() => {
    if (jsonData)
      mutations.setTotalCost({
        heatingThickness: heatHomeCalcStore.heatingThicknessCost,
        heatingArea: heatHomeCalcStore.heatedAreaCost,
        windowSills: heatHomeCalcStore.windowSillCost,
        plaster: heatHomeCalcStore.plasterAreaCost,
        finishTop: heatHomeCalcStore.topFinishCost,
        additionalAmount: heatHomeStore.additionalAmount,
        markupSum: heatHomeCalcStore.markupCosts.markupSumValue,
      });
  }, [
    heatHomeCalcStore.heatingThicknessCost,
    heatHomeCalcStore.heatedAreaCost,
    heatHomeCalcStore.windowSillCost,
    heatHomeCalcStore.plasterAreaCost,
    heatHomeCalcStore.topFinishCost,
    heatHomeStore.additionalAmount,
    heatHomeCalcStore.markupCosts,
  ]);
  useEffect(() => {
    mutations.setDotationValue({
      dotationStep: heatHomeStore.dotationStep,
      totalCost: heatHomeCalcStore.totalCost.nett,
    });
  }, [heatHomeStore.dotationStep, heatHomeCalcStore.totalCost]);
  console.log(heatHomeCalcStore.dotationValue);
  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {/* {!data && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )} */}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
            <h1
              style={{ textShadow: " 24px 24px #bebebe" }}
              className="z-50 mb-10 font-orkneyBold text-5xl"
            >
              CIEPŁO WŁAŚCIWE
            </h1>
            <ScrollArea h={"78%"}>
              <InputComponent
                title="GRUBOŚĆ OCIEPLENIA"
                onChange={(e) =>
                  store.updateHeatHome("heatThickness", e.target.valueAsNumber)
                }
                step={1}
                value={heatHomeStore.heatThickness}
              />
              <InputComponent
                title="ILOŚĆ M² OCIEPLENIA"
                onChange={(e) =>
                  store.updateHeatHome("areaToHeat", e.target.valueAsNumber)
                }
                step={1}
                value={heatHomeStore.areaToHeat}
              />
              <InputComponent
                title="LICZBA PARAPETÓW"
                onChange={(e) =>
                  store.updateHeatHome(
                    "windowSillCount",
                    e.target.valueAsNumber
                  )
                }
                step={1}
                value={heatHomeStore.windowSillCount}
              />
              <InputComponent
                title="TYNK M²"
                onChange={(e) =>
                  store.updateHeatHome("plasterArea", e.target.valueAsNumber)
                }
                step={1}
                value={heatHomeStore.plasterArea}
              />
              <InputComponent
                title="WYKOŃCZENIE GÓRNE"
                onChange={(e) =>
                  store.updateHeatHome("topFinish", e.target.valueAsNumber)
                }
                step={1}
                value={heatHomeStore.topFinish}
              />
              <InputComponent
                title="KWOTA DODATKOWA"
                onChange={(e) =>
                  store.updateHeatHome(
                    "additionalAmount",
                    e.target.valueAsNumber
                  )
                }
                step={1}
                value={heatHomeStore.additionalAmount}
              />
              <SelectComponent
                title="DOTACJA"
                onChange={(e) =>
                  store.updateHeatHome("dotationStep", String(e))
                }
                value={heatHomeStore.dotationStep}
                data={[
                  { label: "PRÓG 0", value: "prog0" },
                  { label: "PRÓG 1", value: "prog1" },
                  { label: "PRÓG 2", value: "prog2" },
                  { label: "PRÓG 3", value: "prog3" },
                ]}
                smallField
              />
            </ScrollArea>
          </div>
          <Preview />
        </div>
      </div>
    </main>
  );
};

export default Cieplo_wlasciwe;
