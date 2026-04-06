import { LogoLinkToChallenges } from "@/components/LogoLinkToChallenges";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full shrink-0 border-t border-border bg-surface/70 backdrop-blur">
      <div className="container-app flex flex-col items-center justify-center gap-4 py-5 text-center">
        <LogoLinkToChallenges variant="footer" />
        <p className="text-sm text-muted">
          © {year} Mikkaiser Coder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
