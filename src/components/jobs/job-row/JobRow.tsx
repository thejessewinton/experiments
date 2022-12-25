import type { RouterOutputs } from "utils/trpc";
import { UpdateStatus } from "../update-status/UpdateStatus";

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
        <UpdateStatus status={job.status} id={job.id} />
        <h3 className="text-sm">{job.title}</h3>
      </div>
      <span className="text-xs text-neutral-400">
        {job._count.candidates} Candidates
      </span>
    </div>
  );
};
