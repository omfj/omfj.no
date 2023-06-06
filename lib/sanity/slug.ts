import { groq } from "next-sanity";

import { serverFetch } from "./client";

export const fetchSlugsByType = async (type: string) => {
  const query = groq`
  *[_type == $type && defined(slug.current)
    && !(_id in path('drafts.**'))] {
    "slug": slug.current
  }
    `;

  const params = {
    type,
  };

  return await serverFetch<Array<{ slug: string }>>(query, params);
};
