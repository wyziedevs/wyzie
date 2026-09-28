import { pageMetadata } from "@/lib/seo";
import { CompanyPage, TextLink } from "@/components/Company";
import { GroupHeading, Rows } from "@/components/ProjectsSection";
import { Headline, Reveal } from "@/components/ui";
import { catalog } from "@/lib/projects";

export const metadata = pageMetadata({
  title: "Open Source",
  description:
    "The code Wyzie publishes: i6.shark, coderaft, our starter stack and more, each with its repository.",
  path: "/open-source",
});

/* Everything in the catalog with public code, in its own group. */
const groups = catalog
  .map((g) => ({ ...g, entries: g.entries.filter((e) => e.source) }))
  .filter((g) => g.entries.length > 0);

export default function OpenSourcePage() {
  return (
    <CompanyPage
      title="Open Source"
      current="/open-source"
      lead={
        <p>
          Much of what we build is public: read the code, use it in your own
          work, or send a fix. It is also the easiest way to judge how we work
          before you hire us.
        </p>
      }
    >
      <section className="sweep border-t border-line">
        <div className="mx-auto w-full max-w-page px-4 py-section sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Headline text="Why It Is Public" />
            </div>
            <Reveal delay={120} className="lg:col-span-8">
              <div className="max-w-reading space-y-5 text-standfirst text-ink-muted">
                <p>
                  Public code keeps us honest. Anyone can check how i6.shark
                  handles a request, how our starter stack is put together, or
                  how coderaft keeps a project&apos;s code on the host.
                </p>
                <p>
                  Licenses are set per repository. Wyzie Lib, Wyzie Proxy and
                  i6.shark are MIT licensed; for the rest, check the license in
                  the repository. The Wyzie Subs API itself is closed source,
                  used with a key as{" "}
                  <TextLink href="https://docs.wyzie.io">documented</TextLink>.
                </p>
                <p>
                  Everything lives on{" "}
                  <TextLink href="https://github.com/wyziedevs">
                    GitHub
                  </TextLink>
                  . Issues and pull requests are welcome.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-section flex flex-col gap-14">
            {groups.map((group) => (
              <Reveal key={group.group}>
                <div className="border-b border-line pb-3">
                  <GroupHeading group={group} />
                </div>
                <Rows entries={group.entries} flushTop />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </CompanyPage>
  );
}
