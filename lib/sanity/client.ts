import {createClient} from "next-sanity";

export const projectId = "28zlbntv";
export const dataset = "production";
export const apiVersion = "2021-03-25";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
