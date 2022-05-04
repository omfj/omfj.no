import Main from "../../components/main";
import SEO from "../../components/SEO";
import { Box, Text } from "@chakra-ui/react";
import ProjectBox from "../../components/project-box";
import { ProjectAPI } from "../../sanity/project";
import { GetStaticProps } from "next";
import { isErrorMessage, Project } from "../../sanity/types";
import { zuluTimeToHuman } from "../../lib/date-functions";

interface Props {
  projects: Array<Project>;
}

const ProjectsOverview = ({ projects }: Props): JSX.Element => {
  return (
    <>
      <SEO title="projects" />
      <Main>
        <Text textAlign="center" fontSize="3xl">
          Projects
        </Text>
        <Box px={["0", "3"]} py="5">
          {projects.map((project: Project) => {
            return (
              <ProjectBox
                key={project._id}
                title={project.title}
                desc={project.description}
                link={project.slug}
                lastUpdate={zuluTimeToHuman(project._updatedAt)}
              />
            );
          })}
        </Box>
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = await ProjectAPI.getProjects();

  if (isErrorMessage(projects)) throw new Error(projects.message);

  const props: Props = {
    projects,
  };

  return { props };
};

export default ProjectsOverview;
