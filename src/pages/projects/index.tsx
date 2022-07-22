import Main from "../../components/main";
import SEO from "../../components/SEO";
import ProjectBox from "../../components/project-box";
import t from "../../static/english.json";
import { ProjectAPI } from "../../sanity/project";
import { GetStaticProps } from "next";
import { isErrorMessage, ProjectOverview } from "../../sanity/types";
import Heading from "../../components/heading";
import { useState } from "react";

interface Props {
  projects: Array<ProjectOverview>;
}

// enum ProjectSort {
//   title = "Title",
//   uploaded = "Date",
//   updated = "Last Updated",
// }

type ProjectSort = "title" | "uploaded" | "updated";

const ProjectsOverview = ({ projects }: Props) => {
  const [reverse, setReverse] = useState(false);
  const [sort, setSort] = useState<ProjectSort>("title");

  const projectsFiltered = () => {
    switch (sort) {
      case "title":
        return projects.sort((a, b) => {
          if (a.title < b.title) {
            return reverse ? 1 : -1;
          }
          if (a.title > b.title) {
            return reverse ? -1 : 1;
          }
          return 0;
        });
      case "uploaded":
        return projects.sort((a, b) => {
          if (a._createdAt < b._createdAt) {
            return reverse ? -1 : 1;
          }
          if (a._createdAt > b._createdAt) {
            return reverse ? 1 : -1;
          }
          return 0;
        });
      case "updated":
        return projects.sort((a, b) => {
          if (a._updatedAt < b._updatedAt) {
            return reverse ? -1 : 1;
          }
          if (a._updatedAt > b._updatedAt) {
            return reverse ? 1 : -1;
          }
          return 0;
        });
      default:
        return projects;
    }
  };

  return (
    <>
      <SEO title="projects" />
      <Main>
        <div className="px-0 py-5 md:px-3">
          {projects.length > 0 ? (
            <>
              <Heading>{t.projects.title}</Heading>

              <div className="flex flex-col w-fit m-auto text-center">
                <div className="flex flex-row gap-5">
                  <p>Sort by:</p>

                  <select
                    className="bg-black text-white"
                    defaultValue="title"
                    onChange={(e) => setSort(e.target.value as ProjectSort)}
                  >
                    <option value="title">Title</option>
                    <option value="uploaded">Uploaded</option>
                    <option value="updated">Last Updated</option>
                  </select>
                </div>

                <div className="flex flex-row gap-5">
                  <label htmlFor="reverse">Reverse</label>
                  <input
                    id="reverse"
                    type="checkbox"
                    onChange={(e) => {
                      setReverse(e.target.checked);
                    }}
                  />
                </div>
                {/* For debugging */}
                {/* <p>Sort: {sort}</p> */}
                {/* <p>Reverse: {reverse ? "checked" : "not checked"}</p> */}
              </div>

              {projectsFiltered().map((project: ProjectOverview) => (
                <ProjectBox
                  key={project._id}
                  title={project.title}
                  desc={project.description}
                  link={project.slug}
                  categories={project.categories}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-10 text-center">
              <h1 className="font-bold text-4xl">
                Something wrong has happened!
              </h1>
              <p className="text-2xl">Cannot load projects</p>
            </div>
          )}
        </div>
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = await ProjectAPI.getProjectOverview();

  if (isErrorMessage(projects)) throw new Error(projects.message);

  const props: Props = {
    projects,
  };

  return { props };
};

export default ProjectsOverview;
