import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

export const ChangeView = () => {
  const { pathname } = useRouter();
  const views = trpc.views.updateView.useMutation();

  return (
    <div className="flex">
      <button onClick={() => views.mutate({ state: "LIST", route: pathname })}>
        List View
      </button>
      <button onClick={() => views.mutate({ state: "BOARD", route: pathname })}>
        Grid View
      </button>
    </div>
  );
};
