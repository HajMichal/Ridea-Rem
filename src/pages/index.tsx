import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="font-orkney">
        <div className="w-full bg-red">
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
