import type { ReactNode } from "react";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { clsx } from "clsx";
import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import { PlusIcon } from "@heroicons/react/24/outline";

const useActions = () => {
  const { handleDialog } = useDialogStore();

  const actions = [
    {
      id: "new-job",
      name: "New Job",
      shortcut: ["n"],
      keywords: "new job",
      icon: (
        <PlusIcon className="h-4 w-4 transition-colors group-hover:text-white dark:text-neutral-400" />
      ),
      perform: () =>
        handleDialog({
          title: "New Job",
          content: <NewJobForm />,
        }),
    },
  ];

  return actions;
};

const SearchResults = () => {
  const { results } = useMatches();

  return (
    <div className="w-full max-w-xl rounded-b p-2 font-serif">
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div className="bg-neutral-900 py-2 px-4">{item}</div>
          ) : (
            <div
              className={clsx(
                "group flex items-center justify-between rounded py-2 px-4 text-xs font-light text-neutral-400 transition-all hover:cursor-pointer hover:text-white",
                active ? "bg-neutral-800" : "bg-neutral-900"
              )}
            >
              <div className="flex items-center gap-4">
                <span>{item.icon}</span>
                {item.name}
              </div>
              {item.shortcut
                ? item.shortcut.map((shortcut) => (
                    <kbd
                      key={shortcut}
                      className="rounded bg-neutral-700 px-1.5 !font-mono text-neutral-100"
                    >
                      {shortcut}
                    </kbd>
                  ))
                : null}
            </div>
          )
        }
      />
    </div>
  );
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const actions = useActions();

  return (
    <KBarProvider
      actions={actions}
      options={{
        enableHistory: true,
      }}
    >
      <KBarPortal>
        <KBarPositioner className="!z-50 bg-black bg-opacity-25 font-serif backdrop-blur-sm">
          <KBarAnimator className="w-full max-w-xl">
            <div className="rounded bg-neutral-900">
              <div className="border-b border-neutral-800 px-2 pt-2 pb-4 dark:bg-neutral-900">
                <KBarSearch className="h-fit w-full bg-transparent py-1.5 px-3 !text-lg font-light text-white outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed" />
              </div>
              <SearchResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};
