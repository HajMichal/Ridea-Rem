import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  ConstructionType,
  Phases,
  RoofCoverage,
  RoofPitch,
} from "./formFields";

const TechDataPoll = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="flex w-full justify-center">
      <Modal
        opened={opened}
        onClose={close}
        title="ANKIETA DANE TECHNICZNE"
        size={"lg"}
        styles={{
          title: {
            width: "100%",
            textAlign: "center",
          },
        }}
      >
        <div className="px-10 py-5">
          <Phases />
          <ConstructionType />
          <RoofCoverage />
          <RoofPitch />
        </div>
      </Modal>
      <Button
        color={"green"}
        className="mt-16 bg-brand duration-100"
        onClick={open}
      >
        DANE TECHNICZNE - ANKIETA
      </Button>
    </div>
  );
};
export default TechDataPoll;
