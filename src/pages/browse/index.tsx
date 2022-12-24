import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { Spinner } from "components/shared/spinner/Spinner";
import { Filters } from "components/browse/filters/Filters";
import { useRouter } from "next/router";
import type { CandidateLevel } from "@prisma/client";

const Browse: NextPage = () => {
  const router = useRouter();
  const candidates = trpc.browse.getCandidates.useQuery({
    languages: undefined,
    frameworks: undefined,
    levels: router.query?.levels as CandidateLevel | undefined,
  });

  const { handleDialog } = useDialogStore();

  return (
    <div className="mt-3">
      <header className="flex">
        <div className="mr-0 ml-auto flex gap-3">
          <Button
            onClick={() =>
              handleDialog({ title: "New Job", content: <NewJobForm /> })
            }
          >
            New Job
          </Button>
          <Filters />
        </div>
      </header>

      {candidates.data ? (
        <>Browse Data</>
      ) : candidates.isLoading ? (
        <Spinner />
      ) : (
        "No Candidates found..."
      )}
    </div>
  );
};

export default Browse;