import { JobPriority } from "@prisma/client";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { capitalize } from "utils/capitalize";
import type { RouterInputs } from "utils/api";
import { api } from "utils/api";
import useFormPersist from "react-hook-form-persist";
import { Listbox } from "components/shared/form/listbox/Listbox";
import { MarkdownEditor } from "components/shared/markdown-editor/MarkdownEditor";
import { ChartBarIcon } from "@heroicons/react/24/solid";

type Values = RouterInputs["jobs"]["createNew"];

const STORAGE_KEY = "newJob";

export const NewJobForm = () => {
  const { register, handleSubmit, watch, setValue, control, reset } =
    useForm<Values>({
      defaultValues: {
        title: "",
        description: "",
        priority: JobPriority.NO_PRIORITY,
      },
    });

  const { handleDialogClose } = useDialogStore();
  const utils = api.useContext();

  const submit = api.jobs.createNew.useMutation({
    onSuccess: () => {
      reset();
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
      <div className="border-b border-neutral-300 pt-2 pb-4 dark:border-neutral-800">
        <div className={"relative flex flex-col gap-2"}>
          <input
            className="h-fit w-full bg-transparent py-1.5 px-3 !text-xl font-light text-neutral-500 outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed"
            placeholder="Enter a title..."
            {...register("title")}
          />
        </div>
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field }) => {
          return (
            <MarkdownEditor placeholder="Enter a description..." {...field} />
          );
        }}
      />

      <div className="flex items-center justify-between border-t border-neutral-300 pt-6 dark:border-neutral-800">
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Listbox
              label="Priority"
              icon={<ChartBarIcon className="h-4 w-4 text-neutral-600" />}
              {...field}
            >
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

        <Button
          type="submit"
          disabled={submit.isLoading}
          className="mr-0 ml-auto"
        >
          {submit.isLoading ? "Loading" : "Create Job"}
        </Button>
      </div>
    </form>
  );
};
