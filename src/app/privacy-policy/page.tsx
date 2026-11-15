import type { ReactNode } from "react";
import { PageHero, container } from "@/components/ui";
import { formatAddress, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Update this date whenever the policy text changes. */
const LAST_UPDATED = "15 November 2026";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How STRINGR GLOBAL SERVICES collects, uses and protects personal information submitted through this website.",
  path: "/privacy-policy",
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-700">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const site = getSite();
  const { email } = site.contact;
  const list = "list-disc space-y-2 pl-6";

  return (
    <>
      <PageHero
        title="Privacy Policy"
        intro={`How ${site.name} handles personal information collected through this website.`}
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <div className={`${container} py-16 sm:py-20`}>
        <div className="max-w-3xl space-y-12 text-lg">
          <p className="text-base text-ink-500">Last updated: {LAST_UPDATED}</p>

          <Block title="Who we are">
            <p>
              This website is operated by {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;), located at{" "}
              {formatAddress(site)}. We are responsible for the personal information you provide through this website.
            </p>
          </Block>

          <Block title="Information we collect">
            <p>When you send a business inquiry through our contact form, we collect:</p>
            <ul className={list}>
              <li>your name, work email address and company name;</li>
              <li>your phone number, if you choose to provide it;</li>
              <li>the service you are interested in and the content of your message.</li>
            </ul>
            <p>
              Like most websites, our hosting infrastructure may also record technical information such as IP address,
              browser type and the pages requested, in order to keep the website secure and working correctly.
            </p>
          </Block>

          <Block title="How we use your information">
            <ul className={list}>
              <li>to respond to your inquiry and discuss our services with you;</li>
              <li>to prepare proposals or take other steps you request before entering into an agreement;</li>
              <li>to protect the website against misuse, spam and security threats.</li>
            </ul>
            <p>We do not sell your personal information, and we do not use it for unrelated marketing.</p>
          </Block>

          <Block title="Cookies and tracking">
            <p>
              This website does not use advertising or analytics cookies. If this changes, we will update this policy
              and, where required, ask for your consent first.
            </p>
          </Block>

          <Block title="Sharing your information">
            <p>
              Inquiries are delivered to our team by email. We share personal information only with service providers
              that help us operate this website and our business communications, such as hosting and email providers,
              and only as far as needed for those purposes, or where we are required to do so by law.
            </p>
          </Block>

          <Block title="International transfers">
            <p>
              We are based in the Philippines. If you contact us from another country, including the United Kingdom,
              your information will be transferred to and processed in the Philippines and in the locations of our
              service providers.
            </p>
          </Block>

          <Block title="How long we keep it">
            <p>
              We keep inquiry information only for as long as needed to respond to you, to manage any resulting
              business relationship, and to meet our legal obligations. You can ask us to delete it at any time.
            </p>
          </Block>

          <Block title="Your rights">
            <p>
              Depending on where you are located, data protection laws such as the Philippine Data Privacy Act of 2012
              and the UK General Data Protection Regulation may give you the right to access, correct or delete your
              personal information, to object to or restrict its use, and to lodge a complaint with your data
              protection authority.
            </p>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${email}`} className="font-semibold text-brand-700 underline underline-offset-2">
                {email}
              </a>
              .
            </p>
          </Block>

          <Block title="Changes to this policy">
            <p>
              We may update this policy from time to time. The latest version will always be available on this page,
              with the date it was last updated.
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}
