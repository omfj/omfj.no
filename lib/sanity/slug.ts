import {ErrorMessage} from "@/utils/error";
import {sanityClient} from "./client";

export const fetchSlugsByType = async (type: string): Promise<Array<string> | ErrorMessage> => {
  try {
    const query = `
    *[_type == $type && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
    `;

    const params = {
      type,
    };

    return await sanityClient.fetch(query, params);
  } catch {
    return {
      message: "Failed to fetch slugs.",
    };
  }
};
