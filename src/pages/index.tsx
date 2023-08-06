import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  api.dataFlow.downloadSQLiteFile.useQuery();
  return (
    <>
      <main>
        <div className="w-full bg-red-500">
          <Link href={"/kalkulator/fotowoltaika"}>Fotowoltaika</Link>
        </div>
        <div className="w-full bg-blue-500">
          <Link href={"/kalkulator/fotowoltaika_firmy"}>
            Fotowoltaika dla firm
          </Link>
        </div>
        <div className="w-full bg-green-500">
          <Link href={"/kalkulator/magazyn_energii"}>Pompy ciepła</Link>
        </div>
        <div className="w-full bg-yellow-500">
          <Link href={"/kalkulator/pompy_ciepla"}>Magazyn energii</Link>
        </div>
      </main>
    </>
  );
}
