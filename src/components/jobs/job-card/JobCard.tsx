import { makePlural } from "utils/make-plural";
import type { RouterOutputs } from "utils/trpc";
import { Actions } from "../actions/Actions";

export const JobCard = ({
  job,
}: {
  job: RouterOutputs["jobs"]["getAll"][0];
}) => {
  return (
    <div className="rounded-lg border border-neutral-400 shadow-sm shadow-black/30 transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-black/30 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="h-full px-5 py-4">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-light uppercase text-neutral-500">
              {job.category}
            </span>
            <h3 className="text-sm">{job.title}</h3>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Actions id={job.id} />
          </div>
        </div>
        <div className="mt-8 mb-0 flex flex-col gap-1">
          <span className="text-2xs text-neutral-600">
            {job._count.candidates}{" "}
            {makePlural(" Candidate", job._count.candidates)}
          </span>
        </div>
      </div>
    </div>
  );
};
