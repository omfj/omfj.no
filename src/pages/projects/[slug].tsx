import { ParsedUrlQuery } from "querystring";
import { Text, VStack, Flex, Heading, Box, Center } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { ProjectAPI } from "../../sanity/project";
import {
  Category,
  isErrorMessage,
  Project,
  ExternalLink,
} from "../../sanity/types";
import Main from "../../components/main";
import SEO from "../../components/SEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "../../../styles/markdown-styles.module.css";
import Construction from "../../components/construction";
import { zuluTimeToHuman } from "../../lib/date-functions";
import CategoryTag from "../../components/category-tag";
import ExternalLinkButton from "../../components/external-link";

interface Props {
  project: Project;
}

const ProjectPage = ({ project }: Props): JSX.Element => (
  <>
    <SEO title={"project - " + project.title} />
    <Main>
      {project.body ? (
        <>
          <VStack mt="5" spacing="8">
            <Heading textAlign="center">{project.title}</Heading>
            <Box maxW="600px">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={style.reactmarkdown}
              >
                {project.body}
              </ReactMarkdown>
            </Box>
            <Center gap={5} w="100%" flexWrap="wrap" m="auto">
              {project.externalLinks &&
                project.externalLinks.map((externalLink: ExternalLink) => (
                  <ExternalLinkButton
                    key={externalLink._key}
                    title={externalLink.title}
                    link={externalLink.link}
                  />
                ))}
            </Center>
            <Text fontWeight="extrabold">
              Last Updated: {zuluTimeToHuman(project._updatedAt)}
            </Text>
            <Center flexWrap="wrap" mt="2">
              {project.categories &&
                project.categories.map((category: Category) => (
                  <CategoryTag
                    key={category._id}
                    slug={category.slug}
                    color={category.color ?? "transparent"}
                    emoji={category.emoji ?? ""}
                    title={category.title}
                  />
                ))}
            </Center>
          </VStack>
        </>
      ) : (
        <Construction title={project.title} />
      )}
    </Main>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await ProjectAPI.getPaths();
  return {
    paths: paths.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
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
