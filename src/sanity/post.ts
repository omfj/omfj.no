import { array } from "typescript-json-decoder";
import { SanityAPI } from "./api";
import { postDecoder, slugDecoder } from "./decoders";
import { ErrorMessage, Post } from "./types";

const PostAPI = {
  getPosts: async (): Promise<Array<Post> | ErrorMessage> => {
    try {
      const query = `
                *[_type == "post"] {
                    title,
                    body,
                    "slug": slug.current,
                    description,
                    categories,
                    _id,
                }`;

      const result = await SanityAPI.fetch(query);

      return array(postDecoder)(result);
    } catch (error) {
      console.log(error);
      return { message: "Failed to get posts." };
    }
  },
  getPaths: async (): Promise<Array<string>> => {
    try {
      const query = `
                *[_type == "post"] {
                    "slug": slug.current,
                }`;

      const result = await SanityAPI.fetch(query);

      return array(slugDecoder)(result).map((nestedSlug) => nestedSlug.slug);
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getPostBySlug: async (slug: string): Promise<Post | ErrorMessage> => {
    try {
      const query = `
                *[_type == "post" && slug.current == "${slug}"] {
                    title,
                    body,
                    "slug": slug.current,
                    description,
                    _id,
                }`;

      const result = await SanityAPI.fetch(query);

      if (result.length === 0) {
        return { message: "Could not find post" };
      }

      return array(postDecoder)(result)[0];
    } catch (error) {
      console.log(error);
      return { message: "Failed to get post." };
    }
  },
};

export { PostAPI };
