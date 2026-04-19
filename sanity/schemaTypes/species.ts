import { defineField, defineType } from "sanity";

const FACTIONS = [
  { title: "January Conglomerate", value: "January Conglomerate" },
  { title: "Wyertian Caliphate", value: "Wyertian Caliphate" },
  { title: "Wurefon Empire", value: "Wurefon Empire" },
];

export const speciesSchema = defineType({
  name: "species",
  title: "Species",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "faction",
      title: "Faction",
      type: "string",
      options: { list: FACTIONS },
      validation: (r) => r.required(),
    }),
    defineField({ name: "flavourText", title: "Flavour Text", type: "string" }),
    defineField({
      name: "effects",
      title: "Effects",
      type: "string",
      description: "Stat modifiers and skills granted, e.g. MR +1 · SR +1 · Gain skill \"Exchange Student\"",
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number" }),
    // Compendium
    defineField({ name: "lore", title: "Lore", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] }),
  ],
  preview: {
    select: { title: "name", subtitle: "faction", media: "image" },
  },
});
