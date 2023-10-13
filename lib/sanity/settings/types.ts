import { PortableTextBlock } from "@portabletext/types";

export type SocialMedia = {
  _key: string;
  platform: string;
  handle: string;
  url: string;
};

export type SiteSettings = {
  title: string;
  description: Array<PortableTextBlock>;
  socialMedia: Array<SocialMedia>;
};
