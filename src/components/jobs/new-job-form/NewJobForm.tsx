import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { Select } from "components/shared/select/Select";
import { TextArea } from "components/shared/textarea/TextArea";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { formatCurrency } from "utils/format-currency";
import type { RouterInputs } from "utils/trpc";
import { trpc } from "utils/trpc";

type Values = RouterInputs["jobs"]["createNew"];

export const NewJobForm = () => {
  const { register, handleSubmit } = useForm<Values>();
  const { handleDialogClose } = useDialogStore();
  const utils = trpc.useContext();

  const submit = trpc.jobs.createNew.useMutation({
    onSuccess: () => {
      utils.jobs.invalidate();
      toast.success("Job created successfully");
      handleDialogClose();
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input type="text" {...register("title")} label="Title" />
      <Input
        type="text"
        {...register("salary", { valueAsNumber: true })}
        label="Salary"
      />
      <Select label="Office Type" {...register("office_type")}>
        <Select.Option label="Remote" value="remote" />
        <Select.Option label="In-Office" value="office" />
      </Select>
      <TextArea {...register("description")} label="Description" />
      <Button type="submit" disabled={submit.isLoading}>
        {submit.isLoading ? "Loading" : "Submit"}
      </Button>
    </form>
  );
};
