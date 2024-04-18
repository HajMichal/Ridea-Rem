import { useForm, type SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { PasswordInput, Radio, TextInput } from "@mantine/core";
import { Navbar } from "~/components";

interface FormTypes {
  name: string;
  login: string;
  password: string;
  role: number;
}

const Account = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
    if (status === "authenticated") {
      if (sessionData?.user.role === 3) void router.push("/auth/signin");
    }
  }, [sessionData, router, status]);

  const { mutate: addMenagerPhotovoltaicData } =
    api.dataFlow.addNewMenager.useMutation({
      onSuccess(data) {
        toast.success(data!.message, { duration: 4000 });
      },
    });
  const { mutate: addMenagerHeatPumpData } =
    api.heatPumpDataFlowRouter.addNewMenager.useMutation();
  const { mutate: addMenagerForCompany } =
    api.forCompanyDataFlowRouter.addNewMenager.useMutation();
  const { mutate: addMenagerHeatHome } =
    api.heatHomeDataFlowRouter.addNewMenager.useMutation();

  const { mutate } = api.userDataHandling.createAccount.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      if (data.userRole === 2) {
        addMenagerPhotovoltaicData(data.userName);
        addMenagerHeatPumpData(data.userName);
        addMenagerForCompany(data.userName);
        addMenagerHeatHome(data.userName);
      }
      toast.success(`Konto zostało utworzone dla ${data.userName}`);
      reset();
    },
  });

  const { register, handleSubmit, reset } = useForm<FormTypes>({
    defaultValues: {
      login: "",
      name: "",
      password: "",
      role: 3,
    },
  });

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    if (sessionData?.user.id) {
      mutate({
        login: data.login,
        name: data.name,
        password: data.password,
        role: Number(data.role),
        parentId: sessionData.user.id,
      });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#E8E7E7] font-orkney">
      <Navbar />
      <div className="flex h-full w-full justify-center bg-[url(/login.png)] bg-cover">
        <div className="mt-10 h-fit w-5/6 max-w-[700px] rounded-[60px] bg-white bg-opacity-90 p-10 shadow-sm ">
          <div className="flex w-full items-center justify-center ">
            <Image
              src={"/icons/logo_solo_color.svg"}
              alt="Logo"
              width={80}
              height={80}
              className="lg:h-[10%] lg:w-[10%] xl:h-1/6 xl:w-1/6"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-3 p-10">
            <h1 className="font-orkneyBold font-extrabold laptop:text-xl xl:text-3xl">
              DZIEŃ DOBRY!
            </h1>
            <h3 className="text-xl">Tutaj stworzysz nowe konto!</h3>
          </div>
          <div className="-mt-5 flex w-full justify-center">
            <div className="flex w-3/5 max-w-sm flex-col gap-5 font-orkneyLight">
              <TextInput
                {...register("name", { required: true })}
                autoComplete={"off"}
                placeholder="Wpisz tutaj..."
                className="p-1"
                label="Imię"
                maw={620}
                styles={{
                  label: {
                    font: "inherit",
                  },
                }}
              />
              <TextInput
                {...register("login", { required: true })}
                autoComplete={"off"}
                placeholder="Wpisz tutaj..."
                className="p-1"
                label="Login"
                maw={620}
                styles={{
                  label: {
                    font: "inherit",
                  },
                }}
              />
              <PasswordInput
                {...register("password", { required: true })}
                autoComplete={"off"}
                type="password"
                placeholder="Wpisz tutaj..."
                className="p-1"
                label="Hasło"
                maw={620}
                styles={{
                  label: {
                    font: "inherit",
                  },
                  visibilityToggle: {
                    color: "#303030",
                  },
                }}
              />
              {sessionData?.user.role === 1 && (
                <>
                  <p className="-mb-3 w-full text-center">Ranga</p>
                  <div className="flex justify-center gap-10">
                    <div className="flex gap-1">
                      <Radio
                        {...register("role", { required: true })}
                        name="role"
                        value={2}
                        labelPosition="left"
                        label="Menager"
                      />
                    </div>
                    <div className="flex gap-1">
                      <Radio
                        {...register("role", { required: true })}
                        name="role"
                        value={3}
                        defaultChecked
                        label="Pracownik"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleSubmit(onSubmit)}
                className="mt-4 rounded-full bg-brand p-3 font-orkneyBold"
              >
                ZALOGUJ SIĘ
              </button>
            </div>
          </div>
          <div className="mt-10 flex w-full items-end justify-center p-5 font-orkneyBold xl:mt-20">
            <h2>IDEA REM © 2024</h2>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Account;
