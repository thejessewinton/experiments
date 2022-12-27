import { PlusIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "components/shared/dropdown/Dropdown";
import { Spinner } from "components/shared/spinner/Spinner";
import { makePlural } from "utils/make-plural";
import type { RouterOutputs } from "utils/trpc";
import { trpc } from "utils/trpc";
import { Checkbox } from "components/shared/checkbox/Checkbox";

type JobTagProps = RouterOutputs["jobs"]["getAll"][0]["tags"];

const JobTags = ({ tags }: { tags: JobTagProps }) => {
  return (
    <div className="flex items-center rounded-full border border-neutral-600 py-1 px-2 outline-none transition-colors hover:bg-neutral-800">
      <span className="mr-2 text-2xs font-light text-neutral-400">
        {tags.length} {makePlural("Tag", tags.length)}
      </span>
      {tags.length ? (
        tags.map((tag, index) => (
          <div
            key={`${tag.color}-${index}`}
            className="-mr-[2px] h-2 w-2 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
        ))
      ) : (
        <PlusIcon className="h-3 w-3" />
      )}
    </div>
  );
};

export const AddTag = ({ id, tags }: { id: string; tags: JobTagProps }) => {
  const utils = trpc.useContext();
  const add = trpc.jobs.addTag.useMutation({
    onMutate: (data) => {
      const allTags = utils.tags.getAll.getData();
      const tag = allTags?.find((tag) => tag.id === data.tag_id);
      const allJobs = utils.jobs.getAll.getData();
      const job = allJobs?.find((job) => job.id === data.job_id);

      if (tag && job) {
        const updateJob = {
          ...job,
          tags: [...job.tags, tag],
        };

        utils.jobs.getAll.setData(
          (() => undefined)(),
          allJobs?.map((job) => (job.id === data.job_id ? updateJob : job))
        );
      }
    },
    onSuccess: () => {
      utils.jobs.getAll.invalidate();
    },
  });
  const remove = trpc.jobs.removeTag.useMutation({
    onMutate: (data) => {
      const allJobs = utils.jobs.getAll.getData();
      const job = allJobs?.find((job) => job.id === data.job_id);

      if (job) {
        const updateJob = {
          ...job,
          tags: job.tags.filter((tag) => tag.id !== data.tag_id),
        };

        utils.jobs.getAll.setData(
          (() => undefined)(),
          allJobs?.map((job) => (job.id === data.job_id ? updateJob : job))
        );
      }
    },
    onSuccess: () => {
      utils.jobs.getAll.invalidate();
    },
  });

  const allTags = trpc.tags.getAll.useQuery();

  return (
    <div className="relative">
      <Dropdown
        trigger={<JobTags tags={tags} />}
        triggerClassName="rounded-full"
        align="left"
      >
        {allTags.isLoading ? (
          <Spinner />
        ) : (
          allTags.data?.map((tag) => (
            <Dropdown.Item key={tag.id}>
              <div className="flex w-full items-center gap-2 text-left text-xs">
                <Checkbox
                  label={tag.value}
                  defaultChecked={tags.some((jobTag) => jobTag.id === tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      add.mutate({ job_id: id, tag_id: tag.id });
                    } else {
                      remove.mutate({ job_id: id, tag_id: tag.id });
                    }
                  }}
                />
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
              </div>
            </Dropdown.Item>
          ))
        )}
      </Dropdown>
    </div>
  );
};
