import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  CopperPipe,
  AirConditioner,
  CopperCable15,
  CopperCable16,
  Gutter,
  PipeConnector,
  ElasticPipe,
  Tape,
  WallPass,
  DashPump,
  Syfon,
  AirConditionerSupport,
} from "./formFields";
import DashPipe from "./formFields/DashPipe";
import { api } from "~/utils/api";

const AirConditionFormulas = () => {
  const { data: calcData } = api.airCondMenagerData.getSingle.useQuery();

  const { status } = useSession();
  const router = useRouter();

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
          <AirConditioner airConditionersData={calcData?.airConditioners} />
          <AirConditionerSupport
            price={calcData?.addons.airConditionerSupport}
          />
          <CopperPipe price={calcData?.addons["copperPipe1/4+3/8"]} />
          <CopperCable15 price={calcData?.addons["copperCable1/5"]} />
          <CopperCable16 price={calcData?.addons["copperCable1/6"]} />
          <DashPipe price={calcData?.addons.dashPipe} />
          <Gutter price={calcData?.addons.gutter} />
          <PipeConnector price={calcData?.addons.connector} />
          <ElasticPipe price={calcData?.addons.elasticPipe} />
          <Tape price={calcData?.addons.installationTape} />
          <WallPass price={calcData?.addons.wallHole} />
          <Syfon price={calcData?.addons.syfon} />
          <DashPump price={calcData?.addons.dashPump} />
        </div>
      </ScrollArea>
    </div>
  );
};
export default AirConditionFormulas;
