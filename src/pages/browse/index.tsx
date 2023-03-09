import { useDialogStore } from "client-data/state/use-dialog-store";

import { type NextPage } from "next";
import { api } from "utils/api";
import { Spinner } from "components/shared/spinner/Spinner";
import { useRouter } from "next/router";
import type { CandidateLevel } from "@prisma/client";
import Head from "next/head";
import { BoardView } from "components/browse/board-view/BoardView";
import { SetActiveJob } from "components/jobs/set-active-job/SetActiveJob";

const Browse: NextPage = () => {
  const router = useRouter();
  const candidates = api.browse.getCandidates.useQuery({
    languages: undefined,
    frameworks: undefined,
    levels: router.query?.levels as CandidateLevel | undefined,
  });

  return (
    <>
      <Head>
        <title>Browse</title>
      </Head>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <SetActiveJob />
        </div>
        {candidates.data ? (
          <BoardView candidates={candidates.data} />
        ) : candidates.isLoading ? (
          <Spinner />
        ) : (
          "No candidates found..."
        )}
      </div>
    </>
  );
};

export default Browse;

export { getServerSideProps } from "server/auth/get-server-redirect";
