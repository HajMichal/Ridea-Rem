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
  menagers: string[];
}
const EditionForm = ({ data, menagers }: Props) => {
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
    </>
  );
};
export default EditionForm;
