// src/app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: "https://www.adataha.com.tr/sitemap.xml",
    host: "https://www.adataha.com.tr",
  }
}
