import {createClient} from "next-sanity";

export const sanityClient = createClient({
  projectId: "28zlbntv",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
});
