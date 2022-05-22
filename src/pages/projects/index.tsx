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
        <Heading>{t.projects.title}</Heading>
        <div className="px-0 py-5 md:px-3">
          {projects.map((project: ProjectOverview) => (
            <ProjectBox
              key={project._id}
              title={project.title}
              desc={project.description}
              link={project.slug}
              categories={project.categories}
            />
          ))}
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
