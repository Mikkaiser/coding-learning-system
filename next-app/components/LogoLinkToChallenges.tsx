"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import logo from "@/public/images/logo-mikkaiser-coder.png";

type Props = {
  variant: "navbar" | "footer";
};

/**
 * Logo link to /challenges: uses router.push on click so navigation is reliable
 * when Next/Image is nested inside a Link (avoids flaky first-click / full reload).
 */
export function LogoLinkToChallenges({ variant }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/challenges");
  }, [router]);

  const linkClass =
    variant === "navbar"
      ? "flex items-center text-base font-semibold tracking-tight text-fg"
      : "inline-flex items-center justify-center opacity-90 transition hover:opacity-100";

  const imageClass =
    variant === "navbar"
      ? "pointer-events-none h-8 w-auto sm:h-9"
      : "pointer-events-none h-7 w-auto sm:h-8";

  return (
    <Link
      href="/challenges"
      prefetch
      className={linkClass}
      onClick={(e) => {
        e.preventDefault();
        router.push("/challenges");
      }}
    >
      <Image
        src={logo}
        alt="Mikkaiser Coder logo"
        width={variant === "navbar" ? 180 : 160}
        height={variant === "navbar" ? 48 : 42}
        priority={variant === "navbar"}
        sizes={
          variant === "navbar"
            ? "(max-width: 768px) 140px, 180px"
            : "(max-width: 640px) 140px, 160px"
        }
        className={imageClass}
      />
    </Link>
  );
}
