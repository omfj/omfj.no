import { groq } from "next-sanity";

export const FETCH_PROJECT_OVERVIEWS_QUERY = groq`
*[_type == "project" && !(_id in path('drafts.**'))] | order(_updatedAt asc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "categories": categories[]->{
    _id,
    "slug": slug.current,
    title,
    "color": color.hex,
  },
}
`;

export const FETCH_PROJECT_BY_SLUG_QUERY = groq`
*[_type == "project" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "categories": categories[]->{
    _id,
    "slug": slug.current,
    title,
    "color": color.hex,
  },
  body
}
`;

export const FETCH_PROJECT_BY_CATEGORY_QUERY = groq`
*[_type == "category" && slug.current == $slug && !(_id in path('drafts.**'))] {
  _id,
  title,
  "slug": slug.current,
  "color": color.hex,
  "projects": *[_type == "project" && references(^._id) && !(_id in path('drafts.**'))] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "categories": categories[]->{
        _id,
        "slug": slug.current,
        title,
        "color": color.hex,
      }
    }
}[0]
`;
