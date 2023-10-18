import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getProviders, signIn, useSession } from "next-auth/react";
import { type GetServerSideProps } from "next";
import { TextInput, PasswordInput, Checkbox } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";

interface FormTypes {
  login: string;
  password: string;
}

export default function Signin() {
  const [error, setError] = useState<string>();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormTypes>({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormTypes> = async (data) => {
    const res = await signIn("credentials", {
      login: data.login,
      password: data.password,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    else if (res?.ok) await router.push("/home");
  };

  useEffect(() => {
    if (sessionData !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/home");
    }
  }, [sessionData, router]);

  return (
    <div className="grid h-screen w-screen bg-[#E8E7E7] font-orkney laptop:grid-cols-2">
      <div className="flex h-screen items-center justify-between">
        <div className="h-[90%] w-5/6  rounded-r-[60px] bg-white p-10 shadow-sm">
          <div className="flex w-full items-center justify-center ">
            <Image
              src={"/logo_solo_color.svg"}
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-3/5 max-w-sm flex-col gap-5 font-orkneyLight"
            >
              <TextInput
                {...register("login", { required: true })}
                maw={620}
                label="Login"
                onChange={() => {
                  error === "Invalid Credentials" && setError("");
                }}
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
                {...register("password", { required: true })}
                maw={620}
                label="Hasło"
                onChange={() => {
                  error === "Invalid Password" && setError("");
                }}
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
              <Checkbox label="Zapamiętaj mnie" color="dark" />
              <button className="rounded-full bg-brand p-3 font-orkneyBold">
                ZALOGUJ SIĘ
              </button>
            </form>
          </div>
          <div className="mt-10 flex w-full items-end justify-center p-5 font-orkneyBold xl:mt-32">
            <h2>IDEA REM © 2023</h2>
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
