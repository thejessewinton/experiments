import { Select } from "components/shared/select/Select";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    label: "General",
    href: "/settings",
  },
  {
    label: "Team",
    href: "/settings/team",
  },
  {
    label: "Candidate",
    href: "/settings/candidate",
  },
  {
    label: "Usage and billing",
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
      <nav className="hidden flex-col gap-4 sm:flex">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              router.pathname === item.href
                ? "text-white"
                : "!font-light text-neutral-400"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
