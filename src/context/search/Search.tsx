import { clsx } from "clsx";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import type { ReactNode } from "react";

export const actions = [
  {
    id: "new-job",
    name: "New Job",
    shortcut: ["n"],
    keywords: "new job",
    perform: () => alert("new job"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email",
    perform: () => (window.location.pathname = "contact"),
  },
];

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
              "py-2 px-4",
              active ? "bg-neutral-800" : "bg-neutral-900"
            )}
          >
            {item.name}
          </div>
        )
      }
    />
  );
};

export const Search = ({ children }: { children: ReactNode }) => {
  return (
    <KBarProvider
      actions={actions}
      options={{
        enableHistory: true,
      }}
    >
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-10 flex h-screen items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
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
