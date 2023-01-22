import client from "@sanity/client";

export default client({
  projectId: "e4pnrhsc",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-21",
});
