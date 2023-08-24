import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  color: z.string(),
});

export const projectSchema = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  title: z.string(),
  slug: z.string(),
  body: z.array(z.any()),
  categories: z.array(categorySchema),
});

export const projectOverviewSchema = projectSchema.omit({
  body: true,
});

export const categoryWithProjectsSchema = categorySchema.extend({
  projects: z.array(projectOverviewSchema),
});

export type ProjectOverview = z.infer<typeof projectOverviewSchema>;
