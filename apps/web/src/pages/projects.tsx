import Link from "next/link";
import clsx from "clsx";
import {format} from "date-fns";

import ErrorBox from "@/components/error";
import Title from "@/components/title";
import MainLayout from "@/layouts/main-layout";
import {fetchProjectOverviews} from "@/lib/sanity/project";
import {isErrorMessage} from "@/utils/error";

type Props = {
  projects: Awaited<ReturnType<typeof fetchProjectOverviews>>;
};

export default function ProjectsOverviewPage({projects}: Props) {
  return (
    <MainLayout>
      {isErrorMessage(projects) ? (
        <ErrorBox title="Something has gone wrong!" message={projects.message} />
      ) : (
        <>
          <Title>Projects</Title>
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
                          Last updated:{" "}
                          <time>{format(new Date(project._updatedAt), "dd/MM/yyyy")}</time>
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
        </>
      )}
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  const projects = await fetchProjectOverviews();

  return {
    props: {
      projects,
    },
  };
};
