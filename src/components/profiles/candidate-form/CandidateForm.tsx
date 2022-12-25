import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type RouterInputs, trpc } from "utils/trpc";

type Values = RouterInputs["candidate"]["updateCandidate"];

export const CandidateForm = () => {
  const { register, handleSubmit } = useForm<Values>();

  const candidate = trpc.candidate.getCurrent.useQuery();

  const submit = trpc.candidate.updateCandidate.useMutation({
    onSuccess: () => {
      toast.success("Candidate updated successfully");
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Candidate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="text"
          {...register("salary")}
          label="Salary"
          defaultValue={candidate.data?.salary}
        />
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
