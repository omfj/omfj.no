import { cache } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { formatDate } from "@/lib/date";
import { fetchProjectBySlug } from "@/lib/sanity/project";
import { fetchSlugsByType } from "@/lib/sanity/slug";

export const dynamicParams = false;

type Props = {
  params: {
    slug: string;
  };
};

const getData = cache(async (slug: string) => {
  return await fetchProjectBySlug(slug);
});

export async function generateStaticParams() {
  return await fetchSlugsByType("project");
}

export async function generateMetadata({ params }: Props) {
  const data = await getData(params.slug);

  return {
    title: data.title,
  };
}

export default async function Project({ params }: Props) {
  const data = await getData(params.slug);

  return (
    <main>
      <h2 className="mb-3 text-4xl font-bold">{data.title}</h2>

      <ul className="mt-2 flex">
        {data.categories.map((category) => (
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
        <PortableText value={data.body} />
      </article>

      <div className="mt-5 flex flex-col gap-2 text-center text-sm text-gray-500">
        <p>Last updated: {formatDate(data._updatedAt)}</p>
        <p>Published: {formatDate(data._createdAt)}</p>
      </div>
    </main>
  );
}
