import React from "react";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";

const Pompy_ciepla = () => {
  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
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

export default Pompy_ciepla;
