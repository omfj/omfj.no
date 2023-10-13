import { groq } from "next-sanity";

export const FETCH_SITE_SETTINGS_QUERY = groq`
*[_type == "siteSettings"][0] {
  title,
  description,
  socialMedia,
}
`;
