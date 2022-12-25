import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { useRouter } from "next/router";

const Jobs: NextPage = () => {
  const { query } = useRouter();

  const job = trpc.jobs.getJob.useQuery({ job_id: query.id as string });

  return (
    <div className="mt-3">
      <div className="grid grid-cols-3 gap-3">{JSON.stringify(job.data)}</div>
    </div>
  );
};

export default Jobs;
