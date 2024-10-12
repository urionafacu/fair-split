import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fair Split",
    short_name: "FairSplit",
    description: "A Progressive Web App for couples to manage shared expenses",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-ico",
      },
    ],
  };
}
