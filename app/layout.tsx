import type { Metadata } from "next";

import BloomCanvas from "@/app/components/BloomCanvas";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { ibmPlexMono, inter } from "@/app/fonts";
import "@/app/globals.css";
import { siteProfile } from "@/lib/site-content";

const themeScript = `
(() => {
  const storageKey = "portfolio-theme";
  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.documentElement.dataset.theme = savedTheme || preferredTheme;
})();
`;

export const metadata: Metadata = {
  title: {
    default: siteProfile.name,
    template: `%s — ${siteProfile.name}`,
  },
  description: siteProfile.homeDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable}`}>
        <BloomCanvas />
        <div className="page">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
