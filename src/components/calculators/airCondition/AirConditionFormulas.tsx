import { ScrollArea } from "@mantine/core";
import { InputComponent, SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
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
          <InputComponent
            title="KABEL MIEDZIANY 3x1.5"
            onChange={(e) =>
              store.updateAirCondition("copperCableLen15", Number(e))
            }
            step={1}
            value={airConditionSlice.copperCableLen15}
          />
          <InputComponent
            title="KABEL MIEDZIANY 3x1.6"
            onChange={(e) =>
              store.updateAirCondition("copperCableLen16", Number(e))
            }
            step={1}
            value={airConditionSlice.copperCableLen16}
          />
          <InputComponent
            title="RURKA SKROPLIN"
            onChange={(e) => store.updateAirCondition("pipeDashLen", Number(e))}
            step={1}
            value={airConditionSlice.pipeDashLen}
          />
          <InputComponent
            title="WSPORNIK KLIMATYZATORA"
            onChange={(e) =>
              store.updateAirCondition("airConditionerSupport", Number(e))
            }
            step={1}
            value={airConditionSlice.airConditionerSupport}
          />
          <InputComponent
            title="KORYTO 8x6 mm"
            onChange={(e) => store.updateAirCondition("gutterLen", Number(e))}
            step={1}
            value={airConditionSlice.gutterLen}
          />
          <InputComponent
            title="ŁĄCZNIK / KOLANO / ZAKOŃCZENIE"
            onChange={(e) =>
              store.updateAirCondition("pipeConnector", Number(e))
            }
            step={1}
            value={airConditionSlice.pipeConnector}
          />
          <InputComponent
            title="RURA ELASTYCZNA fi50"
            onChange={(e) =>
              store.updateAirCondition("elasticPipeLen", Number(e))
            }
            step={1}
            value={airConditionSlice.elasticPipeLen}
          />
          <InputComponent
            title="TAŚMA DO INSTALACJI"
            onChange={(e) => store.updateAirCondition("tape", Number(e))}
            step={1}
            value={airConditionSlice.tape}
          />
          <InputComponent
            title="PRZEPUST ŚCIENNY"
            onChange={(e) => store.updateAirCondition("wallPass", Number(e))}
            step={1}
            value={airConditionSlice.wallPass}
          />
          <SelectComponent
            title="SYFON (przyłączenie skroplin do kanalizacji)"
            onChange={(e) => store.updateAirCondition("syfon", e == "true")}
            value={airConditionSlice.syfon}
            data={YESNO}
          />
          <SelectComponent
            title="POMPA SKROPLIN (w przypadku, gdy nie da sie odprowadzić ze skosem)"
            onChange={(e) => store.updateAirCondition("syfon", e == "true")}
            value={airConditionSlice.dashPump}
            data={YESNO}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
export default AirConditionFormulas;
