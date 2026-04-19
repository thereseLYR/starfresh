import { defineField, defineType } from "sanity";

export const historySchema = defineType({
  name: "history",
  title: "History",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "symbol", title: "Symbol", type: "string" }),
    defineField({ name: "flavourText", title: "Flavour Text", type: "string" }),
    defineField({ name: "effects", title: "Effects", type: "string" }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number" }),
    // Compendium
    defineField({ name: "lore", title: "Lore", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "name", subtitle: "flavourText" } },
});
