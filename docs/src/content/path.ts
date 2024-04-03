import { RemarkDocument } from "@/static-config-helpers/remark-document";

// was gonna pass this but I'm leaning towards this being an internal detail since at the end of the day the proper
// behavior is based on a bunch of magic strings for a non-configurable internal method
const documentationSubcategories = ["charts", "containers", "more"];

export const getPathPrefix = (item: RemarkDocument["data"]) => {
  // just a bunch of one-offs, elegance is harder to realize gains from
  if (item.category === "introduction") {
    return item.slug === "getting-started" ? "/docs" : `/docs/${item.slug}`;
  }
  if (item.category === "support") {
    return "/docs/faq";
  }
  if (item.category === "documentation") {
    return "/docs/common-props";
  }
  const checkedCategory = documentationSubcategories.includes(item.category)
    ? "docs"
    : item.category;

  return `/${checkedCategory}/${item.slug}`;
};

// roughly the same as the above, but this is for the static generation
// and works in reverse. eventually we will refactor both of these away
// and rely only on frontmatter data to avoid all this magic
export const staticPathPrefix = (path: string): string => {
  if (path === "getting-started") {
    return "";
  }
  return path;
};
