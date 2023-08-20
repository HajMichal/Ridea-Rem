import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="w-full">
      <div className="flex h-16 w-full gap-5 bg-white">
        <div className="">
          <AuthShowcase />
        </div>
        <div className="text-black">
          <Link href={"/stworz/konto"}>Stworz konto</Link>
        </div>
        <div className="text-black">
          <Link href={"/edycja/daneFotowoltaiki"}>Edycja Wartosci</Link>
        </div>
        <div className="text-black">opcja 3</div>
        <div className="text-black">opcja 4</div>
      </div>
    </div>
  );
};

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="">
      <button
        className=""
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
