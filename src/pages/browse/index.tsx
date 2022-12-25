import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { Spinner } from "components/shared/spinner/Spinner";
import { useRouter } from "next/router";
import type { CandidateLevel } from "@prisma/client";
import Head from "next/head";
import { BoardView } from "components/browse/board-view/BoardView";

const Browse: NextPage = () => {
  const router = useRouter();
  const candidates = trpc.browse.getCandidates.useQuery({
    languages: undefined,
    frameworks: undefined,
    levels: router.query?.levels as CandidateLevel | undefined,
  });

  const { handleDialog } = useDialogStore();

  return (
    <>
      <Head>
        <title>Browse</title>
      </Head>
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
          </div>
        </header>

        {candidates.data ? (
          <BoardView candidates={candidates.data} />
        ) : candidates.isLoading ? (
          <Spinner />
        ) : (
          "No jobs found..."
        )}
      </div>
    </>
  );
};

export default Browse;
