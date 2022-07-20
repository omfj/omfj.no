import { array } from "typescript-json-decoder";
import { SanityAPI } from "./api";
import {
  projectDecoder,
  projectOverviewDecoder,
  slugDecoder,
} from "./decoders";
import { ErrorMessage, Project, ProjectOverview } from "./types";

const ProjectAPI = {
  getProjects: async (): Promise<Array<Project> | ErrorMessage> => {
    try {
      const query = `
                *[_type == "project"] | order(title) {
                    _id,
                    _updatedAt,
                    "slug": slug.current,
                    title,
                    body,
                    description,
                    "image": image.asset -> url,
                    categories[] -> {
                        _id,
                        title,
                        "slug": slug.current,
                        emoji,
                        "color",
                        description
                    },
                    externalLinks[] {
                        _key,
                        title,
                        link
                    },
                }`;

      const result = await SanityAPI.fetch(query);

      if (result.length === 0) {
        return { message: "404" };
      }

      return array(projectDecoder)(result);
    } catch (error) {
      console.log(error);
      return { message: "Failed to get projects." };
    }
  },
  getPaths: async (): Promise<Array<string>> => {
    try {
      const query = `
                *[_type == "project"] {
                    "slug": slug.current,
                }`;

      const result = await SanityAPI.fetch(query);

      return array(slugDecoder)(result).map((nestedSlug) => nestedSlug.slug);
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getProjectOverview: async (): Promise<
    Array<ProjectOverview> | ErrorMessage
  > => {
    try {
      const query = `
                *[_type == "project"] | order(_updatedAt) {
                    _id,
                    "slug": slug.current,
                    title,
                    body,
                    description,
                    categories[] -> {
                        _id,
                        title,
                        "slug": slug.current,
                        emoji,
                        "color": color.hex,
                        description
                    },
                }
            `;

      const result = await SanityAPI.fetch(query);

      return array(projectOverviewDecoder)(result);
    } catch (error) {
      console.log(error);
      return { message: "Failed to get projects overview" };
    }
  },
  getProjectBySlug: async (slug: string): Promise<Project | ErrorMessage> => {
    try {
      const query = `
                *[_type == "project" && slug.current == "${slug}"] {
                    _id,
                    _updatedAt,
                    "slug": slug.current,
                    title,
                    body,
                    description,
                    "author": author -> {
                        _id,
                        name,
                        email,
                        "slug": slug.current,
                        "imageUrl": image.asset -> url
                    },
                    categories[] -> {
                        _id,
                        "color": color.hex,
                        emoji,
                        title,
                        "slug": slug.current,
                        description,
                    },
                    externalLinks[] {
                        _key,
                        title,
                        link
                    },
                }`;

      const result = await SanityAPI.fetch(query);

      if (result.length === 0) {
        return { message: "404" };
      }

      return array(projectDecoder)(result)[0];
    } catch (error) {
      console.log(error);
      return { message: "Failed to get project by slug." };
    }
  },
};

export { ProjectAPI };
