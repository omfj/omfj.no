import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import {colorInput} from "@sanity/color-input";
import {visionTool} from "@sanity/vision";

import {schemaTypes} from "./schemas";
import {deskStructure} from "./src/desk-structure";

export default defineConfig({
  name: "default",
  title: "omfj.no",

  projectId: "28zlbntv",
  dataset: "production",

  plugins: [
    deskTool({
      structure: (S) => deskStructure(S),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
