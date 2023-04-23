import type {PortableTextBlock} from "@portabletext/types";

import {ErrorMessage} from "@/utils/error";
import {sanityClient} from "./client";

export type SiteSettings = {
  title: string;
  description: Array<PortableTextBlock>;
};

export const fetchSiteSettings = async (): Promise<SiteSettings | ErrorMessage> => {
  try {
    const query = `
    *[_type == "siteSettings"][0] {
      title,
      description,
    }
    `;

    const data = await sanityClient.fetch(query);

    return data;
  } catch {
    return {
      message: "Failed to fetch site settings",
    };
  }
};
