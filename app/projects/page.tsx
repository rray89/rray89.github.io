import type { Metadata } from "next";

import { projects, siteProfile } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projects",
  description: siteProfile.projectsDescription,
};

export default function ProjectsPage() {
  return (
    <main id="top">
      <section className="page-intro">
        <h1>Projects</h1>
        <p className="lede">{siteProfile.projectsIntro}</p>
      </section>

      <section className="project-list">
        {projects.map((project) => (
          <article key={project.title} className="project">
            <header className="project-head">
              <h2>{project.title}</h2>
              <p className="project-meta">{project.meta}</p>
            </header>
            <div className="project-body">
              {project.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="project-links">
                <a href={project.repoUrl} rel="noopener">
                  View on GitHub
                </a>
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
