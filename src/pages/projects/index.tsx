import Main from "../../components/main";
import SEO from "../../components/SEO";
import { Box, Heading, Text } from "@chakra-ui/react";
import ProjectBox from "../../components/project-box";
import t from "../../static/english.json";
import { ProjectAPI } from "../../sanity/project";
import { GetStaticProps } from "next";
import { isErrorMessage, ProjectOverview } from "../../sanity/types";

interface Props {
  projects: Array<ProjectOverview>;
}

const ProjectsOverview = ({ projects }: Props): JSX.Element => {
  return (
    <>
      <SEO title="projects" />
      <Main>
        <Heading textAlign="center" fontSize="3xl">
          {t.projects.title}
        </Heading>
        <Box px={["0", "3"]} py="5">
          {projects.map((project: ProjectOverview) => (
            <ProjectBox
              key={project._id}
              title={project.title}
              desc={project.description}
              link={project.slug}
              categories={project.categories}
            />
          ))}
        </Box>
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
