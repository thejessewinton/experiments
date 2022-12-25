import { formatCurrency } from "utils/format-currency";
import { makePlural } from "utils/make-plural";
import type { RouterOutputs } from "utils/trpc";
import { AddToJob } from "../add-to-job/AddToJob";

export const CandidateCard = ({
  candidate,
}: {
  candidate: RouterOutputs["browse"]["getCandidates"][0];
}) => {
  return (
    <div className="rounded-lg border border-neutral-400 transition-all hover:cursor-pointer dark:border-neutral-800 dark:bg-neutral-900">
      <div className="h-full px-6 py-4">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-1 flex-col">
            <span className="text-2xs font-light uppercase text-neutral-500">
              {candidate.job_title}
            </span>
            <div className="flex w-full items-center justify-between">
              <h3 className="text-sm">{candidate.user.name}</h3>
              <h3 className="text-sm text-neutral-600">
                {formatCurrency(candidate.salary)}
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-0 flex items-center justify-between gap-1">
          <span className="text-2xs text-neutral-600">
            {candidate._count.jobs} {makePlural("Job", candidate._count.jobs)}
          </span>
          <AddToJob id={candidate.id} />
        </div>
      </div>
    </div>
  );
};
