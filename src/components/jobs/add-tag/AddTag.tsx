import { Dropdown } from "components/shared/dropdown/Dropdown";
import { Spinner } from "components/shared/spinner/Spinner";
import { toast } from "react-hot-toast";
import type { RouterOutputs } from "utils/trpc";
import { trpc } from "utils/trpc";

type JobTagProps = RouterOutputs["jobs"]["getAll"][0]["tags"];

const JobTags = ({ tags }: { tags: JobTagProps }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-2xs font-light text-neutral-600">Tags</span>
      {tags.length ? (
        tags.map((tag) => (
          <div
            key={tag.color}
            className="-mr-[2px] h-2 w-2 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
        ))
      ) : (
        <div className="h-2 w-2 rounded-full bg-gray-300" />
      )}
    </div>
  );
};

export const AddTag = ({ id, tags }: { id: string; tags: JobTagProps }) => {
  const utils = trpc.useContext();
  const add = trpc.jobs.addTag.useMutation({
    onSuccess: (data) => {
      utils.jobs.getAll.invalidate();
      toast.success(`Added tag to ${data.title}`);
    },
  });
  const allTags = trpc.tags.getAll.useQuery();

  return (
    <div className="relative">
      <Dropdown trigger={<JobTags tags={tags} />} align="left">
        {allTags.isLoading ? (
          <Spinner />
        ) : (
          allTags.data?.map((tag) => (
            <Dropdown.Item key={tag.id}>
              <button
                onClick={() => add.mutate({ tag_id: tag.id, job_id: id })}
                className="flex w-full items-center gap-2 text-left text-xs"
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span className="text-2xs font-light">{tag.value}</span>
              </button>
            </Dropdown.Item>
          ))
        )}
      </Dropdown>
    </div>
  );
};
