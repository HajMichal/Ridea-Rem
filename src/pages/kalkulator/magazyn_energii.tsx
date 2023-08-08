import React from "react";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";

const Magazyn_energii = () => {
  return (
    <main className="flex h-full min-h-screen justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <SideBar />
      <div className="w-full">
        <Navbar />
      </div>
    </main>
  );
};

export default Magazyn_energii;
