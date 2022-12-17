import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/button/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { RouterInputs } from "utils/trpc";
import { trpc } from "utils/trpc";

type Values = RouterInputs["jobs"]["createNew"];

export const NewJob = () => {
  const { register, handleSubmit } = useForm<Values>();
  const { handleDialogClose } = useDialogStore();
  const utils = trpc.useContext();

  const submit = trpc.jobs.createNew.useMutation({
    onSuccess: () => {
      toast.success("Job created successfully");
      handleDialogClose();
      utils.jobs.invalidate();
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("title")} placeholder="Title" />
      <input type="number" {...register("salary")} placeholder="0000" />
      <input type="text" {...register("office_type")} placeholder="Remote" />
      <textarea {...register("description")} placeholder="Description" />
      <Button type="submit" disabled={submit.isLoading}>
        {submit.isLoading ? "Loading" : "Submit"}
      </Button>
    </form>
  );
};
