import {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";

import {formatDate} from "@/lib/date";
import {fetchProjectOverviews} from "@/lib/sanity/project";
import {isErrorMessage} from "@/utils/error";

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
            <Link href={`/project/${project.slug}`}>
              <div className="group flex flex-col gap-2 p-3 hover:bg-gray-100/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl transition-all group-hover:text-blue-500 group-hover:underline">
                    {project.title}
                  </h2>
                  <p className="duration-50 hidden scale-0 text-sm text-gray-400 transition-all group-hover:scale-100 sm:block">
                    Last updated: <time>{formatDate(project._updatedAt)}</time>
                  </p>
                </div>

                <div>
                  {project.categories.map((category) => (
                    <span
                      key={category._id}
                      className="mr-2 inline-block rounded border px-2 py-1 text-xs text-slate-600"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
