import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chepnursingcollege.vercel.app";
  const routes = [
    "",
    "/about",
    "/admission",
    "/admission/slip",
    "/exams",
    "/library",
    "/clinical-reflections",
    "/news",
    "/gallery",
    "/payment",
    "/contact",
    "/portal",
    "/portal/student",
    "/portal/faculty",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/news" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/admission" || route === "/exams" ? 0.9 : 0.8,
  }));
}
