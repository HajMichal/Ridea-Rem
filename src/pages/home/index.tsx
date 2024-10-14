import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LastPosts } from "~/components";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [status]);
  return (
    <div className="flex h-screen w-screen items-center bg-[url('/home/Fotowoltaika2.webp')] bg-cover">
      <div className="custom-shape absolute flex h-screen w-[400px] flex-col items-end gap-10 bg-dark py-10">
        <Image
          src={"/icons/newLogoGreen.svg"}
          alt="logo"
          width={200}
          height={61.19}
          className="mb-10 self-center"
          priority
        />
        <Link
          href="/kalkulator/fotowoltaika"
          className="rounded-l-full bg-brand p-2 pl-5 pr-28 font-orkney text-2xl duration-150 hover:-translate-x-10"
        >
          Fotowoltaika
        </Link>
        <Link
          href="/kalkulator/pompy_ciepla"
          className="rounded-l-full bg-brand p-2 pl-5 pr-36 font-orkney text-2xl duration-150 hover:-translate-x-10"
        >
          Pompy Ciepła
        </Link>
        <Link
          href="/kalkulator/klimatyzacja"
          className="rounded-l-full bg-brand p-2 pl-5 pr-44 font-orkney text-2xl duration-150 hover:-translate-x-10"
        >
          Klimatyzacja
        </Link>
        <Link
          href="/kalkulator/turbiny"
          className="rounded-l-full bg-brand p-2 pl-5 pr-48 font-orkney text-2xl duration-150 hover:-translate-x-10"
        >
          Turbiny
        </Link>
        <Link
          href="/pliki"
          className="rounded-l-full bg-brand p-2 pl-5 pr-52 font-orkney text-2xl duration-150 hover:-translate-x-10 xl:mt-[30%]"
        >
          Pliki
        </Link>
        {data?.user.role !== 3 && (
          <Link
            href="/edycja/prowizje"
            className="rounded-l-full bg-brand p-2 pl-5 pr-[200px] font-orkney text-2xl duration-150 hover:-translate-x-10"
          >
            Prowizje
          </Link>
        )}
      </div>
      <LastPosts />
    </div>
  );
}
