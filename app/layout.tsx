import type { Metadata } from "next";

import BloomCanvas from "@/app/components/BloomCanvas";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { ibmPlexMono, inter } from "@/app/fonts";
import "@/app/globals.css";
import { siteProfile } from "@/lib/site-content";
import { STORAGE_KEY } from "@/lib/theme";

const themeScript = `
(() => {
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  let theme = preferredTheme;
  try {
    const savedTheme = window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    }
  } catch {}
  document.documentElement.dataset.theme = theme;
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
