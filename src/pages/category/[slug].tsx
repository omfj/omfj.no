import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { CategoryAPI } from "../../sanity/category";
import {
  isErrorMessage,
  ProjectByCategory,
  ProjectOverview,
} from "../../sanity/types";
import Main from "../../components/main";
import SEO from "../../components/SEO";
import ProjectBox from "../../components/project-box";
import Heading from "../../components/heading";

interface Props {
  category: ProjectByCategory;
}

const CategoryPage = ({ category }: Props): JSX.Element => (
  <>
    <SEO title={"category - " + category.title} />
    <Main>
      <Heading style={{ backgroundColor: category.color + 33 }}>
        {"category - " + category.title}
      </Heading>
      <p className="p-3 mt-3">{category.description}</p>
      {category.projects.map((project: ProjectOverview) => (
        <ProjectBox
          key={project._id}
          title={project.title}
          desc={project.description}
          link={project.slug}
          categories={project.categories}
        />
      ))}
    </Main>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await CategoryAPI.getPaths();
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
  const category = await CategoryAPI.getProjectsByCategory(slug);

  if (isErrorMessage(category)) {
    if (category.message === "404") {
      return {
        notFound: true,
      };
    }
    throw new Error(category.message);
  }

  const props: Props = {
    category,
  };

  return {
    props,
  };
};

export default CategoryPage;
