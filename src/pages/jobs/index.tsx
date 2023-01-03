import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { useView } from "client-data/hooks/use-view";
import { ListView } from "components/jobs/list-view/ListView";
import { BoardView } from "components/jobs/board-view/BoardView";
import { Spinner } from "components/shared/spinner/Spinner";
import { ViewState } from "@prisma/client";
import Head from "next/head";

const Jobs: NextPage = () => {
  const jobs = trpc.jobs.getAll.useQuery();
  const view = useView();

  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <div className="mt-3">
        {jobs.data ? (
          view === ViewState.LIST ? (
            <ListView jobs={jobs.data} />
          ) : (
            <BoardView jobs={jobs.data} />
          )
        ) : jobs.isLoading ? (
          <Spinner />
        ) : (
          "No jobs found..."
        )}
      </div>
    </>
  );
};

export default Jobs;

export { getServerSideProps } from "server/auth/get-server-redirect";
