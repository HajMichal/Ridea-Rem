import { ScrollArea } from "@mantine/core";
import { InputComponent, SelectComponent } from "~/components";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

const AirConditionFormulas = () => {
  const store = useStore();
  const { jsonData, airConditionSlice } = useAirCondition();
  const airConditioners = jsonData?.airConditioner.map((item) => item.type);
  return (
    <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
      <h1
        style={{ textShadow: " 24px 24px #bebebe" }}
        className="z-50 mb-10 font-orkneyBold text-5xl font-semibold"
      >
        KLIMATYZACJA
      </h1>
      <ScrollArea h={"78%"}>
        <div className=" mr-4">
          <h2 className="font-orkneyBold">INSTALACJA</h2>
          <SelectComponent
            title="KLIMATYZATOR"
            onChange={(e) =>
              store.updateAirCondition("choosedAirCondition", String(e))
            }
            value={airConditionSlice.choosedAirCondition}
            data={airConditioners ? airConditioners : []}
          />
          <InputComponent
            title="RURA MIEDZIANA W OTULINIE"
            onChange={(e) =>
              store.updateAirCondition("copperPipeLength", Number(e))
            }
            step={1}
            value={airConditionSlice.copperPipeLen}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
export default AirConditionFormulas;
