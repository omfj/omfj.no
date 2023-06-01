import Link from "next/link";
import {PortableText} from "@portabletext/react";

import {formatDate} from "@/lib/date";
import {fetchProjectBySlug} from "@/lib/sanity/project";
import {fetchSlugsByType} from "@/lib/sanity/slug";

export const dyanmicParams = false;

export async function generateStaticParams() {
  const slugs = await fetchSlugsByType("project");

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({params}: {params: {slug: string}}) {
  const project = await fetchProjectBySlug(params.slug);

  return {
    title: project.title,
  };
}

export default async function Project({params}: {params: {slug: string}}) {
  const project = await fetchProjectBySlug(params.slug);

  return (
    <main>
      <h2 className="mb-3 text-4xl font-bold">{project.title}</h2>

      <ul className="mt-2 flex">
        {project.categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/category/${category.slug}`}
              className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-medium leading-4 text-gray-800"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>

      <article className="prose mt-5 text-black">
        <PortableText value={project.body} />
      </article>

      <div className="mt-5 flex flex-col gap-2 text-center text-sm text-gray-500">
        <p>Last updated: {formatDate(project._updatedAt)}</p>
        <p>Published: {formatDate(project._createdAt)}</p>
      </div>
    </main>
  );
}
