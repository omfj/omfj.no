import {StructureBuilder} from "sanity/desk";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId() ?? ""),
      ),
    ]);
