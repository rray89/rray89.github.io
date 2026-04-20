"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/app/components/ThemeToggle";
import { navItems, siteProfile } from "@/lib/site-content";

function normalizePath(path: string) {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname ?? "/");

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={`${siteProfile.name} — home`}>
        {siteProfile.name}
      </Link>

      <nav className="header-nav" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = normalizePath(item.href) === currentPath;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
