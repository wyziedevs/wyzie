"use client";

import { useState } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem, motion } from "./Motion";
import { AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "Wyzie Subs",
    description:
      "Enterprise-grade subtitle API serving millions of requests. Supports multiple languages, formats, and sources with zero-config integration.",
    tags: ["TypeScript", "Nitro", "Cloudflare Workers", "REST API"],
    github: "https://github.com/wyziedevs/wyzie-subs",
    demo: "https://sub.wyzie.io",
    docs: "https://docs.wyzie.io",
    status: "active",
    featured: true,
  },
  {
    name: "sudo-flix",
    description:
      "A fully open-source movie and TV streaming web app. Fast, modern, and community maintained.",
    tags: ["TypeScript", "React", "Open Source"],
    github: "https://github.com/sudo-flix/sudo-flix",
    demo: null,
    docs: "https://docs.undi.rest",
    status: "sunset",
    featured: true,
  },
  {
    name: "Wyzie Lib",
    description:
      "Official TypeScript/JavaScript SDK for seamless Wyzie Subs integration. Fully typed, tree-shakable, and zero-dependency.",
    tags: ["TypeScript", "npm", "Vite", "Library"],
    github: "https://github.com/wyziedevs/wyzie-lib",
    demo: null,
    docs: "https://docs.wyzie.io",
    status: "active",
    featured: false,
  },
  {
    name: "i6.shark",
    description:
      "High-throughput HTTP proxy in Go with a Python management layer. Built for speed and reliability.",
    tags: ["Go", "Python", "Proxy", "Infrastructure"],
    github: "https://github.com/wyziedevs/i6.shark",
    demo: null,
    docs: null,
    status: "active",
    featured: false,
  },
  {
    name: "coderaft",
    description:
      "A modern collaborative code editor built for real-time pair programming and team workflows.",
    tags: ["TypeScript", "Collaboration", "Editor"],
    github: "https://github.com/itzcozi/coderaft",
    demo: null,
    docs: null,
    status: "active",
    featured: false,
  },
  {
    name: "tinybones",
    description:
      "A lightweight, minimal boilerplate for spinning up new projects fast without the bloat.",
    tags: ["TypeScript", "Boilerplate", "Tooling"],
    github: "https://github.com/itzcozi/tinybones",
    demo: null,
    docs: null,
    status: "active",
    featured: false,
  },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
  beta: "bg-yellow-500/10 text-yellow-400 border-yellow-500/15",
  archived: "bg-gray-500/10 text-gray-400 border-gray-500/15",
  sunset: "bg-red-500/10 text-red-400 border-red-500/15",
};

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-16 sm:py-28 relative section-glow">
      <div className="section-divider absolute top-0 inset-x-0" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12 sm:mb-20">
          <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Open Source
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5">
            Shipped at Scale
          </h2>
          <p className="text-text-muted text-lg max-w-lg mx-auto leading-relaxed">
            Community-driven projects powering millions of requests daily. All
            open-source and freely available.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-5 mb-5"
          staggerDelay={0.15}
        >
          {featured.map((project) => (
            <StaggerItem key={project.name}>
              <ProjectCard project={project} large />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-5"
            >
              <StaggerContainer
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                staggerDelay={0.08}
              >
                {rest.map((project) => (
                  <StaggerItem key={project.name}>
                    <ProjectCard project={project} large={false} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {!showAll && (
          <Reveal className="flex justify-center mt-3">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm text-text-muted hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-border-subtle hover:border-white/[0.12] transition-all duration-300 cursor-pointer active:translate-y-px"
            >
              Show more projects
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </Reveal>
        )}

        {showAll && (
          <Reveal className="mt-12 text-center">
            <a
              href="https://github.com/wyziedevs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] text-sm text-text-muted hover:text-white transition-all duration-300 active:translate-y-px"
            >
              View all on GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  large,
}: {
  project: (typeof projects)[number];
  large: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl bg-bg-surface border border-border-subtle overflow-hidden glow-card h-full ${large ? "p-6" : "p-5"}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3
              className={`text-white font-bold leading-snug ${large ? "text-base" : "text-sm"}`}
            >
              {project.name}
            </h3>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${statusColors[project.status]}`}
            >
              {project.status}
            </span>
          </div>
          <p
            className={`text-text-muted leading-relaxed break-words ${large ? "text-sm" : "text-xs"}`}
          >
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded bg-white/[0.03] border border-border-subtle text-[11px] text-text-subtle font-mono hover:bg-white/[0.06] hover:border-border-muted transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.05] pt-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm sm:text-xs py-1 text-text-subtle hover:text-white transition-colors duration-300"
        >
          <Github className="w-3.5 h-3.5" />
          Source Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm sm:text-xs py-1 text-text-subtle hover:text-white transition-colors duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        )}
        {project.docs && (
          <a
            href={project.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm sm:text-xs py-1 text-text-subtle hover:text-white transition-colors duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Docs
          </a>
        )}
      </div>
    </div>
  );
}
