import { JobPriority } from "@prisma/client";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { TextArea } from "components/shared/textarea/TextArea";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { capitalize } from "utils/capitalize";
import type { RouterInputs } from "utils/trpc";
import { trpc } from "utils/trpc";
import useFormPersist from "react-hook-form-persist";
import { Listbox } from "components/shared/form/listbox/Listbox";

type Values = RouterInputs["jobs"]["createNew"];

const STORAGE_KEY = "newJob";

export const NewJobForm = () => {
  const { register, handleSubmit, watch, setValue, control } =
    useForm<Values>();
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

      <div className="grid grid-cols-2 gap-2">
        <Controller
          control={control}
          name="office_type"
          render={({ field }) => (
            <Listbox label="Office Type" {...field}>
              <Listbox.Option label="Remote" value="remote" />
              <Listbox.Option label="In-Office" value="in-office" />
            </Listbox>
          )}
        />

        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Listbox label="Priority" {...field}>
              {Object.entries(JobPriority).map(([key, level]) => {
                return (
                  <Listbox.Option
                    key={key}
                    label={capitalize(key)}
                    value={level}
                  />
                );
              })}
            </Listbox>
          )}
        />
      </div>
      <Button
        type="submit"
        disabled={submit.isLoading}
        className="mr-0 ml-auto"
      >
        {submit.isLoading ? "Loading" : "Submit"}
      </Button>
    </form>
  );
};
