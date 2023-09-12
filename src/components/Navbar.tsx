import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface LinkComponentType {
  href: string;
  title: string;
}

const LinkComponent = ({ href, title }: LinkComponentType) => {
  return (
    <div className="group -mb-1">
      <div className="flex h-[60%] items-center text-dark laptop:px-4">
        <Link href={href}>{title}</Link>
      </div>
      <span className="mt-1 block h-[2px] w-full max-w-0 bg-brand transition-all duration-500 group-hover:max-w-full"></span>
    </div>
  );
};

export const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="h-fit w-full">
      <div className="flex h-[105px] w-full items-center justify-between gap-5 bg-white px-2 font-orkneyLight text-sm font-semibold">
        <div className="flex h-full w-full max-w-[800px] items-center justify-evenly gap-3 text-center laptop:gap-0 ">
          <LinkComponent href="/" title="KALKULACJA" />
          <LinkComponent href="/" title="AKTUALNOŚCI" />
          {sessionData?.user.role === 1 && (
            <LinkComponent
              href="/edycja/daneFotowoltaiki"
              title="EDYCJA DANYCH"
            />
          )}
          {sessionData?.user.role === 2 || sessionData?.user.role === 1 ? (
            <LinkComponent href="/edycja/prowizje" title="PROWIZJE" />
          ) : (
            ""
          )}
          {!(sessionData?.user.role === 3) && (
            <LinkComponent href="/stworz/konto" title="KONTA" />
          )}
        </div>
        <div className="">
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
};

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div>
      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData && (
          <div className="flex gap-1">
            <FaUserCircle className="h-[40px] w-[40px]" />
            <div className="flex max-w-[150px] flex-wrap font-orkneyLight font-semibold text-dark">
              <p className="min-w-[130px] text-left text-sm">
                {sessionData.user.name?.toUpperCase()}
              </p>
              <p className="text-xs">
                {sessionData.user.role === 1 && "ADMINISTRATOR"}
                {sessionData.user.role === 2 && "MENAGER"}
                {sessionData.user.role === 3 && "HANDLOWIEC"}
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
