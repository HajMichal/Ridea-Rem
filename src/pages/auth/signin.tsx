import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { type GetServerSideProps } from "next";
import { TextInput, PasswordInput } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";

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
          <div className="flex w-full items-center justify-center ">
            <Image
              src={"/icons/logo_solo_color.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="h-1/6 w-1/6"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-3 p-10">
            <h1 className="font-orkneyBold font-extrabold xl:text-5xl">
              DZIEŃ DOBRY!
            </h1>
            <h3 className="xl:text-xl">Wprowadź dane logowania</h3>
          </div>
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
          <div className="mt-10 flex w-full items-end justify-center p-5 font-orkneyBold xl:mt-32">
            <h2>IDEA REM © 2024</h2>
          </div>
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
