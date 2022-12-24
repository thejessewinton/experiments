import { ViewState } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

export const ChangeView = ({
  activeView,
}: {
  activeView: ViewState | null;
}) => {
  const { pathname } = useRouter();
  const utils = trpc.useContext();

  const views = trpc.views.updateView.useMutation({
    onMutate: (view) => {
      utils.views.getView.setData({ route: view.route }, { state: view.state });
      console.log(view.state);
    },
    onSuccess: () => {
      utils.views.getView.invalidate();
    },
  });

  const Icons = {
    [ViewState.LIST]: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
        <path d="M0 .5A.5.5 0 0 1 .5 0h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1ZM0 3.5A.5.5 0 0 1 .5 3h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1ZM0 9.5A.5.5 0 0 1 .5 9h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1ZM0 6.5A.5.5 0 0 1 .5 6h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1Z"></path>
      </svg>
    ),
    [ViewState.BOARD]: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
        <path d="M0 1.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C.801 0 1.034 0 1.5 0h2c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541C5 .801 5 1.034 5 1.5s0 .699-.076.883a1 1 0 0 1-.541.54C4.199 3 3.966 3 3.5 3h-2c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C0 2.199 0 1.966 0 1.5ZM7 1.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C7.801 0 8.034 0 8.5 0h2c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541C12 .801 12 1.034 12 1.5s0 .699-.076.883a1 1 0 0 1-.541.54C11.199 3 10.966 3 10.5 3h-2c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C7 2.199 7 1.966 7 1.5ZM0 5.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C.801 4 1.034 4 1.5 4h2c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541C5 4.801 5 5.034 5 5.5s0 .699-.076.883a1 1 0 0 1-.541.54C4.199 7 3.966 7 3.5 7h-2c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C0 6.199 0 5.966 0 5.5ZM7 5.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C7.801 4 8.034 4 8.5 4h2c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883s0 .699-.076.883a1 1 0 0 1-.541.54C11.199 7 10.966 7 10.5 7h-2c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C7 6.199 7 5.966 7 5.5ZM0 9.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C.801 8 1.034 8 1.5 8h2c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541C5 8.801 5 9.034 5 9.5s0 .699-.076.883a1 1 0 0 1-.541.54C4.199 11 3.966 11 3.5 11h-2c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C0 10.199 0 9.966 0 9.5ZM7 9.5c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54C7.801 8 8.034 8 8.5 8h2c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883s0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077h-2c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C7 10.199 7 9.966 7 9.5Z"></path>
      </svg>
    ),
  };

  return (
    <div className="inline-flex divide-x divide-neutral-800 rounded border border-neutral-800">
      {Object.entries(ViewState).map(([key, value]) => {
        return (
          <button
            key={key}
            onClick={() => views.mutate({ state: value, route: pathname })}
            className={clsx(
              "bg-neutral-900 px-3 py-1.5 transition-colors",
              activeView === value && "bg-neutral-800"
            )}
          >
            {Icons[value]}
          </button>
        );
      })}
    </div>
  );
};
