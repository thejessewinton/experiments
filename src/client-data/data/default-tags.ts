import type { Tag } from "@prisma/client";
import { colorOptions } from "./color-options";

export const defaultTags: Pick<Tag, "value" | "color">[] = [
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
  {
    value: "Sales",
    color: colorOptions.red,
  },
  {
    value: "Customer Support",
    color: colorOptions.purple,
  },
  {
    value: "Finance",
    color: colorOptions.orange,
  },
];
