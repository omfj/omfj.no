import Link from "next/link";

import {formatDate} from "@/lib/date";
import {fetchProjectsByCategory} from "@/lib/sanity/project";
import {fetchSlugsByType} from "@/lib/sanity/slug";

export async function generateStaticParams() {
  const slugs = await fetchSlugsByType("category");

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({params}: {params: {slug: string}}) {
  return {
    title: params.slug,
  };
}

export default async function Category({params}: {params: {slug: string}}) {
  const projects = await fetchProjectsByCategory(params.slug);

  return (
    <main>
      <h2 className="mb-3 text-4xl font-bold">Category - {params.slug}</h2>
      <ul className="divide-y">
        {projects.map((project) => (
          <li key={project._id}>
            <Link href={`/project/${project.slug}`}>
              <div className="group flex flex-col gap-2 p-3 hover:bg-gray-100/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl transition-all group-hover:text-blue-500 group-hover:underline">
                    {project.title}
                  </h2>
                  <p className="hidden scale-0 text-sm text-gray-400 transition-all group-hover:scale-100 sm:block">
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
