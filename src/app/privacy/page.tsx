import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Wyzie collects, uses, and protects your information.",
  alternates: { canonical: "https://wyzie.io/privacy" },
};

const lastUpdated = "March 11, 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-base">
      <Navigation />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-32 w-full">
        <div className="text-center mb-10">
          <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-text-subtle mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              1. Overview
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              This Privacy Policy describes how Wyzie (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects and handles
              information when you visit wyzie.io (the &quot;Site&quot;). Wyzie
              is a technology solutions company operated by an individual based
              in the United States of America. We are committed to collecting
              only the minimum information necessary to operate this Site. We do
              not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              2. Information We Collect
            </h2>

            <h3 className="text-sm font-semibold text-white/80 mb-1 mt-4">
              2a. Information you provide directly
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-2">
              This Site does not collect personal information through
              server-side forms. The contact form on our{" "}
              <a
                href="/contact"
                className="text-blue-light hover:text-blue-pale transition-colors"
              >
                Contact page
              </a>{" "}
              opens your local mail client via a{" "}
              <code className="text-xs bg-white/[0.08] px-1 py-0.5 rounded">
                mailto:
              </code>{" "}
              link. No data is submitted to our servers. Any correspondence you
              send to us by email is retained solely for the purpose of
              responding to your inquiry.
            </p>

            <h3 className="text-sm font-semibold text-white/80 mb-1 mt-4">
              2b. Information collected automatically
            </h3>
            <ul className="text-sm text-text-muted leading-relaxed list-disc pl-5 space-y-1">
              <li>
                <strong className="text-white/70">Browser / device data</strong>
                : standard web server logs (IP address, browser type, referring
                URL, pages visited) may be processed for security monitoring and
                abuse prevention. This data is handled by Cloudflare as part of
                our infrastructure and is not stored by Wyzie directly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              3. How We Use Your Information
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-3">
              We use the limited information we have access to for the following
              purposes:
            </p>
            <ul className="text-sm text-text-muted leading-relaxed list-disc pl-5 space-y-1">
              <li>To respond to inquiries submitted via email.</li>
              <li>To maintain the security and integrity of this Site.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              4. Third-Party Services
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-3">
              This Site relies on the following third-party infrastructure:
            </p>
            <ul className="text-sm text-text-muted leading-relaxed list-disc pl-5 space-y-1">
              <li>
                <strong className="text-white/70">Cloudflare</strong>: provides
                DNS, CDN, and DDoS protection for this Site. Cloudflare may
                process request metadata (IP address, headers) as part of this
                service. Their privacy policy is at{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-light hover:text-blue-pale transition-colors"
                >
                  cloudflare.com/privacypolicy
                </a>
                .
              </li>
            </ul>
            <p className="text-sm text-text-muted leading-relaxed mt-3">
              We do not sell, rent, or trade your personal information to
              advertisers or data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              5. Data Retention
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              We do not operate a database of visitor information on this Site.
              Email correspondence sent to us is retained only as long as
              necessary to respond to your inquiry and is not shared with third
              parties. You may request deletion of any correspondence by
              contacting us at{" "}
              <a
                href="mailto:hello@wyzie.io"
                className="text-blue-light hover:text-blue-pale transition-colors"
              >
                hello@wyzie.io
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              6. Security
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              We implement reasonable technical and organisational measures to
              protect the information we hold. All data in transit is encrypted
              via HTTPS. However, no system is completely secure. We cannot
              guarantee the absolute security of your information and are not
              liable for breaches that are outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              7. Cookies &amp; Tracking Technologies
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              This Site does not use cookies, local storage, or any client-side
              tracking technologies. We do not use analytics services,
              advertising pixels, or fingerprinting techniques. Cloudflare may
              set a strictly necessary security cookie (
              <code className="text-xs bg-white/[0.08] px-1 py-0.5 rounded">
                __cf_bm
              </code>
              ) to manage bot traffic. This is controlled by Cloudflare and is
              not used by Wyzie for tracking purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              8. International Data Transfers
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              This Site is hosted and served through Cloudflare&apos;s global
              network, which means your request data may be processed in
              countries outside your own, including the United States.
              Cloudflare maintains appropriate safeguards for international
              transfers of data. By using this Site, you acknowledge and consent
              to the processing of your data in the United States and other
              jurisdictions where Cloudflare operates.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              The Service is not directed to individuals under the age of 13. We
              do not knowingly collect personal information from children. If
              you believe a child has provided us with personal information,
              please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              10. Your Rights
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="text-sm text-text-muted leading-relaxed list-disc pl-5 space-y-1">
              <li>
                <strong className="text-white/70">Access</strong>: request a
                copy of the personal data we hold about you.
              </li>
              <li>
                <strong className="text-white/70">Correction</strong>: request
                correction of inaccurate or incomplete data.
              </li>
              <li>
                <strong className="text-white/70">Deletion</strong>: request
                deletion of your personal data, subject to legal or operational
                retention obligations.
              </li>
              <li>
                <strong className="text-white/70">Restriction</strong>: request
                that we restrict the processing of your data pending a
                correction or objection.
              </li>
              <li>
                <strong className="text-white/70">Portability</strong>: receive
                your personal data in a structured, commonly used,
                machine-readable format.
              </li>
            </ul>
            <p className="text-sm text-text-muted leading-relaxed mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:hello@wyzie.io"
                className="text-blue-light hover:text-blue-pale transition-colors"
              >
                hello@wyzie.io
              </a>
              . We will respond to verifiable requests within 45 days. We may
              need to verify your identity before processing a request.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              11. California Residents (CCPA / CPRA)
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-3">
              If you are a California resident, the California Consumer Privacy
              Act (CCPA) as amended by the California Privacy Rights Act (CPRA)
              grants you additional rights:
            </p>
            <ul className="text-sm text-text-muted leading-relaxed list-disc pl-5 space-y-1">
              <li>
                <strong className="text-white/70">Right to Know</strong>: the
                categories and specific pieces of personal information we have
                collected about you, the purposes for collection, and with whom
                we share it.
              </li>
              <li>
                <strong className="text-white/70">Right to Delete</strong>:
                request deletion of personal information we have collected,
                subject to certain exceptions (e.g., completing a transaction,
                security, legal obligations).
              </li>
              <li>
                <strong className="text-white/70">Right to Correct</strong>:
                request correction of inaccurate personal information we
                maintain about you.
              </li>
              <li>
                <strong className="text-white/70">
                  Right to Opt-Out of Sale or Sharing
                </strong>
                : we do not sell or share personal information with third
                parties for cross-context behavioral advertising.
              </li>
              <li>
                <strong className="text-white/70">
                  Right to Limit Use of Sensitive Personal Information
                </strong>
                : we do not use sensitive personal information for any purpose
                beyond what is described in this policy.
              </li>
              <li>
                <strong className="text-white/70">
                  Right to Non-Discrimination
                </strong>
                : we will not deny you service, charge you a different price, or
                provide a different level of service for exercising your CCPA
                rights.
              </li>
            </ul>
            <p className="text-sm text-text-muted leading-relaxed mt-3">
              To submit a California privacy request, email us at{" "}
              <a
                href="mailto:hello@wyzie.io"
                className="text-blue-light hover:text-blue-pale transition-colors"
              >
                hello@wyzie.io
              </a>{" "}
              with the subject line &quot;California Privacy Request&quot;. We
              will respond within 45 days as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              12. Data Breach Notification
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              In the event of a data breach that is reasonably likely to result
              in harm to affected individuals, we will notify impacted users
              without unreasonable delay and in accordance with applicable US
              state breach notification laws. Notification will include: a
              description of the nature and scope of the breach, the categories
              of personal data affected, the likely consequences, and the
              measures we have taken or propose to take to address and mitigate
              the breach.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              13. Limitation of Liability
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WYZIE AND ITS
              OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
              LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE
              LOSSES, ARISING OUT OF OR IN CONNECTION WITH ANY SECURITY BREACH
              OR ANY OTHER SECURITY INTRUSION. IN NO EVENT SHALL OUR TOTAL
              AGGREGATE LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID TO US IN THE
              TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              14. Changes to This Policy
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated &quot;Last updated&quot;
              date. Your continued use of the Service after any changes
              constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              15. Contact
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              For any privacy-related questions or data requests, contact us at{" "}
              <a
                href="mailto:hello@wyzie.io"
                className="text-blue-light hover:text-blue-pale transition-colors"
              >
                hello@wyzie.io
              </a>{" "}
              or via our{" "}
              <a
                href="/contact"
                className="text-blue-light hover:text-blue-pale transition-colors"
              >
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
