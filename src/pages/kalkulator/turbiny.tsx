import { Overlay } from "@mantine/core";
import { Loading, Navbar, SideBar } from "~/components";
import { api } from "~/utils/api";

const Turbiny = () => {
  const { data: turbinesData } =
    api.turbinesDataFlowRouter.getCalcData.useQuery();

  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      {!turbinesData && (
        <>
          <Overlay color="#000" opacity={0.85} />
          <Loading />
        </>
      )}
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden"></div>
      </div>
    </main>
  );
};
export default Turbiny;
