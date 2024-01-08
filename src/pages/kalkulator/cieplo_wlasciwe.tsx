import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InputComponent, Navbar, SelectComponent, SideBar } from "~/components";
import { Preview } from "~/components/heatHome/Preview";
import { useHeatHome } from "~/hooks/useHeatHome";
import useStore from "~/store";

const Cieplo_wlasciwe = () => {
  const { data: sessionData } = useSession();
  const store = useStore();
  const router = useRouter();

  const { jsonData, mutations, heatHomeStore, heatHomeCalcStore } =
    useHeatHome();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

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
        area: heatHomeStore.areaToHeat,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        cost: jsonData.grubosciOcieplenia[heatHomeStore.heatThickness!],
      });
  }, [heatHomeStore.areaToHeat, heatHomeStore.heatThickness]);
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
        officeFee: sessionData?.user.feePerkwHeatHome,
        constantFee: sessionData.user.imposedFeeHeatHome,
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

  useEffect(() => {
    mutations.setFinallCost({
      dotationValue: heatHomeCalcStore.dotationValue,
      totalCost: heatHomeCalcStore.totalCost.gross,
    });
  }, [heatHomeCalcStore.totalCost, heatHomeCalcStore.dotationValue]);

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
              <SelectComponent
                title="GRUBOŚĆ OCIEPLENIA"
                onChange={(e) =>
                  store.updateHeatHome("heatThickness", String(e))
                }
                value={heatHomeStore.heatThickness}
                data={[
                  { label: "15 cm", value: "cm_15" },
                  { label: "20 cm", value: "cm_20" },
                  { label: "25 cm", value: "cm_25" },
                ]}
                smallField
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
                title="ŁĄCZNA DŁUGOŚĆ PARAPETÓW (MB)"
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
                title="TYNK AKRYLOWY (M²)"
                onChange={(e) =>
                  store.updateHeatHome("plasterArea", e.target.valueAsNumber)
                }
                step={1}
                value={heatHomeStore.plasterArea}
              />
              <InputComponent
                title="WYKOŃCZENIE GÓRNE (ATTICA/OGNIOMUR)"
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
