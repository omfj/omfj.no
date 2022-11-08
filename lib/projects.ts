import {
  array,
  date,
  decodeType,
  record,
  string,
} from 'typescript-json-decoder';
import { authorDecoder } from './author';
import SanityAPI from './sanity';

const projectOverviewDecoder = record({
  _id: string,
  _updatedAt: date,
  slug: string,
  title: string,
  description: string,
});

type ProjectOverview = decodeType<typeof projectOverviewDecoder>;

const projectDecoder = record({
  _id: string,
  _updatedAt: date,
  slug: string,
  title: string,
  description: string,
  body: string,
  author: authorDecoder,
  categories: array(
    record({
      _id: string,
      color: string,
      emoji: string,
      slug: string,
      title: string,
    }),
  ),
  externalLinks: array(
    record({
      _key: string,
      title: string,
      link: string,
    }),
  ),
});

type Project = decodeType<typeof projectDecoder>;

const projectSlugDecoder = record({
  slug: string,
});

const ProjectAPI = {
  getProjectsOverview: async (): Promise<Array<ProjectOverview>> => {
    const query = `
              *[_type == "project" && !(_id in path('drafts.**'))] | order(title) {
                _id,
                _updatedAt,
                "slug": slug.current,
                title,
                description,
              }
              `;

    const resp = await SanityAPI.fetch(query);

    const projectOverview = array(projectOverviewDecoder)(resp);

    return projectOverview;
  },
  getProjectSlugs: async (): Promise<Array<string>> => {
    const query = `
              *[_type == "project"] {
                "slug": slug.current,
              }
              `;

    const resp = await SanityAPI.fetch(query);

    const projectSlugs = array(projectSlugDecoder)(resp);

    const slugs = projectSlugs.map((project) => project.slug);

    return slugs;
  },
  getProjectBySlug: async (slug: string): Promise<Project> => {
    const query = `
              *[
                  _type == "project" &&
                  !(_id in path('drafts.**')) &&
                  slug.current == "${slug}"
              ] {
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
                },
                externalLinks[] {
                    _key,
                    title,
                    link
                },
              }
              `;

    const resp = await SanityAPI.fetch(query);

    const project = projectDecoder(resp[0]);

    return project;
  },
};

export default ProjectAPI;
export { projectDecoder, projectOverviewDecoder };
export type { Project, ProjectOverview };
