import { Metadata } from "next";

import { ProjectPreview } from "@/components/project-preview";
import { fetchProjectOverviews } from "@/lib/sanity/project";

export const metadata: Metadata = {
  title: "Projects",
  description: "A list of all my projects",
};

export default async function ProjectsPage() {
  const projects = await fetchProjectOverviews();

  return (
    <main>
      <h1 className="mb-3 text-3xl font-bold">Projects</h1>

      <ul className="divide-y">
        {projects.map((project) => (
          <li key={project._id}>
            <ProjectPreview project={project} />
          </li>
        ))}
      </ul>
    </main>
  );
}
