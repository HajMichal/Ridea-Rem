import React from "react";
import { Navbar, SideBar } from "~/components";

const Prowizje = () => {
  return (
    <div className="flex h-full max-h-screen min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />
      <div className="flex max-h-screen w-full flex-wrap justify-center">
        <Navbar />;
      </div>
    </div>
  );
};

export default Prowizje;
