import { makePlural } from "utils/make-plural";
import type { RouterOutputs } from "utils/api";

export const JobRow = ({
  job,
}: {
  job: RouterOutputs["jobs"]["getAll"][0];
}) => {
  return (
    <div
      className="flex items-center justify-between p-4 odd:bg-neutral-800"
      key={job.id}
    >
      <div className="flex items-center gap-4">
        <h3 className="text-sm">{job.title}</h3>
      </div>
      <span className="text-xs text-neutral-400">
        {job._count.candidates}{" "}
        {makePlural(" Candidate", job._count.candidates)}
      </span>
    </div>
  );
};
