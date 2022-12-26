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

const useActions = () => {
  const { handleDialog } = useDialogStore();

  const actions = [
    {
      id: "new-job",
      name: "New Job",
      shortcut: ["n"],
      keywords: "new job",
      perform: () =>
        handleDialog({ title: "New Job", content: <NewJobForm /> }),
    },
  ];

  return actions;
};

const SearchResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="bg-neutral-900 py-2 px-4">{item}</div>
        ) : (
          <div
            className={clsx(
              "flex items-center justify-between py-2 px-4",
              active ? "bg-neutral-800" : "bg-neutral-900"
            )}
          >
            {item.name}
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
        <KBarPositioner className="!z-50 bg-black bg-opacity-25 backdrop-blur-sm">
          <KBarAnimator className="w-full max-w-xl">
            <KBarSearch className="h-fit w-full rounded py-1.5 px-3 text-sm text-white outline-none transition-all placeholder:text-neutral-500 read-only:cursor-not-allowed focus:ring-1 focus:ring-sky-600/75 dark:bg-neutral-800" />
            <SearchResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};
