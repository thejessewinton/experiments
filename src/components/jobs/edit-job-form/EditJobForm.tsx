import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { Select } from "components/shared/select/Select";
import { TextArea } from "components/shared/textarea/TextArea";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { RouterInputs, RouterOutputs } from "utils/trpc";
import { trpc } from "utils/trpc";

type Values = RouterInputs["jobs"]["edit"];

export const EditJobForm = ({
  job,
}: {
  job: RouterOutputs["jobs"]["getJob"];
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      job_id: job?.id,
      title: job?.title,
      salary: job?.salary,
      due_date: job?.due_date as Date,
      description: job?.description,
    },
  });

  const { handleDialogClose } = useDialogStore();
  const utils = trpc.useContext();
  const handleBack = () => {
    router.push("/jobs");
  };

  const submit = trpc.jobs.edit.useMutation({
    onSuccess: () => {
      handleDialogClose();
      utils.jobs.invalidate();
      toast.success("Job edited successfully");
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  return (
    <>
      <nav className="flex h-10 items-center justify-between rounded-t border-x border-t border-neutral-700 bg-neutral-800 px-4">
        <button onClick={handleBack}>
          <XMarkIcon className="h-4 w-4" />
        </button>
      </nav>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input type="text" {...register("title")} label="Title" />
        <Input
          type="text"
          {...register("salary", { valueAsNumber: true })}
          label="Salary"
        />
        <Input
          type="date"
          {...register("due_date", { valueAsDate: true })}
          label="Due Date"
          min={new Date().toISOString().split("T")[0]}
        />
        <TextArea {...register("description")} label="Description" />
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </>
  );
};
