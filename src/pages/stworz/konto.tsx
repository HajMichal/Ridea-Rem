import { useForm, type SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";
import { Toaster, toast } from "react-hot-toast";

interface FormTypes {
  name: string;
  login: string;
  password: string;
  role: number;
}

const Account = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { mutate } = api.login.createAccount.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
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
    <div className="flex min-h-screen w-screen items-start justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Toaster />
      <div className="mt-40 flex flex-col justify-center p-4">
        <h1 className="mb-4 text-xl font-medium text-white">
          Stwórz nowe konto
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-min max-w-[350px] flex-wrap justify-center gap-3"
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
              <label htmlFor="role" className="w-full text-center text-white">
                Ranga
              </label>
              <div className="flex gap-1">
                <label htmlFor="role" className="text-white">
                  Menager
                </label>
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
                <label htmlFor="role" className="text-white">
                  Pracownik
                </label>
              </div>
            </>
          )}
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          >
            Stwórz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
