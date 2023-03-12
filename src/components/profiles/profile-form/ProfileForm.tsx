import { Button } from "components/shared/button/Button";
import { Input } from "components/shared/input/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type RouterInputs, api } from "utils/api";

type Values = RouterInputs["user"]["updateUser"];

export const ProfileForm = () => {
  const user = api.user.getCurrent.useQuery();
  const utils = api.useContext();
  const { register, handleSubmit, setValue } = useForm<Values>();

  useEffect(() => {
    if (user.data) {
      setValue("name", user.data.name as string);
      setValue("email", user.data.email as string);
    }
  }, [user.data, setValue]);

  const submit = api.user.updateUser.useMutation({
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
    <div className="flex flex-col gap-8">
      <h3 className="text-lg">General settings</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-lg flex-col gap-4"
      >
        <Input type="text" {...register("name")} label="Name" />
        <Input type="text" {...register("email")} label="Email" />
        <Button type="submit" disabled={submit.isLoading}>
          {submit.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
