import React from "react";
import { getProviders } from "next-auth/react";
import { type GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import LoginForm from "~/components/loginPage/LoginForm";

const Logo = dynamic(() => import("~/components/Logo"));
const Footer = dynamic(() => import("~/components/Footer"));
const ImageTile = dynamic(() => import("~/components/loginPage/ImageTile"));

export default function Signin() {
  return (
    <div className="grid h-screen w-screen bg-[#E8E7E7] font-orkney laptop:grid-cols-2">
      <div className="flex h-screen items-center justify-between">
        <div className="h-[90%] w-5/6 rounded-r-[60px] bg-white p-10 pt-[13vh] shadow-sm">
          <Logo
            isTitle
            title="DZIEŃ DOBRY!"
            subTitle="Wprowadź dane do swojego konta!"
          />
          <LoginForm />
          <Footer />
        </div>
      </div>
      <ImageTile />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
