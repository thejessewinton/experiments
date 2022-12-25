import type { RouterOutputs } from "utils/trpc";

export const CandidateRow = ({
  candidate,
}: {
  candidate: RouterOutputs["browse"]["getCandidates"][0];
}) => {
  return (
    <div className="flex items-center justify-between p-4 odd:bg-neutral-800">
      <div className="flex items-center gap-4">
        <h3 className="text-sm">{candidate.user.name}</h3>
      </div>
      <span className="text-xs text-neutral-400"></span>
    </div>
  );
};
