import { ParsedUrlQuery } from "querystring";
import { GetStaticProps } from "next";
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
import Construction from "../../components/construction";
import { zuluTimeToHuman } from "../../lib/date-functions";
import CategoryTag from "../../components/category-tag";
import ExternalLinkButton from "../../components/external-link";
import Heading from "../../components/heading";

interface Props {
  project: Project;
}

const ProjectPage = ({ project }: Props): JSX.Element => (
  <Main>
    {project.body ? (
      <>
        <SEO
          title={"project - " + project.title}
          author={`${project.author.name} <${project.author.email}>`}
        />
        <div className="flex flex-col mt-5 gap-8">
          <Heading>{project.title}</Heading>
          <div className="max-w-xl m-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="react-markdown"
            >
              {project.body}
            </ReactMarkdown>
          </div>
          <div className="flex w-full justify-center gap-5 flex-wrap m-auto">
            {project.externalLinks &&
              project.externalLinks.map((externalLink: ExternalLink) => (
                <ExternalLinkButton
                  key={externalLink._key}
                  title={externalLink.title}
                  link={externalLink.link}
                />
              ))}
          </div>
          <p className="font-extrabold text-center">
            Last Updated: {zuluTimeToHuman(project._updatedAt)}
          </p>
          <div className="flex-wrap mt-2 flex justify-center gap-5">
            {project.categories &&
              project.categories.map((category: Category) => (
                <CategoryTag
                  key={category._id}
                  slug={category.slug}
                  emoji={category.emoji ?? ""}
                  title={category.title}
                  style={{
                    backgroundColor: category.color + "22" ?? "transparent",
                  }}
                />
              ))}
          </div>
        </div>
      </>
    ) : (
      <Construction title={project.title} />
    )}
  </Main>
);

export const getStaticPaths = async () => {
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

  return {
    props: {
      project,
    },
  };
};

export default ProjectPage;
