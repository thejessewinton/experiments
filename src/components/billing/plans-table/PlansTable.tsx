import { CheckIcon } from "@heroicons/react/24/solid";
import { Button } from "components/shared/button/Button";
import { Spinner } from "components/shared/spinner/Spinner";
import { capitalize } from "utils/capitalize";
import { trpc } from "utils/trpc";

const ManageSubscription = () => {
  const manage = trpc.stripe.manageSubscription.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url as string;
    },
  });

  return (
    <Button onClick={() => manage.mutateAsync()}>Manage subscription</Button>
  );
};

export const PlansTable = () => {
  const products = trpc.stripe.getProducts.useQuery();
  const subscribe = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url as string;
    },
  });

  if (!products.data) return <Spinner />;

  return (
    <div className="mb-12 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Usage and billing</h3>
        <ManageSubscription />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {products.data.map((product) => {
          return (
            <div
              className="flex flex-col gap-2 rounded border border-neutral-700 p-6"
              key={product.id}
            >
              <h3 className="text-base">{product.name}</h3>

              <div className="flex items-center gap-1">
                <h6 className="text-xl text-white">
                  ${(product.default_price.unit_amount as number) / 100}
                </h6>
                <span className="text-neutral-400">
                  per {product.default_price.recurring?.interval}
                </span>
              </div>

              <div className="mb-8 mt-2 space-y-2">
                {Object.entries(product.metadata).map(([key, value]) => {
                  return (
                    <div className="flex items-center gap-1" key={key}>
                      <CheckIcon className="h-4 w-4 text-sky-600/75" />
                      <span className="text-xs text-neutral-400">
                        {value} {capitalize(key)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {product.default_price.unit_amount !== 0 ? (
                <Button
                  onClick={() =>
                    subscribe.mutateAsync({
                      price_id: product.default_price.id,
                    })
                  }
                  disabled={subscribe.isLoading}
                  className={
                    product.is_current
                      ? "!border !border-neutral-700 !bg-transparent !text-neutral-400"
                      : ""
                  }
                >
                  {product.is_current ? "Current plan" : "Subscribe"}
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
