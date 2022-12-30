import { Button } from "components/shared/button/Button";

import { Select } from "components/shared/select/Select";
import { useForm } from "react-hook-form";
import { type RouterInputs, trpc } from "utils/trpc";

type Values = RouterInputs["stripe"]["createCheckoutSession"];

export const SubscriptionForm = () => {
  const { register, handleSubmit } = useForm<Values>();

  const products = trpc.stripe.getProducts.useQuery();
  const subscribe = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url as string;
    },
  });

  const onSubmit = async (values: Values) => {
    await subscribe.mutateAsync(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Select {...register("price_id")} label="Product" required>
          {products.data?.map((product) => (
            <Select.Option
              key={product.id}
              value={product.default_price as string}
              label={product.name}
            />
          ))}
        </Select>

        <Button type="submit" disabled={subscribe.isLoading}>
          {subscribe.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </>
  );
};
