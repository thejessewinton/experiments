import { Select } from "components/shared/select/Select";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    label: "General",
    href: "/settings",
  },
  {
    label: "Team Settings",
    href: "/settings/team",
  },
  {
    label: "Candidate Settings",
    href: "/settings/candidate",
  },
  {
    label: "Usage & Billing",
    href: "/settings/billing",
  },
];

export const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="block sm:hidden">
        <Select
          label="Navigate"
          onChange={(e) => router.push(e.target.value)}
          showLabel={false}
        >
          {navigation.map((item) => (
            <Select.Option
              key={item.href}
              value={item.href}
              label={item.label}
            />
          ))}
        </Select>
      </div>
      <nav className="hidden flex-col gap-2 sm:flex">
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
