import { trpc } from "utils/trpc";
import { useRouter } from "next/router";
import { Spinner } from "components/shared/spinner/Spinner";
import dayjs from "utils/dayjs";
import type { NextPageWithLayout } from "pages/_app";
import Link from "next/link";
import { EditJobForm } from "components/jobs/edit-job-form/EditJobForm";

const Job: NextPageWithLayout = () => {
  const router = useRouter();

  const job = trpc.jobs.getJob.useQuery({ job_id: router.query.id as string });

  if (job.isLoading || !job.data) return <Spinner />;

  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <header className="flex flex-col gap-3">
          <h4 className="text-lg">{job.data.title} Settings</h4>
          <span className="text-extralight text-neutral-400">
            Created {dayjs(job.data.created_at).from(dayjs())}
          </span>
        </header>

        <Link
          href={{
            pathname: `/jobs/[id]`,
            query: { id: job.data?.id },
          }}
          className="shadow-xs flex h-fit w-fit cursor-pointer items-center justify-center gap-3 rounded bg-neutral-900 py-1.5 px-4 text-sm font-medium text-white shadow-black/25 outline-none transition-all focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-neutral-900"
        >
          Back
        </Link>
      </div>

      <EditJobForm job={job.data} />
    </div>
  );
};

export default Job;

export { getServerSideProps } from "backend/auth/redirect";
