import type { CandidateLevel } from "@prisma/client";
import { useRouter } from "next/router";

export const useBrowseParams = () => {
  const { query } = useRouter();

  const years_experience = Number(query.years_experience) || undefined;
  const languages = query.languages || undefined;
  const frameworks = query.frameworks;
  const levels = query.levels || undefined;

  return {
    years_experience,
    languages,
    frameworks,
    levels,
  } as {
    years_experience: number | undefined;
    languages: "javascript" | "css" | "html" | undefined;
    frameworks: "nextjs" | "remix" | "solid" | "svelte" | undefined;
    levels: CandidateLevel | undefined;
  };
};
