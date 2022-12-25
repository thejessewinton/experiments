import type { RouterOutputs } from "utils/trpc";
import { CandidateCard } from "../candidate-card/CandidateCard";

type CandidatesOutput = RouterOutputs["browse"]["getCandidates"];

const BoardColumn = ({ candidates }: { candidates: CandidatesOutput }) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {candidates.map((candidate) => (
          <CandidateCard candidate={candidate} key={candidate.id} />
        ))}
      </div>
    </div>
  );
};

export const BoardView = ({ candidates }: { candidates: CandidatesOutput }) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-3 gap-6">
        <BoardColumn candidates={candidates} />
      </div>
    </>
  );
};
