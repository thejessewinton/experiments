import { Button } from "components/shared/button/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { RouterInputs } from "utils/api";
import { api } from "utils/api";
import { useRouter } from "next/router";

type Values = RouterInputs["teams"]["updateTeam"];

export const TeamSettingsForm = () => {
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const router = useRouter();

  const submit = api.teams.updateTeam.useMutation({
    onSuccess: () => {
      router.push("/");
      toast.success("Team onboarded successfully");
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="border-b border-neutral-800 pt-2 pb-4">
        <div className="relative flex flex-col gap-2">
          <input
            className="h-fit w-full bg-transparent py-1.5 px-3 !text-lg font-light text-neutral-500 outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed"
            placeholder="Enter a name for your team..."
            {...register("name")}
          />
        </div>
      </div>

      <div className="relative flex flex-col gap-2">
        <input
          className="h-fit w-full bg-transparent py-1.5 px-3 font-light text-neutral-500 outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed"
          placeholder="Enter a slug for your team..."
          {...register("slug")}
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
