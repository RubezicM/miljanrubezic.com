import type { Metadata } from "next";
import type { ComponentSharedSeo } from "@/gql/graphql";
interface DefaultValues {
  title?: string;
  description?: string;
}
export function generateMetadataObject(
  seo: ComponentSharedSeo | null | undefined,
  defaultValues?: DefaultValues,
): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://miljanrubezic.com/";
  const locale = "en";

  const localeDefaults = {
    en: {
      title: "Miljan Rubezic — Full-stack Developer",
      description:
        "Full-stack dev Miljan Rubežić builds polished Next.js / React interfaces, custom WordPress" +
        " plugins, and seamless user experiences. Browse my portfolio.",
      keywords: [
        "Miljan Rubežić",
        "Full-stack developer",
        "Next.js developer",
        "React developer",
        "WordPress developer",
        "Web development",
        "Portfolio",
        "JavaScript",
        "TypeScript",
        "Frontend developer",
        "Backend developer",
        "Srbija",
        "Serbia",
      ],
      siteName: "Miljan Rubezic Portfolio",
      ogImageAlt: "Web developer Miljan Rubezic",
      businessName: "Miljan Rubezic",
      businessDescription:
        "Miljan Rubežić is a full-stack developer from Serbia, specializing in Next.js and WordPress.",
      serviceType: "Web Development Services",
      areaServed: "Serbia, Europe, Worldwide",
    },
  };

  const defaults = localeDefaults[locale as keyof typeof localeDefaults];
  const currentLocale = locale === "en" ? "en_US" : "sr_RS";

  return {
    metadataBase: new URL("https://miljanrubezic.com"),
    title: seo?.metaTitle || defaultValues?.title || defaults.title,
    description:
      seo?.metaDescription ||
      defaultValues?.description ||
      defaults.description,

    applicationName: defaults.siteName,
    authors: [{ name: "Miljan Rubezic", url: "https://github.com/RubezicM" }],
    // Language
    generator: "Next.js",
    // Keywords
    keywords: defaults.keywords,
    creator: "Miljan Rubezic",
    publisher: defaults.businessName,
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: [{ url: "/favicon.ico" }],
    },
    manifest: "/site.webmanifest",

    // Open Graph
    openGraph: {
      type: "website",
      locale: currentLocale,
      url: seo?.canonicalURL || `${baseUrl}/`,
      title:
        seo?.openGraph?.title ||
        seo?.metaTitle ||
        defaultValues?.title ||
        defaults.title,
      description:
        seo?.openGraph?.description ||
        seo?.metaDescription ||
        defaultValues?.description ||
        defaults.description,
      siteName: defaults.siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Miljan Rubezic Portfolio",
        },
      ],
    },
  };
}
