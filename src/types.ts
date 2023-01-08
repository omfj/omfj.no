export interface Frontmatter {
  title: string;
  description: string;
  lastUpdated: string;
  links?: Record<string, string>;
}

export interface ThoughtFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  links?: Record<string, string>;
}
