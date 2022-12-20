import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

export const useView = () => {
  const { pathname } = useRouter();

  const view = trpc.views.getView.useQuery({
    route: pathname,
  });

  if (!view.data) return null;

  return view.data.state;
};
