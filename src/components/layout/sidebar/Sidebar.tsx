import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    label: "General",
    href: "/settings",
  },
  {
    label: "Candidate Settings",
    href: "/settings/candidate",
  },
  {
    label: "Tags",
    href: "/settings/tags",
  },
];

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <nav className="flex flex-col gap-2">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              router.pathname === item.href ? "font-medium" : "font-light"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
