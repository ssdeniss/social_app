import sanityClient from "@sanity/client";
import imageBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "",
  dataset: "production",
  apiVersions: "2022-11-29",
  useCdn: true,
  token: "",
});

const builder = imageBuilder(client);
export const urlFor = (source) => builder.image(source);
