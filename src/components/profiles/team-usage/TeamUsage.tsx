import { api } from "utils/api";

export const TeamUsage = () => {
  const usage = api.teams.getUsage.useQuery();

  if (usage.isLoading || !usage.data) return null;

  return (
    <div className="relative flex cursor-pointer gap-4 rounded border border-neutral-700 px-5 py-4 outline-none transition-all">
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex w-full max-w-lg flex-col gap-2">
          <div className="flex items-end justify-between">
            <div className="text-md font-medium text-white">Active jobs</div>
            <span className="text-xs text-neutral-500">
              {usage.data.subscription?.active_jobs} Included
            </span>
          </div>
          <div className="overflow-hidden rounded-full bg-neutral-700">
            <span
              className="block h-2 bg-sky-600/75 transition-all"
              style={{
                width:
                  (usage.data._count.jobs /
                    Number(usage.data.subscription?.active_jobs)) *
                    100 +
                  "%",
              }}
            />
          </div>
          <span className="text-xs text-neutral-500">
            {usage.data._count.jobs} used
          </span>
        </div>

        <div className="flex w-full max-w-lg flex-col gap-2">
          <div className="flex items-end justify-between">
            <div className="text-md font-medium text-white">
              Monthly credits
            </div>
            <span className="text-xs text-neutral-500">
              {usage.data.subscription?.monthly_credits} Included
            </span>
          </div>
          <div className="overflow-hidden rounded-full bg-neutral-700">
            <span
              className="block h-2 bg-sky-600/75 transition-all"
              style={{
                width:
                  (usage.data._count.offers /
                    Number(usage.data.subscription?.monthly_credits)) *
                    100 +
                  "%",
              }}
            />
          </div>
        </div>
        <span className="text-xs text-neutral-500">
          {usage.data._count.offers} used
        </span>
      </div>
    </div>
  );
};
