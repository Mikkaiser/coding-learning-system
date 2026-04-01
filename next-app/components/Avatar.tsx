import type { UserRole } from "@/lib/users";

type Props = {
  username: string;
  role: UserRole;
};

export function Avatar({ username, role }: Props) {
  const initials = username.slice(0, 2).toUpperCase();
  const ring =
    role === "admin"
      ? "bg-amber-500/20 text-amber-200 ring-amber-400/40"
      : "bg-emerald-500/20 text-emerald-200 ring-emerald-400/40";

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ${ring}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
