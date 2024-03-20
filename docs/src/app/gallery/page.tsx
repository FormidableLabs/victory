import { getGallery } from "@/static-config-helpers/md-data-transforms";
import { Content } from "./gallery-list";

export default async function Gallery() {
  const gallery = await getGallery();

  // NOTE: JSON magic is required when passing data to client components
  return <Content gallery={JSON.parse(JSON.stringify(gallery))} />;
}
