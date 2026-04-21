import type { ReactNode } from "react";

import { siteProfile, socialLinks } from "@/lib/site-content";

function getSocialIcon(kind: string): ReactNode {
  switch (kind) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.12-1.49-1.12-1.49-.91-.64.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.35 4.82-4.58 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.09V21H18.4v-5.52c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21H10V9Z" />
        </svg>
      );
    case "email":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        {/* Using a plain img here keeps the exported GitHub Pages build simple. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-avatar"
          src={siteProfile.avatarSrc}
          alt={siteProfile.avatarAlt}
          width={160}
          height={160}
        />
        <div className="hero-text">
          <h1>{siteProfile.heroTitle}</h1>
          <p className="lede">{siteProfile.heroIntro}</p>
          <p className="lede">{siteProfile.heroBody}</p>

          <ul className="social-list" aria-label="Social links">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} aria-label={link.label} rel="noopener">
                  {getSocialIcon(link.kind)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
