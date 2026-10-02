import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { MotionObserver } from "@/components/MotionObserver";
import { Tactile } from "@/components/Tactile";
import { services } from "@/components/ServicesSection";
import { JsonLd, shareImage, siteUrl } from "@/lib/seo";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Wyzie: Software, Websites and IT, Built and Kept Working";

const description =
  "Wyzie builds, sets up and runs business technology: custom software, websites, VoIP phone systems, networks, security, cloud and IT support.";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: title,
    template: "%s | Wyzie",
  },
  description,
  keywords: [
    "Wyzie",
    "bespoke software",
    "custom software development",
    "web development",
    "website design",
    "VoIP phone systems",
    "business phone systems",
    "network setup",
    "IT security",
    "remote work setup",
    "endpoint security",
    "IT support",
    "managed IT services",
    "Microsoft 365",
    "Google Workspace",
    "API development",
    "MVP development",
    "Cloudflare Workers",
    "TypeScript",
    "Go",
    "software consulting",
    "Wyzie Subs",
    "Kilter",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Wyzie",
    type: "website",
    locale: "en_US",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1218",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wyzie.io/#organization",
      name: "Wyzie",
      legalName: "Wyzie LLC",
      url: "https://wyzie.io",
      email: "hello@wyzie.io",
      logo: {
        "@type": "ImageObject",
        url: "https://wyzie.io/favicon.png",
      },
      sameAs: ["https://github.com/wyziedevs", "https://discord.gg/2mxraHBVtB"],
      description,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.body,
            provider: { "@id": "https://wyzie.io/#organization" },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://wyzie.io/#website",
      url: "https://wyzie.io",
      name: "Wyzie",
      publisher: { "@id": "https://wyzie.io/#organization" },
      description,
    },
  ],
};

/*
 * Marks the page as animating before the first paint, so an entrance never
 * shows its final state and then jumps back to replay it. A reader who asked
 * for less motion is never marked, and neither is one without JavaScript:
 * for both, every word is simply on the page. If the observer never starts,
 * the deadline shows everything anyway.
 */
const motionScript = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.dataset.motion='on';setTimeout(function(){if(!d.dataset.observed){document.querySelectorAll('.reveal').forEach(function(e){e.dataset.shown=''})}},3000)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={openSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <JsonLd data={jsonLd} />
      </head>
      <body>
        <MotionObserver />
        <Tactile />
        {children}
      </body>
    </html>
  );
}
