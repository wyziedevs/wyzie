const stats = [
  { value: "10M+", label: "API Requests Served", sublabel: "and counting" },
  { value: "99.9%", label: "Uptime SLA", sublabel: "across all services" },
  { value: "6+", label: "Open Source Projects", sublabel: "MIT licensed" },
  { value: "Global", label: "Edge Network", sublabel: "Cloudflare powered" },
];

export function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center py-10 px-6 bg-[#050508] hover:bg-[#0d0d16] transition-colors"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2563eb] mb-1 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#64748b]">{stat.sublabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
