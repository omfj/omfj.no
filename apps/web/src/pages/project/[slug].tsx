import {GetStaticProps} from "next";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import {format} from "date-fns";

import ErrorBox from "@/components/error";
import Heading from "@/components/ui/heading";
import MainLayout from "@/layouts/main-layout";
import {fetchProjectBySlug} from "@/lib/sanity/project";
import {fetchSlugsByType} from "@/lib/sanity/slug";
import {isErrorMessage} from "@/utils/error";

type Props = {
  project: Awaited<ReturnType<typeof fetchProjectBySlug>>;
};

export default function ProjectsOverviewPage({project}: Props) {
  return (
    <MainLayout>
      {isErrorMessage(project) ? (
        <ErrorBox message={project.message} />
      ) : (
        <>
          <Heading as="h2">{project.title}</Heading>

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
            <p>Last updated: {format(new Date(project._updatedAt), "dd/MM/yyyy")}</p>
            <p>Published: {format(new Date(project._createdAt), "dd/MM/yyyy")}</p>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export const getStaticPaths = async () => {
  const slugs = await fetchSlugsByType("project");
  if (isErrorMessage(slugs)) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {slug} = ctx.params as {slug: string};

  const project = await fetchProjectBySlug(slug);

  return {
    props: {
      project,
    },
  };
};
