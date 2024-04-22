import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { type GetServerSideProps } from "next";
import { TextInput, PasswordInput } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Logo = dynamic(() => import("~/components/Logo"));
const Footer = dynamic(() => import("~/components/Footer"));

export default function Signin() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  const onSubmit = async () => {
    const res = await signIn("credentials", {
      login: userData.login,
      password: userData.password,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    else if (res?.ok) {
      await router.push("/home");
    }
  };

  return (
    <div className="grid h-screen w-screen bg-[#E8E7E7] font-orkney laptop:grid-cols-2">
      <div className="flex h-screen items-center justify-between">
        <div className="h-[90%] w-5/6  rounded-r-[60px] bg-white p-10 shadow-sm">
          <Logo
            isTitle
            title="DZIEŃ DOBRY!"
            subTitle="Tutaj stworzysz nowe konto!"
            className="lg:h-[10%] lg:w-[10%] xl:h-1/6 xl:w-1/6"
          />
          <div className="flex w-full justify-center">
            <div className="flex w-3/5 max-w-sm flex-col gap-5 font-orkneyLight">
              <TextInput
                maw={620}
                label="Login"
                onChange={(e) =>
                  setUserData({
                    login: e.target.value,
                    password: userData.password,
                  })
                }
                styles={{
                  input: {
                    borderTop: 0,
                    borderRight: 0,
                    borderLeft: 0,
                    borderRadius: 0,
                    borderColor: "#303030",
                    borderWidth: 2,
                  },
                  label: {
                    font: "inherit",
                  },
                }}
                error={
                  error === "Invalid Credentials" &&
                  "Nie prawidłowy login, spróbuj ponownie"
                }
              />
              <PasswordInput
                maw={620}
                label="Hasło"
                onChange={(e) =>
                  setUserData({
                    login: userData.login,
                    password: e.target.value,
                  })
                }
                styles={{
                  input: {
                    borderTop: 0,
                    borderRight: 0,
                    borderLeft: 0,
                    borderRadius: 0,
                    borderColor: "#303030",
                    borderWidth: 2,
                  },
                  label: {
                    font: "inherit",
                  },
                  visibilityToggle: {
                    color: "#303030",
                  },
                }}
                error={
                  error === "Invalid Password" &&
                  "Nie prawidłowe hasło, spróbuj ponownie"
                }
              />
              <button
                onClick={onSubmit}
                className="mt-4 rounded-full bg-brand p-3 font-orkneyBold"
              >
                ZALOGUJ SIĘ
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <div className="hidden h-screen items-center justify-center laptop:flex">
        <div className="z-20 flex h-[75%] w-full items-center rounded-l-[60px] bg-white shadow-sm xl:h-[85%] ">
          <Image
            src={"/login.png"}
            width={1170}
            height={780}
            alt="Instalacja fotowoltiaki"
            priority
            loading="eager"
            className="absolute right-0 h-auto  max-h-[730px] w-[60%] max-w-[1170px] rounded-l-[60px] xxl:max-h-[888px] xxl:max-w-[1582px]"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
