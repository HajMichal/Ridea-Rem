import { Button, TextInput, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

interface AddPumpType {
  name: string;
  price: number;
  fee: number;
}

export const AddNewHeatPump = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const { register, handleSubmit, reset } = useForm<AddPumpType>();
  const ctx = api.useContext();

  const { mutate } = api.heatPumpDataFlowRouter.addNewHeatPump.useMutation({
    onSuccess: async () => {
      toast.success("Pompa została pomyślnie dodana");
      await ctx.heatPumpDataFlowRouter.downloadEntireJsonFile.invalidate();
    },
    onError: () => {
      toast.error(
        "Nastąpił nieoczekiwany błąd podczas dodawania nowej pompy ciepła. Spróbuj ponownie później"
      );
    },
  });

  const onSubmit: SubmitHandler<AddPumpType> = (data) => {
    mutate(data);
    reset();
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        variant="outline"
        color="lime"
        size="md"
        radius="md"
        className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white duration-150 hover:scale-110 hover:shadow-lg"
      >
        Dodaj
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="DODAJ NOWĄ POMPĘ CIEPŁA"
        className="text-center font-orkneyBold"
      >
        <form className="flex w-full flex-col gap-3">
          <TextInput
            {...register("name", { required: true })}
            label="Nazwa"
            autoComplete={"off"}
            className="flex flex-col font-orkneyBold"
          />
          <div className="flex gap-5">
            <TextInput
              {...register("price", { valueAsNumber: true, required: true })}
              label="Cena"
              autoComplete="off"
              className="flex flex-col font-orkneyBold"
            />
            <TextInput
              {...register("fee", { valueAsNumber: true, required: true })}
              label="Mnożnik prowizji"
              autoComplete="off"
              className="flex flex-col font-orkneyBold"
            />
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="outline"
            color="lime"
            size="md"
            radius="md"
            className="mt-5 w-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white"
          >
            Dodaj
          </Button>
        </form>
      </Modal>
    </>
  );
};
