import type { Tag } from "@prisma/client";
import { colorOptions } from "./color-options";

export const defaultTags: Omit<Tag, "id" | "user_id" | "job_id">[] = [
  {
    value: "Design",
    color: colorOptions.blue,
  },
  {
    value: "Engineering",
    color: colorOptions.green,
  },
  {
    value: "Marketing",
    color: colorOptions.yellow,
  },
];
