import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "array",
      of: [{ type: "socialMedia" }],
    }),
  ],
});
