import { array } from 'typescript-json-decoder';
import { SanityAPI } from './api';
import { projectDecoder, slugDecoder } from './decoders';
import { ErrorMessage, Project } from './types';

const ProjectAPI = {
    getProjects: async (): Promise<Array<Project> | ErrorMessage> => {
        try {
            const query = `
                *[_type == "project"] {
                    title,
                    body,
                    "slug": slug.current,
                    description,
                    categories,
                    _id,
                }`;

            const result = await SanityAPI.fetch(query);

            return array(projectDecoder)(result);
        } catch (error) {
            console.log(error);
            return { message: "Failed to get projects." }
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
            console.log(error); // eslint-disable-line
            return [];
        }
    },
    getProjectBySlug: async (slug: string): Promise<Project | ErrorMessage> => {
        try {
            const query = `
                *[_type == "project" && slug.current == "${slug}"] {
                    title,
                    body,
                    "slug": slug.current,
                    description,
                    categories,
                    _id,
                }`;

            const result = await SanityAPI.fetch(query);

            if (result.length === 0) {
                return { message: "Could not find project" }
            }

            return array(projectDecoder)(result)[0];
        } catch (error) {
            console.log(error);
            return { message: "Failed to get project." }
        }
    },
};

export { ProjectAPI };