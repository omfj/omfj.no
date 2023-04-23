import Link from "next/link";
import {notFound} from "next/navigation";

import {formatDate} from "@/lib/date";
import {fetchProjectsByCategory} from "@/lib/sanity/project";
import {fetchSlugsByType} from "@/lib/sanity/slug";
import {isErrorMessage} from "@/utils/error";

export const generateStaticParams = async () => {
  const slugs = await fetchSlugsByType("category");

  if (isErrorMessage(slugs)) {
    return [];
  }

  return slugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({params}: {params: {slug: string}}) => {
  return {
    title: `${params.slug} | omfj.no`,
  };
};

const Category = async ({params}: {params: {slug: string}}) => {
  const projects = await fetchProjectsByCategory(params.slug);

  if (isErrorMessage(projects)) {
    notFound();
  }

  return (
    <main>
      <h2 className="mb-3 text-4xl font-bold">Category - {params.slug}</h2>
      <ul className="divide-y">
        {projects.map((project) => {
          return (
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
                    {project.categories.map((category) => {
                      return (
                        <span
                          key={category._id}
                          className="mr-2 inline-block rounded border px-2 py-1 text-xs text-slate-600"
                        >
                          {category.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Category;
