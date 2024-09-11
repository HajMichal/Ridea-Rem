import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineAddchart } from "react-icons/md";
import { ChangeDataInputComponent } from "~/components";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { type TurbineCalcData } from "~/server/api/routers/turbines/interfaces";
import { api } from "~/utils/api";

interface Props {
  data: TurbineCalcData;
}
const EditionForm = ({ data }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate } = api.turbinesDataFlowRouter.editCalcData.useMutation({
    onSuccess: () => {
      toast.success("Dane zostały pomyślnie zmienione.");
    },
    onError: (err) => {
      console.log(err);
      toast.error("UWAGA BŁĄD! Dane nie zostały zmienione. Spróbuj ponownie.");
    },
  });

  const { register, handleSubmit } = useForm<TurbineCalcData>();

  const onSubmit: SubmitHandler<TurbineCalcData> = (formData) => {
    mutate({ ...formData, userId: data.userId });
    close();
  };

  return (
    <>
      <h1 className="w-full pt-14 text-center">{data.userName}</h1>
      <form className="flex w-full flex-col gap-10 pb-20 pt-3">
        <article>
          <h2 className="mt-5 w-full text-center text-3xl">TURBINY</h2>
          {Object.entries(data.turbines).map(([key, value]) => {
            return (
              <ChangeDataInputComponent
                key={key}
                {...register(`turbines[${key}]` as keyof typeof data, {
                  valueAsNumber: true,
                })}
                title={key}
                defaultValue={value}
              />
            );
          })}
        </article>
        <article>
          <h2 className="mt-5 w-full text-center text-3xl">KOSZTY DODATKOWE</h2>
          {Object.entries(data.addons).map(([key, value]) => {
            if (typeof value === "object") return null;
            return (
              <ChangeDataInputComponent
                key={key}
                {...register(`addons[${key}]` as keyof typeof data, {
                  valueAsNumber: true,
                })}
                title={key}
                defaultValue={value}
              />
            );
          })}
        </article>
        <article>
          <h2 className="mt-5 w-full text-center text-3xl">MASZT STALOWY</h2>
          {Object.entries(data.addons.stalowy).map(([key, value]) => {
            return (
              <ChangeDataInputComponent
                key={key}
                {...register(`addons.stalowy[${key}]` as keyof typeof data, {
                  valueAsNumber: true,
                })}
                title={key + " " + "metry/ów"}
                defaultValue={value}
              />
            );
          })}
        </article>
        <article>
          <h2 className="mt-5 w-full text-center text-3xl">MAGAZYN ENERGII</h2>
          {Object.entries(data.energyStore).map(([key, value]) => {
            if (typeof value === "object") return null;
            return (
              <ChangeDataInputComponent
                key={key}
                {...register(`energyStore[${key}]` as keyof typeof data, {
                  valueAsNumber: true,
                })}
                title={key}
                defaultValue={value}
              />
            );
          })}
        </article>
        <article>
          <h2 className="mt-5 w-full text-center text-xl">POJEMNOŚĆ BATERII</h2>
          {Object.entries(data.energyStore.battery).map(([key, value]) => {
            return (
              <ChangeDataInputComponent
                key={key}
                {...register(
                  `energyStore.battery[${key}]` as keyof typeof data,
                  {
                    valueAsNumber: true,
                  }
                )}
                title={key}
                defaultValue={value}
              />
            );
          })}
        </article>
      </form>
      <div className="fixed bottom-10 right-56 flex flex-col gap-4">
        <Button
          onClick={open}
          size="md"
          radius="md"
          leftIcon={<MdOutlineAddchart size={18} />}
          className="bg-gradient-to-br from-dark to-blue-900 tracking-wider text-white duration-150 hover:bg-blend-hard-light hover:shadow-xl"
        >
          Zatwierdź
        </Button>
      </div>
      <ConfirmationModal
        title="CZY NA PEWNO CHCESZ ZAPISAĆ ZMIENIONE WARTOŚCI?"
        close={close}
        opened={opened}
        handleFunction={handleSubmit(onSubmit)}
        description="Będzie to skutkowało zmianami w bazie danych, przez co ceny nowych
        wyliczeń za instalację ulegną zmianie."
      />
    </>
  );
};
export default EditionForm;
