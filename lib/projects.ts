import {
  array,
  date,
  decodeType,
  record,
  string,
} from 'typescript-json-decoder';
import { authorDecoder } from './author';
import { categoryDecoder } from './category';
import SanityAPI from './sanity';
import { slugDecoder } from './utils';

const projectOverviewDecoder = record({
  _id: string,
  _updatedAt: date,
  slug: string,
  title: string,
  description: string,
  categories: array(categoryDecoder),
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
  categories: array(categoryDecoder),
  externalLinks: array(
    record({
      _key: string,
      title: string,
      link: string,
    }),
  ),
});

type Project = decodeType<typeof projectDecoder>;

const projectMetaDataDecoder = record({
  _id: string,
  _updatedAt: date,
  slug: string,
  title: string,
  description: string,
  author: authorDecoder,
});

type ProjectMetaData = decodeType<typeof projectMetaDataDecoder>;

interface PageProps {
  params?: any;
}

interface IProjectAPI {
  getOverview: (category?: string) => Promise<Array<ProjectOverview>>;
  getSlugs: () => Promise<Array<string>>;
  getProject: (slug: string) => Promise<Project>;
  getProjectMetaData: (slug: string) => Promise<ProjectMetaData>;
}

const ProjectAPI: IProjectAPI = {
  getOverview: async (): Promise<Array<ProjectOverview>> => {
    const query = `
      *[_type == "project" && !(_id in path('drafts.**'))] | order(_updateAt desc) {
        _id,
        _updatedAt,
        "slug": slug.current,
        title,
        description,
        categories[] -> {
          _id,
          "color": color.hex,
          emoji,
          title,
          "slug": slug.current,
        },
      }
    `;

    const resp = await SanityAPI.fetch(query);

    return array(projectOverviewDecoder)(resp);
  },
  getSlugs: async (): Promise<Array<string>> => {
    const query = `
      *[_type == "project"] {
        "slug": slug.current,
      }
    `;

    const resp = await SanityAPI.fetch(query);

    const projectSlugs = array(slugDecoder)(resp);

    return projectSlugs.map((project) => project.slug);
  },
  getProject: async (slug: string): Promise<Project> => {
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

    return projectDecoder(resp[0]);
  },
  getProjectMetaData: async (slug: string): Promise<ProjectMetaData> => {
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
        description,
        "author": author -> {
          _id,
          name,
          email,
          "slug": slug.current,
          "imageUrl": image.asset -> url
        },
      }
    `;

    const resp = await SanityAPI.fetch(query);

    return projectMetaDataDecoder(resp[0]);
  },
};

export default ProjectAPI;
export { projectDecoder, projectOverviewDecoder };
export type { Project, ProjectOverview, PageProps };
