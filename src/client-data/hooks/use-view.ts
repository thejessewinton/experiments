import { useRouter } from "next/router";
import { api } from "utils/api";

export const useView = () => {
  const { pathname } = useRouter();

  const view = api.views.getView.useQuery({
    route: pathname,
  });

  if (!view.data) return null;

  return view.data.state;
};
