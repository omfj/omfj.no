import { z, defineCollection } from "astro:content";
import { projectSchema } from "./_schemas";

const projectCollection = defineCollection({
  schema: projectSchema,
});

export const collections = {
  project: projectCollection,
};
