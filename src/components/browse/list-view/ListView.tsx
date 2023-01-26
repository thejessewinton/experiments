import type { RouterOutputs } from "utils/api";
import { CandidateRow } from "../candidate-row/CandidateRow";

type CandidatesOutput = RouterOutputs["browse"]["getCandidates"];

const ListRow = ({ candidates }: { candidates: CandidatesOutput }) => {
  return (
    <div className="mt-6">
      <div className="flex flex-col">
        {candidates.map((candidate) => (
          <CandidateRow candidate={candidate} key={candidate.id} />
        ))}
      </div>
    </div>
  );
};

export const ListView = ({ candidates }: { candidates: CandidatesOutput }) => {
  return (
    <div className="mt-6">
      <ListRow candidates={candidates} />
    </div>
  );
};
