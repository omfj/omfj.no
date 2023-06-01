import type {PortableTextBlock} from "@portabletext/types";

import {serverFetch} from "./client";

type ProjectOverview = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  categories: Array<{
    _id: string;
    slug: string;
    title: string;
    color: string;
  }>;
};

export const fetchProjectOverviews = async () => {
  const query = `
    *[_type == "project" && !(_id in path('drafts.**'))] | order(_updatedAt asc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "categories": categories[]->{
        _id,
        slug,
        title,
        "color": color.hex,
      },
    }
    `;

  return await serverFetch<Array<ProjectOverview>>(query);
};

type Project = {
  _createdAt: string;
  _updatedAt: string;
  title: string;
  categories: Array<{_id: string; slug: string; title: string}>;
  body: Array<PortableTextBlock>;
};

export const fetchProjectBySlug = async (slug: string) => {
  const query = `
    *[_type == "project" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
      _createdAt,
      _updatedAt,
      title,
      "categories": categories[]->{
        _id,
        "slug": slug.current,
        title,
      },
      body
    }
    `;

  const params = {
    slug,
  };

  return await serverFetch<Project>(query, params);
};

export const fetchProjectsByCategory = async (category: string) => {
  const query = `
    *[_type == "project" && references(*[_type == "category" && slug.current == $category]._id) && !(_id in path('drafts.**'))] | order(_updatedAt asc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "categories": categories[]->{
        _id,
        slug,
        title,
        "color": color.hex,
      },
    }
    `;

  const params = {
    category,
  };

  return await serverFetch<Array<ProjectOverview>>(query, params);
};
