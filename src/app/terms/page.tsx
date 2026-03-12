import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of wyzie.io and Wyzie consulting services.",
  alternates: { canonical: "https://wyzie.io/terms" },
};

const lastUpdated = "March 11, 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Navigation />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-32 w-full">
        <div className="text-center mb-10">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-xs text-[#3a4050] mt-2">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              By accessing or using wyzie.io (the &quot;Site&quot;) or engaging Wyzie for consulting or
              development services (collectively, the &quot;Services&quot;), you agree to be bound by these
              Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms in their entirety, you
              must not use the Site or engage our Services. These Terms apply to all visitors,
              prospective clients, and clients engaging Wyzie for any work.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. Description of Services</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Wyzie is a technology solutions company offering bespoke software development, open source
              development, and technology consulting &amp; custom development services. This Site serves as a
              marketing and contact surface for those Services. We reserve the right to modify,
              expand, or discontinue any offered Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. Consulting Engagements</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
              Any consulting or custom development engagement is governed by the specific written
              agreement or statement of work (&quot;SOW&quot;) entered into between you and Wyzie. In the
              absence of a signed SOW, these Terms apply as the default agreement. You acknowledge
              that:
            </p>
            <ul className="text-sm text-[#94a3b8] leading-relaxed list-disc pl-5 space-y-1">
              <li>
                Pricing, deliverables, timelines, and payment schedules are agreed upon in writing
                prior to commencement of work.
              </li>
              <li>
                Payments due under any engagement are non-refundable once the corresponding work has
                been delivered or the relevant milestone has been reached, unless otherwise agreed in
                writing.
              </li>
              <li>
                Scope changes requested after commencement may be subject to additional fees and
                revised timelines, to be agreed in writing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Intellectual Property</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              All content, trademarks, logos, and other intellectual property displayed on this Site
              are the exclusive property of Wyzie or its licensors. Unless otherwise agreed in a
              signed SOW, work product produced under a consulting engagement is owned by Wyzie until
              full payment has been received, at which point ownership transfers to the client as
              specified in the SOW. Open source projects published by Wyzie are licensed under their
              respective stated licenses (e.g., MIT). No other license is granted by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Confidentiality</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Each party agrees to keep confidential any non-public information disclosed by the other
              party during a consulting engagement, including but not limited to business plans,
              technical specifications, pricing, and proprietary methodologies (&quot;Confidential
              Information&quot;). Confidential Information shall not be disclosed to any third party or used
              for any purpose other than performing the engagement, except with the disclosing
              party&apos;s prior written consent or as required by law. This obligation survives termination
              of the engagement for a period of two (2) years.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">6. Termination</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
              Either party may terminate a consulting engagement by providing fourteen (14) days&apos;
              written notice to the other party. In the event of termination:
            </p>
            <ul className="text-sm text-[#94a3b8] leading-relaxed list-disc pl-5 space-y-1">
              <li>
                The client shall pay for all work completed and expenses incurred up to the effective
                date of termination.
              </li>
              <li>
                Wyzie shall deliver all completed or in-progress work product for which payment has
                been received.
              </li>
              <li>
                Either party may terminate immediately if the other party materially breaches these
                Terms or a signed SOW and fails to cure the breach within seven (7) days of written
                notice.
              </li>
            </ul>
            <p className="text-sm text-[#94a3b8] leading-relaxed mt-3">
              Wyzie reserves the right to suspend or terminate access to this Site at any time, with
              or without cause, and without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">7. Acceptable Use of This Site</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">
              You agree not to use this Site in any way that:
            </p>
            <ul className="text-sm text-[#94a3b8] leading-relaxed list-disc pl-5 space-y-1">
              <li>Violates any applicable local, national, or international law or regulation.</li>
              <li>
                Attempts to scrape, crawl, or extract content from this Site in an automated or
                unauthorized manner.
              </li>
              <li>
                Transmits spam, unsolicited commercial communications, or abusive content via our
                contact channels.
              </li>
              <li>Impersonates Wyzie or any of its representatives.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">8. Third-Party Links</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              This Site contains links to third-party websites (including GitHub, npm, and our
              documentation site). These links are provided for convenience only. Wyzie does not
              control and is not responsible for the content, privacy practices, or availability of
              any third-party site. Accessing linked sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              THIS SITE AND ALL CONTENT HEREIN IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. We do not
              warrant that this Site will be uninterrupted, error-free, or free of viruses or other
              harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              10. Limitation of Liability
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WYZIE AND ITS OPERATORS SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THIS SITE OR OUR
              SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR
              TOTAL AGGREGATE LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12)
              MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">11. Indemnification</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              You agree to indemnify, defend, and hold harmless Wyzie and its operators from and against
              any claims, liabilities, damages, losses, and expenses (including reasonable legal fees)
              arising out of or in any way connected with your use of this Site, your violation of
              these Terms, or your infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              12. Modifications to Terms
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              We reserve the right to update or modify these Terms at any time. Changes will be posted
              on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after any
              such changes constitutes your acceptance of the new Terms. It is your responsibility to
              review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">
              13. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United
              States of America, without regard to conflict-of-law principles. By using the Site, you
              consent to personal jurisdiction in the United States. Any dispute arising under these
              Terms shall first be subject to good-faith negotiation between the parties for a period of
              thirty (30) days. If the dispute remains unresolved, it shall be submitted to binding
              arbitration administered under the rules of the American Arbitration Association (AAA).
              The seat of arbitration shall be New York, New York, USA. Proceedings will be conducted
              in the English language, with any resulting award being final and enforceable in any court
              of competent jurisdiction. You agree that all proceedings shall be conducted on an
              individual basis; you expressly waive any right to participate in a class action,
              consolidated arbitration, or any other representative proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">14. Age Requirements</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              You must be at least 13 years of age to use this Site. By using the Site, you represent
              and warrant that you meet this minimum age requirement. We do not knowingly permit
              individuals under the age of 13 to access the Site. If we become aware that a user is
              under 13, we will immediately disable their access and delete any associated personal data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">15. Force Majeure</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Wyzie shall not be liable for any failure or delay in the performance of Services
              resulting from causes beyond our reasonable control, including but not limited to acts of
              God, natural disasters, pandemics, war, civil unrest, terrorism, government action,
              changes in law, internet or telecommunications outages, third-party infrastructure
              failures, power failures, or any other event outside our reasonable control. Our
              obligations under any engagement are suspended for the duration of such an event and we
              will use reasonable efforts to resume normal service as promptly as practicable.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">16. Severability</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              If any provision of these Terms is found by a court of competent jurisdiction to be
              invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent
              necessary to make it enforceable, or severed from the Terms entirely if modification is
              not possible. The invalidity or unenforceability of any provision shall not affect the
              validity or enforceability of the remaining provisions, which shall continue in full force
              and effect.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">17. No Waiver</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              No failure or delay by Wyzie in exercising any right or remedy under these Terms shall
              operate as a waiver of that right or remedy. A waiver of any breach shall not constitute
              a waiver of any subsequent or continuing breach.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">18. Entire Agreement</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              These Terms of Service, together with our{" "}
              <a href="/privacy" className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors">
                Privacy Policy
              </a>, constitute the entire agreement between you and Wyzie with respect to your use of
              this Site. They supersede all prior and contemporaneous agreements, representations,
              warranties, and understandings relating to the subject matter hereof. Any engagement for
              consulting or development services is additionally governed by the applicable signed SOW.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">19. Contact</h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              If you have questions about these Terms, please contact us at{" "}
              <a
                href="mailto:hello@wyzie.io"
                className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
              >
                hello@wyzie.io
              </a>{" "}
              or via our{" "}
              <a
                href="/contact"
                className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
              >
                contact page
              </a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
