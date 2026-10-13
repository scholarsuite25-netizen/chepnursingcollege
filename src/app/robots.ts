import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/iloro", "/admin"],
      },
    ],
    sitemap: "https://chepnursingcollege.vercel.app/sitemap.xml",
  };
}
