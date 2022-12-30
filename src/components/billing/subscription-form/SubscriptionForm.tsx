import { RadioGroup } from "@headlessui/react";
import { Button } from "components/shared/button/Button";
import { Spinner } from "components/shared/spinner/Spinner";
import { type Ref, forwardRef } from "react";
import {
  Controller,
  type ControllerRenderProps,
  useForm,
} from "react-hook-form";
import { clsx } from "clsx";
import { type RouterInputs, type RouterOutputs, trpc } from "utils/trpc";
import { capitalize } from "utils/capitalize";

type Values = RouterInputs["stripe"]["createCheckoutSession"];
type Products = RouterOutputs["stripe"]["getProducts"];

interface ProductOptionsProps extends ControllerRenderProps {
  products: Products | undefined;
}

const ProductOptions = forwardRef(
  ({ products, ...rest }: ProductOptionsProps, ref: Ref<HTMLDivElement>) => {
    if (!products) return <Spinner />;

    return (
      <div className="w-full max-w-md">
        <RadioGroup {...rest} ref={ref}>
          <RadioGroup.Label className="sr-only">
            Product options
          </RadioGroup.Label>
          <div className="space-y-2">
            {products.map((product) => {
              return (
                <RadioGroup.Option
                  key={product.name}
                  value={product.default_price.id}
                  className={({ active, checked }) => {
                    return clsx(
                      active || checked
                        ? "ring-sky-600/75"
                        : "ring-neutral-800",
                      "relative flex cursor-pointer rounded px-5 py-4 shadow-md outline-none ring-1 transition-all"
                    );
                  }}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex w-full items-center">
                          <div className="flex w-full justify-between text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={
                                checked ? "text-white" : "text-neutral-300"
                              }
                            >
                              {product.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={clsx(
                                checked ? "text-white" : "text-neutral-300",
                                "text-right"
                              )}
                            >
                              $
                              {(product.default_price.unit_amount as number) /
                                100}
                              {product.default_price.recurring?.interval
                                ? `/${product.default_price.recurring?.interval}`
                                : null}
                              <div className="flex">
                                {Object.entries(product.metadata).map(
                                  ([key, value]) => {
                                    return (
                                      <span
                                        key={key}
                                        className="text-2xs font-extralight text-neutral-400"
                                      >
                                        {value} {capitalize(key)}
                                      </span>
                                    );
                                  }
                                )}
                              </div>
                            </RadioGroup.Description>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    );
  }
);

ProductOptions.displayName = "ProductOptions";

export const SubscriptionForm = () => {
  const { handleSubmit, control } = useForm<Values>({
    defaultValues: {
      price_id: "price_1MKq0zJHLc5mEofuwiIhUEUs",
    },
  });

  const products = trpc.stripe.getProducts.useQuery();
  const subscribe = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url as string;
    },
  });

  const onSubmit = async (values: Values) => {
    await subscribe.mutateAsync(values);
  };

  if (!products.data) return <Spinner />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          name="price_id"
          control={control}
          render={({ field }) => (
            <ProductOptions
              products={products.data}
              {...field}
              ref={field.ref}
            />
          )}
        />

        <Button type="submit" disabled={subscribe.isLoading}>
          {subscribe.isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </>
  );
};
