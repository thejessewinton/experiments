import type { RouterOutputs } from "utils/api";

type JobTagProps = RouterOutputs["jobs"]["getAll"][0]["tags"];

export const JobTags = ({ tags }: { tags: JobTagProps }) => {
  return (
    <div>
      {tags.map((tag) => (
        <div key={tag.color} className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
          {tag.value}
        </div>
      ))}
    </div>
  );
};
