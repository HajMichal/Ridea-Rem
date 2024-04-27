import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("~/components/navbar/Navbar"));
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
    <div className="h-screen w-screen overflow-hidden bg-[#E8E7E7] font-orkney">
      <Navbar />
      <div className="flex h-full w-full justify-center bg-[url(/login.png)] bg-cover">
        <div className="mt-10 h-full w-5/6 max-w-[700px] rounded-t-[60px] bg-white bg-opacity-90 p-10 shadow-sm ">
          <Logo
            isTitle
            title="DZIEŃ DOBRY!"
            subTitle="Tutaj stworzysz nowe konto!"
            className="w-auto lg:h-[10%] xl:h-[6vh]"
          />
          <CreateAccountForm sessionData={sessionData} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Account;
