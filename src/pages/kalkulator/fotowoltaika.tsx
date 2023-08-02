import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Fotowoltaika = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [state, setState] = useState<{ imie: string }>({ imie: "" });
  const { mutate } = api.dataFlow.setJSONFile.useMutation();
  api.dataFlow.downloadFile.useQuery();

  const { mutate: setSQL } = api.dataFlow.setSQLiteFile.useMutation();
  api.dataFlow.downloadSQLiteFile.useQuery();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/api/auth/signin");
    }
  }, [sessionData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <input
          type="text"
          name="imie"
          onChange={(e) => setState({ imie: e.target.value })}
        />
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => mutate(state)}
        >
          Set File
        </button>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => setSQL()}
        >
          Set SQL
        </button>
        <Link
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          href={"/create/account"}
        >
          Create account
        </Link>
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </div>
    </main>
  );
};

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

export default Fotowoltaika;
