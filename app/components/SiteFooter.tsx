import Link from "next/link";

import { siteProfile } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © 2026 {siteProfile.name} · {siteProfile.location}
      </p>
      <p>
        <Link href={siteProfile.sourceHref}>{siteProfile.sourceLabel}</Link>
      </p>
    </footer>
  );
}
