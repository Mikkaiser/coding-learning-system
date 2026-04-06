import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getChallengeProgress } from "@/lib/completions";
import { getModule } from "@/lib/challenges/catalog";
import type { ModuleId } from "@/lib/challenges/types";
import { SITE_NAME, defaultOpenGraph, defaultTwitter, robotsPrivate } from "@/lib/seo";
import { getSessionUser } from "@/lib/server/session";
import { ModuleChallengesClient } from "./ModuleChallengesClient";

type Props = { params: { moduleId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = params.moduleId;
  const moduleId = Number(Array.isArray(raw) ? raw[0] : raw) as ModuleId;
  const mod = getModule(moduleId);
  if (!mod) {
    return { title: "Module", robots: robotsPrivate };
  }
  const description =
    mod.description.length > 155 ? `${mod.description.slice(0, 152)}…` : mod.description;
  const path = `/challenges/module/${moduleId}`;
  return {
    title: mod.title,
    description,
    robots: robotsPrivate,
    openGraph: defaultOpenGraph({
      title: `${mod.title} | ${SITE_NAME}`,
      description,
      path
    }),
    twitter: defaultTwitter({
      title: `${mod.title} | ${SITE_NAME}`,
      description
    }),
    alternates: { canonical: path }
  };
}

export default async function ModuleChallengesPage({ params }: Props) {
  const raw = params.moduleId;
  const moduleId = Number(Array.isArray(raw) ? raw[0] : raw) as ModuleId;
  if (!Number.isFinite(moduleId) || !getModule(moduleId)) {
    redirect("/challenges");
  }

  const user = await getSessionUser();
  if (!user) redirect("/login");

  const initialCompleted: Record<string, boolean> = {};
  let initialSolutions: Record<string, string> = {};

  if (user.role === "student") {
    const p = await getChallengeProgress(user.id);
    for (const id of p.challengeIds) initialCompleted[id] = true;
    initialSolutions = p.solutions;
  }

  return (
    <ModuleChallengesClient
      moduleId={moduleId}
      initialRole={user.role}
      initialCompleted={initialCompleted}
      initialSolutions={initialSolutions}
      ssrHydrated
    />
  );
}
