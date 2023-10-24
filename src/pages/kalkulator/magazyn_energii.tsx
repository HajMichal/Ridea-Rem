import React from "react";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";

const Magazyn_energii = () => {
  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney laptop:justify-center">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="p-20 text-5xl text-dark">
          W Budowie...
          <br />
          Wkrótce dostępne!
        </div>
      </div>
    </main>
  );
};

export default Magazyn_energii;
