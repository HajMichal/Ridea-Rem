import { PasswordInput, Radio, TextInput } from "@mantine/core";
import { type Session } from "next-auth";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

interface FormTypes {
  name: string;
  login: string;
  password: string;
  role: number;
}

export default function CreateAccountForm({
  sessionData,
}: {
  sessionData: Session | null;
}) {
  const { mutate: addMenagerPhotovoltaicData } =
    api.dataFlow.addNewMenager.useMutation({
      onSuccess(data) {
        toast.success(data.message, { duration: 4000 });
      },
    });
  const { mutate: addMenagerHeatPumpData } =
    api.heatPumpDataFlowRouter.addNewMenager.useMutation();
  const { mutate: addMenagerForCompany } =
    api.forCompanyDataFlowRouter.addNewMenager.useMutation();
  const { mutate: addMenagerHeatHome } =
    api.heatHomeDataFlowRouter.addNewMenager.useMutation();
  const { mutate: addMenagerAirCondition } =
    api.airConditionDataFlowRouter.addNewMenager.useMutation();

  const { mutate } = api.userDataHandling.createAccount.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      if (data.userRole === 2) {
        addMenagerPhotovoltaicData({
          userId: data.userId,
          userName: data.userName,
        });
        addMenagerHeatPumpData(data.userName);
        addMenagerForCompany(data.userName);
        addMenagerHeatHome(data.userName);
        addMenagerAirCondition(data.userName);
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
    <div className="-mt-5 flex w-full justify-center">
      <div className="flex w-3/5 max-w-sm flex-col gap-2 font-orkneyLight">
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
            <p className="-ml-1 w-full text-center">Rola</p>
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
          STWÓRZ KONTO
        </button>
      </div>
      <Toaster />
    </div>
  );
}
