import { array } from 'typescript-json-decoder';
import { SanityAPI } from './api';
import { categoryDecoder } from './decoders';
import { ErrorMessage, Category } from './types';

const CategoryAPI = {
    getProjects: async (): Promise<Array<Category> | ErrorMessage> => {
        try {
            const query = `
                *[_type == "category"] {
                    title,
                    _id,
                    description,
                    "color": color.hex,
                }`;

            const result = await SanityAPI.fetch(query);

            return array(categoryDecoder)(result);
        } catch (error) {
            console.log(error);
            return { message: "Failed to get categories." }
        }
    },
};

export { CategoryAPI };