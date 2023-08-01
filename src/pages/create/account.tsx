import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { api } from "~/utils/api";

interface FormTypes {
  name: string;
  login: string;
  password: string;
  role: number;
}

const account = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = api.login.createAccount.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const { register, handleSubmit } = useForm<FormTypes>({
    defaultValues: {
      login: "",
      name: "",
      password: "",
      role: 3,
    },
  });

  useEffect(() => {
    if (
      session?.user.role! === 3 ||
      session === undefined ||
      session === null
    ) {
      router.push("/");
    }
  }, [session]);

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    console.log(data);
    mutate({
      login: data.login,
      name: data.name,
      password: data.password,
      role: Number(data.role),
    });
  };

  return (
    <div className="flex min-h-screen w-screen items-start justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
          {session?.user.role === 1 && (
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

export default account;
