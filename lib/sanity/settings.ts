import type { PortableTextBlock } from "@portabletext/types";

import { serverFetch } from "./client";

export type SiteSettings = {
  title: string;
  description: Array<PortableTextBlock>;
};

export const fetchSiteSettings = async () => {
  const query = `
    *[_type == "siteSettings"][0] {
      title,
      description,
    }
    `;

  return await serverFetch<SiteSettings>(query);
};
