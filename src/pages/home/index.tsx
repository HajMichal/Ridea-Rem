import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { urlify } from "~/components/newsPageComponent/FindUrl";
import CardDescription from "~/components/newsPageComponent/CardDescription";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  const { data: posts } = api.newsDataRouter.getLastPosts.useQuery();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [status]);
  return (
    // <main className="m-0 grid h-screen max-h-screen w-screen grid-cols-4 overflow-hidden hover:cursor-pointer">
    //   <HomeTile
    //     url={"/kalkulator/turbiny"}
    //     src={"/home/termomodernizacja.png"}
    //     iconSrc={"/home/icons/MagazynEnergiiIcon.svg"}
    //     color={"bg-[#FFE15D]"}
    //     title={"TURBINY"}
    //     subTitle={"WIATROWE"}
    //   />
    //   <HomeTile
    //     url={"/kalkulator/fotowoltaika"}
    //     iconSrc={"/home/icons/FotowoltaikaIcon.svg"}
    //     src={"/home/Fotowoltaika.png"}
    //     color={"bg-[#74B734]"}
    //     title={"PANELE"}
    //     subTitle={"FOTOWOLTAICZNE"}
    //   />
    //   <HomeTile
    //     url={"/kalkulator/pompy_ciepla"}
    //     src={"/home/Pompy_ciepla.png"}
    //     iconSrc={"/home/icons/PompaDoKalkulacji.svg"}
    //     color={"bg-[#731DD8]"}
    //     title={"POMPY"}
    //     subTitle={"CIEPŁA"}
    //   />
    //   <HomeTile
    //     url={"/kalkulator/klimatyzacja"}
    //     src={"/home/Foto_firm.png"}
    //     iconSrc={"/home/icons/PompaDoKalkulacji.svg"}
    //     color={"bg-[#00B4D8]"}
    //     title={"KLIMATYZACJA"}
    //     subTitle={""}
    //   />
    // </main>
    // <div>
    //   <div className="relative flex h-screen w-full justify-between bg-[url('/home/Fotowoltaika.png')] bg-cover px-14">
    //     <div className="flex h-1/2 w-1/6 min-w-[320px] -skew-x-12 flex-col justify-center gap-10 bg-brand bg-opacity-50">
    //       <button className="font-orkney text-4xl">Fotowoltaika</button>
    //       <button className="font-orkney text-4xl">Pompy Ciepła</button>
    //       <button className="font-orkney text-4xl">Klimatyzacja</button>
    //       <button className="font-orkney text-4xl">Turbiny</button>
    //     </div>
    //     <div className="h-2/3 w-1/2 self-center rounded-lg border-4 border-brand bg-white"></div>
    //   </div>
    // </div>
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

      <div className="hide-scroll-bar absolute right-10 h-4/5 w-1/2 max-w-2xl overflow-y-scroll rounded-xl border bg-slate-100 bg-opacity-80 p-3 shadow-2xl lg:w-1/3">
        <h1 className=" text-center font-orkney text-2xl">AKTUALNOŚCI</h1>
        <div className="h-auto w-full bg-cover p-2">
          {posts?.map((post) => {
            return (
              <div
                key={post.id}
                className="my-4 h-auto w-full rounded-l-lg rounded-tr-lg bg-white p-2"
              >
                <h1 className="text-xl">{urlify(post.title)}</h1>
                {post.description !== "" && (
                  <CardDescription
                    description={post.description}
                    title={post.title}
                    url={post.url}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
