import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialMedia",
  title: "Social Media",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
    }),
    defineField({
      name: "handle",
      title: "Handle",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
  ],
});
