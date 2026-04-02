import type { UserRole } from "@/lib/users";

type Props = {
  username: string;
  role: UserRole;
};

export function Avatar({ username, role }: Props) {
  const initials = username.slice(0, 2).toUpperCase();
  const ring =
    role === "admin"
      ? "bg-brand-secondary/15 text-brand-secondary ring-brand-secondary/35"
      : "bg-brand-accent/15 text-brand-primary ring-brand-accent/45";

  return (
    <div
      className={`flex h-control-sm w-control-sm shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ${ring}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
