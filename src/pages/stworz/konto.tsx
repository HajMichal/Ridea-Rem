import { useForm, type SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { Toaster, toast } from "react-hot-toast";
import { SideBar, Navbar } from "~/components";

interface FormTypes {
  name: string;
  login: string;
  password: string;
  role: number;
}

const Account = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { mutate: addMenagerPhotovoltaicData } =
    api.dataFlow.addNewMenager.useMutation({
      onSuccess(data) {
        toast.success(data.message, { duration: 7000 });
      },
    });
  const { mutate: addMenagerHeatPumpData } =
    api.heatPumpDataFlowRouter.addNewMenager.useMutation({});
  const { mutate: addMenagerForCompany } =
    api.forCompanyDataFlowRouter.addNewMenager.useMutation({});
  const { mutate } = api.userDataHandling.createAccount.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      if (data.userRole === 2) {
        addMenagerPhotovoltaicData(data.userName);
        addMenagerHeatPumpData(data.userName);
        addMenagerForCompany(data.userName);
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

  useEffect(() => {
    if (sessionData?.user.role === 3) {
      void router.push("/");
    } else if (sessionData === null) {
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

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
    <div className="flex h-full max-h-screen min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />
      <Toaster />
      <div className="flex max-h-screen w-full flex-wrap justify-center">
        <Navbar />
        <div className="h-full max-h-[80%]">
          <h1 className="mb-4 w-full  text-center text-xl font-medium text-dark">
            Stwórz nowe konto
          </h1>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-min max-w-[350px] flex-wrap justify-center gap-3 text-dark"
            >
              <input
                {...register("name", { required: true })}
                autoComplete="false"
                placeholder="Imię"
                className="p-1"
              />
              <input
                {...register("login", { required: true })}
                autoComplete="false"
                placeholder="Login"
                className="p-1"
              />
              <input
                {...register("password", { required: true })}
                autoComplete="false"
                type="password"
                placeholder="Hasło"
                className="p-1"
              />
              {sessionData?.user.role === 1 && (
                <>
                  <label className="w-full text-center">Ranga</label>
                  <div className="flex gap-1">
                    <label htmlFor="role">Menager</label>
                    <input
                      {...register("role", { required: true })}
                      type="radio"
                      name="role"
                      value={2}
                    />
                  </div>
                  <div className="flex gap-1">
                    <input
                      {...register("role", { required: true })}
                      type="radio"
                      name="role"
                      value={3}
                    />
                    <label htmlFor="role">Pracownik</label>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="rounded-full bg-brand px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                Stwórz
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
