import Link from "next/link";
import { useRouter } from "next/router";
import { clsx } from "clsx";

type NavigationProps = {
  label: string;
  href: string;
}[];

const navigation: NavigationProps = [
  { label: "Browse", href: "/browse" },
  { label: "Jobs", href: "/jobs" },
  { label: "Settings", href: "/settings" },
];

export const Navigation = () => {
  const router = useRouter();
  return (
    <nav className="flex gap-3 pt-12">
      {navigation.map((item) => {
        const isActive = router.pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={clsx(
              "border-b px-6 pb-2",
              isActive
                ? "border-blue-500 font-medium"
                : "border-transparent font-light"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
