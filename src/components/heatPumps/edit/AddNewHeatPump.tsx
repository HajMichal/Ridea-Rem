import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const AddNewHeatPump = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        onClick={open}
        variant="outline"
        color="lime"
        size="md"
        className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white duration-150 hover:scale-110 hover:shadow-lg"
        radius="md"
      >
        Dodaj
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="DODAJ NOWĄ POMPĘ CIEPŁA"
        className="text-center font-orkneyBold"
      ></Modal>
    </>
  );
};
