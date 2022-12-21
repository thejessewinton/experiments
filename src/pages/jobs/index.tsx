import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { NewJobForm } from "components/jobs/new-job-form/NewJobForm";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { ChangeView } from "components/views/change-view/ChangeView";
import { useView } from "client-data/hooks/use-view";
import { ListView } from "components/jobs/list-view/ListView";
import { BoardView } from "components/jobs/board-view/BoardView";
import { Spinner } from "components/shared/spinner/Spinner";

const Jobs: NextPage = () => {
  const jobs = trpc.jobs.getAll.useQuery();
  const view = useView();

  const { handleDialog } = useDialogStore();

  if (!jobs.data) return <Spinner />;

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
          <ChangeView activeView={view} />
        </div>
      </header>

      {view === "LIST" ? (
        <ListView jobs={jobs.data} />
      ) : (
        <BoardView jobs={jobs.data} />
      )}
    </div>
  );
};

export default Jobs;
