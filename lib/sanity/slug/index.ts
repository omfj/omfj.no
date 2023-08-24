import { groq } from "next-sanity";

import { sanityFetch } from "../client";
import { FETCH_SLUGS_BY_TYPE_QUERY } from "./queries";
import { slugSchema } from "./types";

export const fetchSlugsByType = async (type: string) => {
  const response = await sanityFetch({
    query: FETCH_SLUGS_BY_TYPE_QUERY,
    params: {
      type,
    },
    tags: [`slugs-${type}`],
  });

  return slugSchema.array().parse(response);
};
