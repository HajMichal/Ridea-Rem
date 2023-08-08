import React from "react";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="flex h-full min-h-screen w-auto flex-col gap-3 bg-gray-400">
      <div className="mt-20 flex flex-col gap-3">
        <Link href={"/kalkulator/fotowoltaika"}>Fotowoltaika</Link>
        <Link href={"/kalkulator/pompy_ciepla"}>Pompy ciepła</Link>
        <Link href={"/kalkulator/fotowoltaika_firmy"}>
          Fotowoltaika dla firm
        </Link>
        <Link href={"/kalkulator/magazyn_energii"}>Magazyn energii</Link>
      </div>
    </div>
  );
};
