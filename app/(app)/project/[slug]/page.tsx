import { cache } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { Tag } from "@/components/tag";
import { formatDate } from "@/lib/date";
import { fetchProjectBySlug } from "@/lib/sanity/project";
import { fetchSlugsByType } from "@/lib/sanity/slug";

type Props = {
  params: {
    slug: string;
  };
};

const getData = async (slug: string) => {
  return await fetchProjectBySlug(slug);
};

export const generateStaticParams = async () => {
  return await fetchSlugsByType("project");
};

export const generateMetadata = async ({ params }: Props) => {
  const data = await getData(params.slug);

  return {
    title: data.title,
  };
};

export default async function Project({ params }: Props) {
  const data = await getData(params.slug);

  return (
    <div className="mx-auto max-w-6xl">
      <main className="max-w-xl">
        <h2 className="mb-3 text-4xl font-light">{data.title}</h2>

        <div className="mt-2 flex">
          {data.categories.map((category) => (
            <Link key={category._id} href={`/category/${category.slug}`}>
              <Tag>{category.title}</Tag>
            </Link>
          ))}
        </div>

        <article className="prose-lg mt-5 text-black">
          <PortableText value={data.body} />
        </article>

        <div className="mt-5 flex flex-col gap-2 text-center text-sm text-gray-500">
          <p>Last updated: {formatDate(data._updatedAt)}</p>
          <p>Published: {formatDate(data._createdAt)}</p>
        </div>
      </main>
    </div>
  );
}
