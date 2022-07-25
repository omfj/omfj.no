import Main from "../../components/main";
import SEO from "../../components/SEO";
import ProjectBox from "../../components/project-box";
import t from "../../static/english.json";
import { ProjectAPI } from "../../sanity/project";
import { GetStaticProps } from "next";
import { isErrorMessage, ProjectOverview } from "../../sanity/types";
import Heading from "../../components/heading";

interface Props {
  projects: Array<ProjectOverview>;
}

const ProjectsOverview = ({ projects }: Props): JSX.Element => {
  return (
    <>
      <SEO title="projects" />
      <Main>
        <div className="px-0 py-5 md:px-3">
          {projects.length > 0 ? (
            <>
              <Heading>{t.projects.title}</Heading>
              {projects.map((project: ProjectOverview) => (
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

  return {
    props: {
      projects,
    },
  };
};

export default ProjectsOverview;
