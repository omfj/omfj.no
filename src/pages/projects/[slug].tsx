import { ParsedUrlQuery } from "querystring";
import { Center, Text, Spinner, Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ProjectAPI } from "../../sanity/project";
import { isErrorMessage, Project } from "../../sanity/types";
import Main from "../../components/main";
import SEO from "../../components/SEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  project: Project;
}

const ProjectPage = ({ project }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <>
      {router.isFallback && (
        <Center>
          <Spinner />
        </Center>
      )}
      {!router.isFallback && (
        <>
          <SEO title={"project - " + project.title} />
          <Main w="100%">
            <Center fontSize="2xl">{project.title}</Center>
            <Box m="5" w="100%">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.body}
              </ReactMarkdown>
            </Box>
            {project.categories && <Text>Det er katogrier og!</Text>}
          </Main>
        </>
      )}
    </>
  );
};

const getStaticPaths: GetStaticPaths = async () => {
  const paths = await ProjectAPI.getPaths();
  return {
    paths: paths.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const project = await ProjectAPI.getProjectBySlug(slug);

  if (isErrorMessage(project)) {
    if (project.message === "404") {
      return {
        notFound: true,
      };
    }
    throw new Error(project.message);
  }

  const props: Props = {
    project,
  };

  return {
    props,
  };
};

export default ProjectPage;
export { getStaticProps, getStaticPaths };
