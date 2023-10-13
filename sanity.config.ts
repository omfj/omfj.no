import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemas";
import { defaultDocumentNode } from "./lib/default-document-node";
import { deskStructure } from "./lib/desk-structure";

export default defineConfig({
  name: "default",
  title: "omfj.no",
  basePath: "/studio",

  projectId: "28zlbntv",
  dataset: "production",

  plugins: [
    deskTool({
      structure: (S) => deskStructure(S),
      defaultDocumentNode,
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
