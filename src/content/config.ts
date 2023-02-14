import { z, defineCollection } from "astro:content";
import { projectSchema, thoughtSchema } from "./_schemas";

const projectCollection = defineCollection({
  schema: projectSchema,
});

const thoughtCollection = defineCollection({
  schema: thoughtSchema,
});

export const collections = {
  project: projectCollection,
  thought: thoughtCollection,
};
