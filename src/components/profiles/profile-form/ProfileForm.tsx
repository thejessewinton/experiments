import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type RouterInputs, trpc } from "utils/trpc";

type Values = RouterInputs["user"]["updateUser"];

export const ProfileForm = () => {
  const user = trpc.user.getCurrent.useQuery();
  const utils = trpc.useContext();
  const { register, handleSubmit, setValue } = useForm<Values>();

  useEffect(() => {
    if (user.data) {
      setValue("name", user.data.name as string);
      setValue("email", user.data.email as string);
    }
  }, [user.data, setValue]);

  const submit = trpc.user.updateUser.useMutation({
    onSuccess: () => {
      utils.user.getCurrent.invalidate();
      toast.success("User updated successfully");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: Values) => {
    await submit.mutateAsync(values);
  };

  if (user.isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input type="text" {...register("name")} label="Name" />
      <Input type="text" {...register("email")} label="Email" />
      <Button type="submit" disabled={submit.isLoading}>
        {submit.isLoading ? "Loading" : "Submit"}
      </Button>
    </form>
  );
};
