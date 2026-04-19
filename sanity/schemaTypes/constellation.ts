import { defineField, defineType } from "sanity";

export const constellationSchema = defineType({
  name: "constellation",
  title: "Constellation",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "symbol", title: "Symbol", type: "string" }),
    defineField({ name: "flavourText", title: "Flavour Text", type: "string" }),
    defineField({
      name: "modifiers",
      title: "Modifiers",
      type: "text",
      description: "Minor / Major / In Domain / In Opposition lines",
    }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number" }),
    // Compendium
    defineField({ name: "lore", title: "Lore", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "name", subtitle: "flavourText" } },
});
