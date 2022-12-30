import { JobPriority } from "@prisma/client";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { capitalize } from "utils/capitalize";
import type { RouterInputs } from "utils/trpc";
import { trpc } from "utils/trpc";
import useFormPersist from "react-hook-form-persist";
import { Listbox } from "components/shared/form/listbox/Listbox";
import { MarkdownEditor } from "components/shared/markdown-editor/MarkdownEditor";
import { JSONContent } from "@tiptap/react";

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
        <div className={"relative flex flex-col gap-2"}>
          <input
            className="h-fit w-full bg-transparent py-1.5 px-3 !text-lg font-light text-neutral-500 outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed"
            placeholder="Enter a title..."
            {...register("title")}
          />
        </div>
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field }) => {
          return <MarkdownEditor defaultValue={field.value} {...field} />;
        }}
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
