import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero, container } from "@/components/ui";
import { formatAddress, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Update this date whenever the terms change. */
const LAST_UPDATED = "18 November 2026";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the STRINGR GLOBAL SERVICES website.",
  path: "/terms-of-use",
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-700">{children}</div>
    </section>
  );
}

export default function TermsOfUsePage() {
  const site = getSite();
  const { email } = site.contact;
  const list = "list-disc space-y-2 pl-6";
  const inline = "font-semibold text-brand-700 underline underline-offset-2";

  return (
    <>
      <PageHero
        title="Terms of Use"
        intro={`The terms that apply when you use the ${site.name} website.`}
        crumbs={[{ label: "Terms of Use" }]}
      />

      <div className={`${container} py-16 sm:py-20`}>
        <div className="max-w-3xl space-y-12 text-lg">
          <p className="text-base text-ink-500">Last updated: {LAST_UPDATED}</p>

          <Block title="About these terms">
            <p>
              This website is operated by {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;), located at{" "}
              {formatAddress(site)}. By using this website you agree to these terms. If you do not agree, please do not
              use the website.
            </p>
          </Block>

          <Block title="Information on this website">
            <p>
              The content of this website is provided for general information about our services. It does not form an
              offer or a contract. Any services we provide are governed by a separate written agreement or proposal
              agreed with you.
            </p>
            <p>
              We aim to keep the information accurate and up to date, but we do not guarantee that it is complete,
              current or free from errors, and we may change it at any time without notice.
            </p>
          </Block>

          <Block title="Acceptable use">
            <p>When using this website, you must not:</p>
            <ul className={list}>
              <li>use it in any way that is unlawful or fraudulent;</li>
              <li>attempt to gain unauthorised access to the website, its server or any connected system;</li>
              <li>send spam, malicious code or misleading information through the contact form;</li>
              <li>copy or scrape the website content by automated means without our permission.</li>
            </ul>
          </Block>

          <Block title="Intellectual property">
            <p>
              The {site.name} name, logo and the content of this website belong to us or our licensors. You may view
              and print pages for your own business reference, but you may not reproduce, modify or reuse them for any
              other purpose without our written permission.
            </p>
          </Block>

          <Block title="Links to other websites">
            <p>
              This website may link to other websites, such as our social media profiles. We are not responsible for the
              content or privacy practices of those websites.
            </p>
          </Block>

          <Block title="Liability">
            <p>
              To the extent permitted by law, we are not liable for any loss or damage arising from your use of, or
              inability to use, this website or from reliance on its content. Nothing in these terms limits any
              liability that cannot be limited by law.
            </p>
          </Block>

          <Block title="Privacy and cookies">
            <p>
              How we handle personal information is explained in our{" "}
              <Link href="/privacy-policy" className={inline}>
                Privacy Policy
              </Link>{" "}
              and our use of cookies in our{" "}
              <Link href="/cookie-policy" className={inline}>
                Cookie Policy
              </Link>
              .
            </p>
          </Block>

          <Block title="Governing law">
            <p>These terms are governed by the laws of the Republic of the Philippines.</p>
          </Block>

          <Block title="Changes and contact">
            <p>
              We may update these terms from time to time. The latest version will always be available on this page.
              If you have questions about these terms, email us at{" "}
              <a href={`mailto:${email}`} className={inline}>
                {email}
              </a>
              .
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}
