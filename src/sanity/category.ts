import { array } from 'typescript-json-decoder';
import { SanityAPI } from './api';
import { slugDecoder, categoryDecoder, projectByCategoryDecoder,  } from './decoders';
import { ErrorMessage, Category, ProjectByCategory } from './types';

const CategoryAPI = {
    getCategories: async (): Promise<Array<Category> | ErrorMessage> => {
        try {
            const query = `
                *[_type == "category"] {
                    _id,
                    "color": color.hex,
                    emoji,
                    title,
                    description,
                }`;

            const result = await SanityAPI.fetch(query);

            return array(categoryDecoder)(result);
        } catch (error) {
            console.log(error);
            return { message: "Failed to get categories." }
        }
    },
    getPaths: async (): Promise<Array<string>> => {
        try {
            const query = `
                *[_type == "category"] {
                    "slug": slug.current,
                }`;

            const result = await SanityAPI.fetch(query);

            return array(slugDecoder)(result).map((nestedSlug) => nestedSlug.slug);
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getProjectsByCategory: async (slug: string): Promise<ProjectByCategory | ErrorMessage> => {
        try {
            const query = `
            *[_type == "category" && slug.current == "${slug}"] {
                title,
                description,
                emoji,
                "color": color.hex,
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
            }`

            const result = await SanityAPI.fetch(query);

            return array(projectByCategoryDecoder)(result)[0];
        } catch (error) {
            console.log(error);
            return { message: "Failed to get projects by slug." }
        }
    }
};

export { CategoryAPI };