export type NavItem = {
  label: string;
  href: "/" | "/projects/";
};

export type SocialLink = {
  label: string;
  href: string;
  kind: "github" | "x" | "linkedin" | "email";
};

export type ProjectEntry = {
  title: string;
  meta: string;
  paragraphs: string[];
  repoUrl: string;
};

export type SiteProfile = {
  name: string;
  location: string;
  heroTitle: string;
  heroIntro: string;
  heroBody: string;
  homeDescription: string;
  projectsDescription: string;
  projectsIntro: string;
  avatarSrc: string;
  avatarAlt: string;
  sourceHref: string;
  sourceLabel: string;
};

export const siteProfile: SiteProfile = {
  name: "Chao Wang",
  location: "Vancouver, BC",
  heroTitle: "Hi, I'm Chao.",
  heroIntro:
    "Android engineer with six years of experience, based in Vancouver. Ex-IBM, ex-Salesforce.",
  heroBody:
    "These days I'm exploring AI: I run a multi-agent setup around OpenClaw, keep Codex and Claude Code open daily for side projects, and spend a lot of time sharpening the workflow around all of it.",
  homeDescription:
    "Personal homepage for Chao Wang — Android engineer based in Vancouver.",
  projectsDescription: "Selected projects by Chao Wang.",
  projectsIntro:
    "A few things I've been building — mostly mobile, occasionally desktop when an idea needs somewhere quieter to live.",
  avatarSrc: "/avatar.jpg",
  avatarAlt: "Portrait of Chao Wang",
  sourceHref: "https://github.com/rray89/rray89.github.io",
  sourceLabel: "Source",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/rray89", kind: "github" },
  { label: "X (Twitter)", href: "https://x.com/rray06dev", kind: "x" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chao-wang-5778b527/",
    kind: "linkedin",
  },
  { label: "Email", href: "mailto:rray.halifax@gmail.com", kind: "email" },
];

export const projects: ProjectEntry[] = [
  {
    title: "IronPath",
    meta: "Android · Kotlin · Jetpack Compose",
    paragraphs: [
      "A training tracker for people who want their strength work to feel less like spreadsheet homework. You plan sessions ahead of time, log the actual work as you go, and the app surfaces progress without nagging you to open it.",
      'Built around a small set of domain concepts — plans, sessions, records — with a Compose UI, a repository-backed data layer, and a focus on the "quiet reliability" feel: no streak shame, no popups, just a clear picture of what you did.',
    ],
    repoUrl: "https://github.com/rray89/IronPath",
  },
  {
    title: "Rhythm",
    meta: "macOS · Swift",
    paragraphs: [
      "A small macOS reminder that helps you keep a steady focus-and-rest rhythm at your desk. It's the app I wanted after noticing that most pomodoro timers either nag too loudly or disappear into the menu bar and never come back.",
      "Rhythm keeps the cadence visible in a calm, peripheral way, and gets out of the way when you're actually in flow.",
    ],
    repoUrl: "https://github.com/rray89/rhythm",
  },
];
