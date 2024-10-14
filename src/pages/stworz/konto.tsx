import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "~/components";

const Logo = dynamic(() => import("~/components/Logo"));
const Footer = dynamic(() => import("~/components/Footer"));
const CreateAccountForm = dynamic(
  () => import("~/components/createAccount/CreateAccountForm")
);
const Account = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
    if (status === "authenticated") {
      if (sessionData?.user.role === 3) void router.push("/auth/signin");
    }
  }, [sessionData, router, status]);

  return (
    <div className="h-full min-h-screen overflow-hidden">
      <Navbar />
      <div className="h-full min-h-screen w-screen bg-[url(/login.png)] bg-cover">
        <div className="flex h-full w-full justify-center ">
          <div className="mt-10 h-full w-5/6 max-w-[700px] rounded-[60px] bg-white bg-opacity-90 p-10 shadow-sm">
            <Logo
              isTitle
              title="DZIEŃ DOBRY!"
              subTitle="Tutaj stworzysz nowe konto!"
            />
            <CreateAccountForm sessionData={sessionData} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
