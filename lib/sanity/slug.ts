import {serverFetch} from "./client";

export const fetchSlugsByType = async (type: string) => {
  const query = `
    *[_type == $type && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
    `;

  const params = {
    type,
  };

  return await serverFetch<Array<{slug: string}>>(query, params);
};
