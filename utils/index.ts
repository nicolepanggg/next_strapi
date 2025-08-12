import { Metadata } from "next";
import { JsonArray, JsonObject } from "type-fest";
import { StrapiDocument, StrapiSingleResponse, WithStrapiSeo } from "@/types";

// TODO: install lodash for just the merge util?
export function merge(obj1: JsonObject, obj2: JsonObject): JsonObject {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (Array.isArray(obj2[key]) && Array.isArray(obj1[key])) {
        obj1[key] = [...obj1[key], ...obj2[key]] as JsonArray;
      } else if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        obj1[key] = merge(obj1[key] as JsonObject, obj2[key] as JsonObject);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}

export function createGenerateMetadata<T extends WithStrapiSeo<StrapiDocument>>(
  getContent: () => Promise<StrapiSingleResponse<T>>,
): () => Promise<Metadata> {
  return async function generateMetadata(): Promise<Metadata> {
    const title = (await getContent()).data.seo.metaTitle;
    const description = (await getContent()).data.seo.metaDescription;
    return { title, description };
  };
}
