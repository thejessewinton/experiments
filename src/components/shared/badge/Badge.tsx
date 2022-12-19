import clsx from "clsx";
import { type ReactNode } from "react";

export const Badge = ({
  label,
  variant,
}: {
  label: ReactNode;
  variant: "success" | "danger" | "warning";
}) => {
  const variantClassName =
    variant === "success"
      ? "bg-green-800 border-green-500 text-green-500"
      : variant === "danger"
      ? "bg-red-500"
      : variant === "warning"
      ? "bg-yellow-500"
      : "bg-gray-500";

  return (
    <div
      className={clsx(
        "rounded-full border bg-opacity-50 px-4 py-1 text-xs",
        variantClassName
      )}
    >
      {label}
    </div>
  );
};
