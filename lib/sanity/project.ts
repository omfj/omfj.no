import { groq } from "next-sanity";
import { z } from "zod";

import { serverFetch } from "./client";

export const categorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  color: z.string(),
});

export const projectSchema = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  title: z.string(),
  slug: z.string(),
  body: z.array(z.any()),
  categories: z.array(categorySchema),
});

export const projectOverviewSchema = projectSchema.omit({
  body: true,
});

export const categoryWithProjectsSchema = categorySchema.extend({
  projects: z.array(projectOverviewSchema),
});

export const fetchProjectOverviews = async () => {
  const query = groq`
    *[_type == "project" && !(_id in path('drafts.**'))] | order(_updatedAt asc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "categories": categories[]->{
        _id,
        "slug": slug.current,
        title,
        "color": color.hex,
      },
    }
    `;

  return projectOverviewSchema.array().parse(await serverFetch(query));
};

export const fetchProjectBySlug = async (slug: string) => {
  const query = groq`
    *[_type == "project" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "categories": categories[]->{
        _id,
        "slug": slug.current,
        title,
        "color": color.hex,
      },
      body
    }
    `;

  const params = {
    slug,
  };

  return projectSchema.parse(await serverFetch(query, params));
};

export const fetchProjectsByCategory = async (categorySlug: string) => {
  const query = groq`
    *[_type == "category" && slug.current == $categorySlug && !(_id in path('drafts.**'))] {
      _id,
      title,
      "slug": slug.current,
      "color": color.hex,
      "projects": *[_type == "project" && references(^._id) && !(_id in path('drafts.**'))] {
          _id,
          _createdAt,
          _updatedAt,
          title,
          "slug": slug.current,
          "categories": categories[]->{
            _id,
            "slug": slug.current,
            title,
            "color": color.hex,
          }
        }
    }[0]
    `;

  const params = {
    categorySlug,
  };

  return categoryWithProjectsSchema.parse(await serverFetch(query, params));
};
