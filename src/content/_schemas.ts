import { z } from "astro:content";

export const projectSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    lastUpdated: z.string().transform((s) => new Date(s)),
  })
  .strict();
export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export const thoughtSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    pubDate: z.string().transform((s) => new Date(s)),
  })
  .strict();
export type ThoughtFrontmatter = z.infer<typeof thoughtSchema>;
