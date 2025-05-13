import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

/*
 * Generate a unique slug from a given title
 * @param title - The title to generate a slug from
 * @returns A slugified string with a UUID suffix
*/

export const generateSlug = (title: string): string => {
  const slugBase = slugify(title, { lower: true, strict: true });
  const uniqueSuffix = uuidv4().split("-")[0];

  return `${slugBase}-${uniqueSuffix}`;
};