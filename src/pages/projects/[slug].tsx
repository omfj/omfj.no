import { ParsedUrlQuery } from "querystring";
import { Center, Text, Spinner, VStack, Flex } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ProjectAPI } from "../../sanity/project";
import { Category, isErrorMessage, Project } from "../../sanity/types";
import Main from "../../components/main";
import SEO from "../../components/SEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "../../../styles/markdown-styles.module.css";
import Construction from "../../components/construction";
import { zuluTimeToHuman } from "../../lib/date-functions";

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
          <Main>
            {project.body ? (
              <>
                <VStack mt="5" spacing="8">
                  <Center fontSize="2xl">{project.title}</Center>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className={style.reactmarkdown}
                  >
                    {project.body}
                  </ReactMarkdown>
                  <Text fontWeight="extrabold">
                    Last Updated: {zuluTimeToHuman(project._updatedAt)}
                  </Text>
                  <Flex>
                    {project.categories.map((category: Category) => (
                      <Text
                        key={category._id}
                        bg={category.color + "33"}
                        py="1"
                        px="3"
                        mx="1"
                        fontSize="0.85rem"
                        borderRadius="20"
                        w="fit-content"
                      >
                        {category.title}
                      </Text>
                    ))}
                  </Flex>
                </VStack>
              </>
            ) : (
              <Construction title={project.title} />
            )}
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
