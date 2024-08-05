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
} from "./formFields";
import DashPipe from "./formFields/DashPipe";

const AirConditionFormulas = () => {
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
          <AirConditioner />
          <CopperPipe />
          <CopperCable15 />
          <CopperCable16 />
          <DashPipe />
          <Gutter />
          <PipeConnector />
          <ElasticPipe />
          <Tape />
          <WallPass />
          <Syfon />
          <DashPump />
        </div>
      </ScrollArea>
    </div>
  );
};
export default AirConditionFormulas;
