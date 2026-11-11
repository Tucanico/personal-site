import fs from "fs";
import path from "path";

type Doc = Record<string, unknown>;

export interface SiteContent {
  intro: Doc | null;
  "about-me": Doc | null;
  contact: Doc | null;
  cv: Doc | null;
  projects: Doc[];
  technologies: Doc[];
}

// Only build-time code calls this (getStaticProps, getStaticPaths, the sitemap), so the pages need no database.
// A missing or broken file throws, which fails the build instead of deploying empty pages.
export function getContent(): SiteContent {
  const file = path.join(process.cwd(), "public", "projects.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(data.projects)) throw new Error(`${file} must have a "projects" array.`);
  return {
    intro: data.intro ?? null,
    "about-me": data["about-me"] ?? null,
    contact: data.contact ?? null,
    cv: data.cv ?? null,
    projects: data.projects,
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
  };
}
