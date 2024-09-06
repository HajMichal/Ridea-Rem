import { Button, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { BsBuildingFillGear } from "react-icons/bs";
import { useState } from "react";

interface AddElementType {
  name: string;
  price: number;
}

export const AddElement = () => {
  const [element, setElement] = useState("boilers");
  const ctx = api.useContext();
  const [opened, { open, close }] = useDisclosure(false);
  const { register, handleSubmit, reset } = useForm<AddElementType>();

  const { mutate } = api.dataFlow.addNewElement.useMutation({
    onSuccess: async () => {
      await ctx.dataFlow.getAllPvCalcs.invalidate();
      toast.success("Element został dodany");
    },
    onError: () => {
      toast.error(
        "Nastąpił nieoczekiwany błąd podczas dodawania nowego elemenetu instalacjii PV. Spróbuj ponownie!"
      );
    },
  });

  const onSubmit: SubmitHandler<AddElementType> = (data) => {
    mutate({ ...data, element: element });
    reset();
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        size="md"
        radius="md"
        className="bg-gradient-to-br from-dark to-blue-900 text-white duration-150 hover:bg-blend-hard-light hover:shadow-lg"
        leftIcon={<BsBuildingFillGear size={14} />}
      >
        Dodaj Element
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Dodaj nowy element do bazy danych"
        className="text-center font-orkneyBold"
      >
        <form className="flex w-full flex-col gap-3">
          <Select
            label="Element, który chcesz dodać"
            autoComplete={"off"}
            value={element}
            onChange={(e: string) => setElement(e)}
            data={[
              { label: "Zbiornik CWU", value: "boilers" },
              { label: "Magazyn energii", value: "energyStore" },
            ]}
          />

          <TextInput
            {...register("name", { required: true })}
            label="Nazwa"
            autoComplete={"off"}
            className="flex flex-col font-orkneyBold"
          />

          <TextInput
            {...register("price", { valueAsNumber: true, required: true })}
            label="Cena"
            autoComplete="off"
            defaultValue={0}
            className="flex flex-col font-orkneyBold"
          />
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
