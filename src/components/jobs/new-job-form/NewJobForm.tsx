import { JobPriority } from "@prisma/client";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { Select } from "components/shared/select/Select";
import { TextArea } from "components/shared/textarea/TextArea";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { capitalize } from "utils/capitalize";
import type { RouterInputs } from "utils/trpc";
import { trpc } from "utils/trpc";
import useFormPersist from "react-hook-form-persist";

type Values = RouterInputs["jobs"]["createNew"];

const STORAGE_KEY = "new-job";

export const NewJobForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<Values>();
  const { handleDialogClose } = useDialogStore();
  const utils = trpc.useContext();

  const submit = trpc.jobs.createNew.useMutation({
    onSuccess: () => {
      handleDialogClose();
      utils.jobs.invalidate();
      toast.success("Job created successfully");
    },
  });

  useFormPersist(STORAGE_KEY, {
    watch,
    setValue,
    storage: window.sessionStorage,
  });

  const onSubmit = async (values: Values) => {
    values.salary = 100000;
    await submit.mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="border-b border-neutral-800 pt-2 pb-4">
        <Input
          label="Title"
          type="text"
          {...register("title")}
          placeholder="Enter a title..."
        />
      </div>

      <TextArea
        {...register("description")}
        label="Description"
        placeholder="Enter a description..."
      />

      <div className="grid grid-cols-3 gap-2">
        <Select label="Office Type" {...register("office_type")}>
          <Select.Option label="Remote" value="remote" />
          <Select.Option label="In-Office" value="office" />
        </Select>

        <Select label="Priority" {...register("priority")}>
          {Object.entries(JobPriority).map(([key, level]) => {
            return (
              <Select.Option
                key={key}
                value={level}
                label={capitalize(level)}
              />
            );
          })}
        </Select>

        <Input
          type="date"
          {...register("due_date", { valueAsDate: true })}
          label="Due Date"
          placeholder="Enter a due date..."
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <Button type="submit" disabled={submit.isLoading}>
        {submit.isLoading ? "Loading" : "Submit"}
      </Button>
    </form>
  );
};
