import { cache } from "react";

import { ProjectPreview } from "@/components/project-preview";
import { fetchProjectsByCategory } from "@/lib/sanity/project";
import { fetchSlugsByType } from "@/lib/sanity/slug";

export const dynamicParams = false;

const getData = async (categorySlug: string) => {
  return await fetchProjectsByCategory(categorySlug);
};

export const generateStaticParams = async () => {
  return await fetchSlugsByType("category");
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const data = await getData(params.slug);

  return {
    title: data.title,
  };
};

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  return (
    <main>
      <h2 className="mb-3 px-3 py-2 text-4xl font-bold">
        Category - {data.title}
      </h2>
      <div
        className="mb-3 h-[1px]"
        style={{
          backgroundColor: data.color + "80",
        }}
      />
      <ul className="divide-y">
        {data.projects.map((project) => (
          <li key={project._id}>
            <ProjectPreview project={project} />
          </li>
        ))}
      </ul>
    </main>
  );
}
