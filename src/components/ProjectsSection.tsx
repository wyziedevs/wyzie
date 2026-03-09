import { Github, ExternalLink, Star } from "lucide-react";

const projects = [
  {
    name: "Wyzie Subs",
    description:
      "Free, open-source subtitle scraping API. Supports multiple languages, formats, and sources. No auth required — just fetch and go.",
    tags: ["TypeScript", "Nitro", "Cloudflare Workers", "REST API"],
    github: "https://github.com/wyziedevs/wyzie-subs",
    demo: "https://sub.wyzie.ru",
    docs: "https://docs.wyzie.ru",
    status: "active",
    featured: true,
  },
  {
    name: "Wyzie Lib",
    description:
      "Official TypeScript/JavaScript client library for the Wyzie Subs API. Fully typed, tree-shakable, and zero-dependency.",
    tags: ["TypeScript", "npm", "Vite", "Library"],
    github: "https://github.com/wyziedevs/wyzie-lib",
    demo: null,
    docs: "https://docs.wyzie.ru",
    status: "active",
    featured: true,
  },
  {
    name: "Wyzie Worker",
    description:
      "Edge worker infrastructure for routing, caching, and traffic management. Powers the Wyzie API network globally.",
    tags: ["TypeScript", "Cloudflare Workers", "Edge"],
    github: "https://github.com/wyziedevs/wyzie-worker",
    demo: null,
    docs: null,
    status: "active",
    featured: false,
  },
  {
    name: "i6.shark",
    description:
      "High-performance HTTP proxy written in Go with a Python management layer. Built for speed and reliability at scale.",
    tags: ["Go", "Python", "Proxy", "Infrastructure"],
    github: "https://github.com/wyziedevs/i6.shark",
    demo: null,
    docs: null,
    status: "active",
    featured: false,
  },
  {
    name: "Wyzie Store",
    description:
      "Feature-rich frontend for the Wyzie services. Built with SvelteKit, TailwindCSS, and deployed on Cloudflare Pages.",
    tags: ["SvelteKit", "Tailwind", "TypeScript"],
    github: "https://github.com/wyziedevs/wyzie-store",
    demo: null,
    docs: null,
    status: "active",
    featured: false,
  },
  {
    name: "Wyzie Docs",
    description:
      "Documentation site for the full Wyzie toolset. Built with Nextra / Guider and deployed on Vercel.",
    tags: ["Next.js", "Nextra", "Documentation"],
    github: "https://github.com/wyziedevs/wyzie-docs",
    demo: "https://docs.wyzie.ru",
    docs: null,
    status: "active",
    featured: false,
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500/15 text-green-400 border-green-500/20",
  beta: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  archived: "bg-gray-500/15 text-gray-400 border-gray-500/20",
};

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3">
            Open Source
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            What we&apos;ve shipped
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            All our projects are open-source and freely available on GitHub
            under the Wyzie organization.
          </p>
        </div>

        {/* Featured projects — larger cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project) => (
            <ProjectCard key={project.name} project={project} large />
          ))}
        </div>

        {/* Other projects — smaller cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((project) => (
            <ProjectCard key={project.name} project={project} large={false} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/wyziedevs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/6 text-sm text-[#94a3b8] hover:text-white transition-all"
          >
            <Github className="w-4 h-4" />
            View all projects on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
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
    <div className={`group relative flex flex-col rounded-xl bg-[#0d0d16] border border-white/8 p-5 overflow-hidden glow-card ${large ? "p-6" : ""}`}>
      {/* Featured star */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <Star className="w-3.5 h-3.5 text-yellow-500/60 fill-yellow-500/60" />
        </div>
      )}

      {/* Top area */}
      <div className="flex items-start gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-white font-bold leading-snug ${large ? "text-base" : "text-sm"}`}>
              {project.name}
            </h3>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          <p className={`text-[#94a3b8] leading-relaxed ${large ? "text-sm" : "text-xs"}`}>
            {project.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded bg-white/5 border border-white/6 text-[11px] text-[#64748b] font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 border-t border-white/6 pt-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-white transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          Source
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live
          </a>
        )}
        {project.docs && (
          <a
            href={project.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Docs
          </a>
        )}
      </div>
    </div>
  );
}
