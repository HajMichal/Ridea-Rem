import { useSession } from "next-auth/react";
import React from "react";

const account = () => {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen w-screen items-start justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mt-40 flex flex-col justify-center p-4">
        <h1 className="mb-4 text-xl font-medium text-white">
          Stwórz nowe konto
        </h1>
        <form className="flex w-min max-w-[350px] flex-wrap justify-center gap-3">
          <input type="text" placeholder="Imię" className="p-1" />
          <input type="text" placeholder="Login" className="p-1" />
          <input type="text" placeholder="Hasło" className="p-1" />
          {session?.user.role === 1 && (
            <>
              <label htmlFor="role" className="w-full text-center text-white">
                Ranga
              </label>
              <div className="flex gap-1">
                <label htmlFor="role" className="text-white">
                  Menager
                </label>
                <input type="radio" name="role" />
              </div>
              <div className="flex gap-1">
                <input type="radio" name="role" />
                <label htmlFor="role" className="text-white">
                  Pracownik
                </label>
              </div>
            </>
          )}
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Stwórz
          </button>
        </form>
      </div>
    </div>
  );
};

export default account;
