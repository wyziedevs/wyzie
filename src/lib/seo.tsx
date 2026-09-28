import type { Metadata } from "next";

export const siteUrl = "https://wyzie.io";

/* The card a shared link shows (public/og.png, rendered from the hero). */
export const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Wyzie: Technology Built for Business. Software, websites, phones, networks, security and IT support.",
};

/*
 * A page's metadata, whole: its title, description and canonical address,
 * and the same for link previews. A page's own `openGraph` replaces the
 * layout's rather than merging with it, so every field is set here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Wyzie`,
      description,
      url,
      siteName: "Wyzie",
      type: "website",
      locale: "en_US",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Wyzie`,
      description,
      images: [shareImage],
    },
  };
}

/* The trail Google shows in place of a bare URL: Home, then the page. */
export function breadcrumbs(title: string, path: `/${string}`) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${siteUrl}${path}`,
      },
    ],
  };
}

/** Structured data for search engines, as a JSON-LD script. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
