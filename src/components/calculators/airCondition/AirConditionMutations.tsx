import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { useAirCondition } from "~/hooks/useAirCondition";
import useStore from "~/store";

export function AirConditionMutations() {
  const store = useStore();
  const { jsonData, mutations, airConditionStore, airConditionCalcStore } =
    useAirCondition();

  const [debouncedAirCondStore] = useDebouncedValue(airConditionStore, 200);

  useEffect(() => {
    if (jsonData)
      mutations.setCopperPipePrice({
        quantity: debouncedAirCondStore.copperPipeLen,
        price: jsonData.addons["copperPipe1/4+3/8"],
      });
  }, [
    jsonData?.addons["copperPipe1/4+3/8"],
    debouncedAirCondStore.copperPipeLen,
  ]);
  useEffect(() => {
    if (jsonData)
      mutations.setCopperCable15Price({
        quantity: debouncedAirCondStore.copperCableLen15,
        price: jsonData.addons["copperCable1/5"],
      });
  }, [
    debouncedAirCondStore.copperCableLen15,
    jsonData?.addons["copperCable1/5"],
  ]);
  useEffect(() => {
    if (jsonData)
      mutations.setCopperCable16Price({
        quantity: debouncedAirCondStore.copperCableLen16,
        price: jsonData.addons["copperCable1/6"],
      });
  }, [
    debouncedAirCondStore.copperCableLen16,
    jsonData?.addons["copperCable1/6"],
  ]);
  useEffect(() => {
    if (jsonData)
      mutations.setDashPipePrice({
        quantity: debouncedAirCondStore.pipeDashLen,
        price: jsonData.addons.dashPipe,
      });
  }, [debouncedAirCondStore.pipeDashLen, jsonData?.addons.dashPipe]);
  useEffect(() => {
    if (jsonData)
      mutations.setAirConditionerSupportPrice({
        quantity: debouncedAirCondStore.airConditionerSupport,
        price: jsonData.addons.airConditionerSupport,
      });
  }, [
    debouncedAirCondStore.airConditionerSupport,
    jsonData?.addons.airConditionerSupport,
  ]);
  useEffect(() => {
    if (jsonData)
      mutations.setGutterPrice({
        quantity: debouncedAirCondStore.gutterLen,
        price: jsonData.addons.gutter,
      });
  }, [debouncedAirCondStore.gutterLen, jsonData?.addons.gutter]);
  useEffect(() => {
    if (jsonData)
      mutations.setPipeConnectorPrice({
        quantity: debouncedAirCondStore.pipeConnector,
        price: jsonData.addons.connector,
      });
  }, [debouncedAirCondStore.pipeConnector, jsonData?.addons.connector]);
  useEffect(() => {
    if (jsonData)
      mutations.setElasticPipePrice({
        quantity: debouncedAirCondStore.elasticPipeLen,
        price: jsonData.addons.elasticPipe,
      });
  }, [debouncedAirCondStore.elasticPipeLen, jsonData?.addons.elasticPipe]);
  useEffect(() => {
    if (jsonData)
      mutations.setTapePrice({
        quantity: debouncedAirCondStore.tape,
        price: jsonData.addons.installationTape,
      });
  }, [debouncedAirCondStore.tape, jsonData?.addons.installationTape]);
  useEffect(() => {
    if (jsonData)
      mutations.setWallPassPrice({
        quantity: debouncedAirCondStore.wallPass,
        price: jsonData.addons.wallHole,
      });
  }, [debouncedAirCondStore.wallPass, jsonData?.addons.wallHole]);
}
