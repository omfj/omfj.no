import { array, decodeType, record, string } from 'typescript-json-decoder';
import { ProjectOverview, projectOverviewDecoder } from './projects';
import SanityAPI from './sanity';
import { slugDecoder } from './utils';

const categoryDecoder = record({
  _id: string,
  color: string,
  emoji: string,
  slug: string,
  title: string,
});

type Category = decodeType<typeof categoryDecoder>;

interface ICategoryAPI {
  getSlugs: () => Promise<Array<string>>;
  getProjects: (slug: string) => Promise<Array<ProjectOverview>>;
  getCategory: (slug: string) => Promise<Category>;
}

const CategoryAPI: ICategoryAPI = {
  getSlugs: async (): Promise<Array<string>> => {
    const query = `
      *[_type == "category"] {
        "slug": slug.current,
      }
    `;

    const resp = await SanityAPI.fetch(query);

    const projectSlugs = array(slugDecoder)(resp);

    return projectSlugs.map((project) => project.slug);
  },
  getProjects: async (slug: string): Promise<Array<ProjectOverview>> => {
    const query = `
      *[_type == "category" && slug.current == "${slug}"] {
        "projects": *[_type == "project" && references(^._id)] {
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
      }
    `;

    const resp = await SanityAPI.fetch(query);

    const res = array(record({ projects: array(projectOverviewDecoder) }))(
      resp,
    );

    console.log(res);

    return res[0].projects;
  },
  getCategory: async (slug: string): Promise<Category> => {
    const query = `
      *[_type == "category" && slug.current == "${slug}"] {
        _id,
        title,
        "slug": slug.current,
        emoji,
        "color": color.hex,
        description
      }
    `;

    const resp = await SanityAPI.fetch(query);

    return categoryDecoder(resp[0]);
  },
};

export default CategoryAPI;
export { categoryDecoder };
export type { Category };
