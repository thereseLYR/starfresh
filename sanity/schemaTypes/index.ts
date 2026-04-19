import { type SchemaTypeDefinition } from "sanity";
import { careerSchema } from "./career";
import { constellationSchema } from "./constellation";
import { historySchema } from "./history";
import { speciesSchema } from "./species";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [constellationSchema, speciesSchema, historySchema, careerSchema],
};
