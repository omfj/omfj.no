import { groq } from "next-sanity";

export const FETCH_SLUGS_BY_TYPE_QUERY = groq`
*[_type == $type && defined(slug.current) && !(_id in path('drafts.**'))] {
  "slug": slug.current
}
`;
