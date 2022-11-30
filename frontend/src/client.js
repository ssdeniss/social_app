import sanityClient from "@sanity/client";
import imageBuilder from "@sanity/image-url";
import { projectID, sanityToken } from "./constants/API";

export const client = sanityClient({
  projectId: projectID,
  dataset: "production",
  apiVersions: "2022-11-29",
  useCdn: true,
  token: sanityToken,
});

const builder = imageBuilder(client);
export const urlFor = (source) => builder.image(source);
