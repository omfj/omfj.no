import { sanityFetch } from "../client";
import { FETCH_SITE_SETTINGS_QUERY } from "./queries";
import { SiteSettings } from "./types";

export const fetchSiteSettings = async () => {
  return await sanityFetch<SiteSettings>({
    query: FETCH_SITE_SETTINGS_QUERY,
    tags: ["site-settings"],
  });
};
