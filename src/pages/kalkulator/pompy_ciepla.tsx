import { ScrollArea } from "@mantine/core";
import React from "react";
import { InputComponent, SelectComponent } from "~/components";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { useHeatPump } from "~/hooks/useHeatPump";
import useStore from "~/store";

const Pompy_ciepla = () => {
  const store = useStore();
  // const {  } =
  //   useHeatPump();

  const yesNoData = [
    { value: "true", label: "Tak" },
    { value: "false", label: "Nie" },
  ];
  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="flex h-full max-h-[90vw] flex-wrap justify-center overflow-scroll p-4 laptop:overflow-hidden">
          <div id="FORM" className="h-full w-[55%] min-w-[500px] p-3 ">
            <h1
              style={{ textShadow: " 24px 24px #bebebe" }}
              className="z-50 mb-10 font-orkneyBold text-5xl"
            >
              POMPA CIEPŁA
            </h1>
            <ScrollArea h={"78%"}>
              {/* <SelectComponent
                  title="DUŻE PRZESZKLENIA"
                  onChange={(e) =>
                    store.updatePhotovoltaic("voucher", e == "true")
                  }
                  // value={photovoltaicStore.voucher}
                  data={yesNoData}
                /> */}
            </ScrollArea>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pompy_ciepla;
