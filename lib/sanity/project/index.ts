import { sanityFetch } from "../client";
import {
  FETCH_PROJECT_BY_CATEGORY_QUERY,
  FETCH_PROJECT_BY_SLUG_QUERY,
  FETCH_PROJECT_OVERVIEWS_QUERY,
} from "./queries";
import {
  categoryWithProjectsSchema,
  projectOverviewSchema,
  projectSchema,
} from "./types";

export const fetchProjectOverviews = async () => {
  const response = await sanityFetch({
    query: FETCH_PROJECT_OVERVIEWS_QUERY,
    tags: ["project-overviews"],
  });

  return projectOverviewSchema.array().parse(response);
};

export const fetchProjectBySlug = async (slug: string) => {
  const response = await sanityFetch({
    query: FETCH_PROJECT_BY_SLUG_QUERY,
    params: {
      slug,
    },
    tags: [`project-${slug}`],
  });

  return projectSchema.parse(response);
};

export const fetchProjectsByCategory = async (slug: string) => {
  const response = await sanityFetch({
    query: FETCH_PROJECT_BY_CATEGORY_QUERY,
    params: {
      slug,
    },
    tags: [`category-${slug}`],
  });

  return categoryWithProjectsSchema.parse(response);
};
