import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InputComponent, SelectComponent } from "~/components";
import { YESNO } from "~/constans/formsData";
import { useAirCondition } from "~/hooks/useAirCondition";
import { airConditionMapper } from "~/mappers/airCondition";
import useStore from "~/store";

const AirConditionFormulas = () => {
  const { jsonData, airConditionStore } = useAirCondition();
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const store = useStore();

  const airConditioners = jsonData?.airConditioner.map((item) => item.type);

  const updateAirConditioner = (airConditioner: string | null) => {
    const choosedAirConditioner = jsonData?.airConditioner.find(
      (item) => item.type === airConditioner && airConditionMapper(item)
    );
    if (!choosedAirConditioner) return;
    store.updateAirCondition("choosedAirConditioner", choosedAirConditioner);
  };

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [router, status]);
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
            onChange={(e) => updateAirConditioner(e)}
            value={airConditionStore.choosedAirConditioner?.type ?? null}
            data={airConditioners ? airConditioners : []}
          />
          <InputComponent
            title="RURA MIEDZIANA W OTULINIE"
            onChange={({ target }) =>
              store.updateAirCondition("copperPipeLen", target.valueAsNumber)
            }
            step={1}
            value={airConditionStore.copperPipeLen}
          />
          <InputComponent
            title="KABEL MIEDZIANY 3x1.5"
            onChange={(e) =>
              store.updateAirCondition("copperCableLen15", Number(e))
            }
            step={1}
            value={airConditionStore.copperCableLen15}
          />
          <InputComponent
            title="KABEL MIEDZIANY 3x1.6"
            onChange={(e) =>
              store.updateAirCondition("copperCableLen16", Number(e))
            }
            step={1}
            value={airConditionStore.copperCableLen16}
          />
          <InputComponent
            title="RURKA SKROPLIN"
            onChange={(e) => store.updateAirCondition("pipeDashLen", Number(e))}
            step={1}
            value={airConditionStore.pipeDashLen}
          />
          <InputComponent
            title="WSPORNIK KLIMATYZATORA"
            onChange={(e) =>
              store.updateAirCondition("airConditionerSupport", Number(e))
            }
            step={1}
            value={airConditionStore.airConditionerSupport}
          />
          <InputComponent
            title="KORYTO 8x6 mm"
            onChange={(e) => store.updateAirCondition("gutterLen", Number(e))}
            step={1}
            value={airConditionStore.gutterLen}
          />
          <InputComponent
            title="ŁĄCZNIK / KOLANO / ZAKOŃCZENIE"
            onChange={(e) =>
              store.updateAirCondition("pipeConnector", Number(e))
            }
            step={1}
            value={airConditionStore.pipeConnector}
          />
          <InputComponent
            title="RURA ELASTYCZNA fi50"
            onChange={(e) =>
              store.updateAirCondition("elasticPipeLen", Number(e))
            }
            step={1}
            value={airConditionStore.elasticPipeLen}
          />
          <InputComponent
            title="TAŚMA DO INSTALACJI"
            onChange={(e) => store.updateAirCondition("tape", Number(e))}
            step={1}
            value={airConditionStore.tape}
          />
          <InputComponent
            title="PRZEPUST ŚCIENNY"
            onChange={(e) => store.updateAirCondition("wallPass", Number(e))}
            step={1}
            value={airConditionStore.wallPass}
          />
          <SelectComponent
            title="SYFON (przyłączenie skroplin do kanalizacji)"
            onChange={(e) => store.updateAirCondition("syfon", e == "true")}
            value={airConditionStore.syfon}
            data={YESNO}
          />
          <SelectComponent
            title="POMPA SKROPLIN (w przypadku, gdy nie da sie odprowadzić ze skosem)"
            onChange={(e) => store.updateAirCondition("syfon", e == "true")}
            value={airConditionStore.dashPump}
            data={YESNO}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
export default AirConditionFormulas;
