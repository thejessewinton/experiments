import { useDialogStore } from "client-data/state/use-dialog-store";
import { Button } from "components/shared/button/Button";
import { JobCard } from "components/jobs/job-card/JobCard";
import { NewJob } from "components/jobs/new-job/NewJob";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { useDroppable } from "@dnd-kit/core";

const Jobs: NextPage = () => {
  const utils = trpc.useContext();
  const jobs = trpc.jobs.getAll.useQuery();
  const view = trpc.users.updateView.useMutation({
    onSuccess: () => {
      utils.users.invalidate();
    },
  });

  const { handleDialog } = useDialogStore();

  const { setNodeRef } = useDroppable({
    id: "unique-id",
  });

  if (jobs.isLoading || !jobs.data) return <div>Loading...</div>;

  const sortedJobsData = jobs.data.sort((a, b) => {
    if (a.status === "OPEN" && b.status === "CLOSED") return -1;
    if (a.status === "CLOSED" && b.status === "OPEN") return 1;
    return 0;
  });

  return (
    <div className="mt-3">
      <Button
        onClick={() => handleDialog({ title: "New Job", content: <NewJob /> })}
      >
        New Job
      </Button>
      <Button onClick={() => view.mutate({ state: "BY_MEMBER" })}>
        Change View
      </Button>

      <div className="grid grid-cols-3 gap-3" ref={setNodeRef}>
        {sortedJobsData.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
