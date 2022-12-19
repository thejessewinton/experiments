import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { Select } from "components/shared/select/Select";
import { TextArea } from "components/shared/textarea/TextArea";
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
    <div className="rounded-md bg-neutral-900 p-4 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input type="text" {...register("title")} placeholder="Title" />
        <Input type="number" {...register("salary")} placeholder="0000" />
        <Input type="text" {...register("office_type")} placeholder="Remote" />
        <Select label="Office" />
        <TextArea {...register("description")} placeholder="Description" />
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
