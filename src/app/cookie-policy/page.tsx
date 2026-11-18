import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero, container } from "@/components/ui";
import { getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Update this date whenever the policy text changes, and whenever cookies or tracking are added. */
const LAST_UPDATED = "18 November 2026";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How the STRINGR GLOBAL SERVICES website uses cookies and similar technologies.",
  path: "/cookie-policy",
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-700">{children}</div>
    </section>
  );
}

export default function CookiePolicyPage() {
  const site = getSite();
  const { email } = site.contact;
  const inline = "font-semibold text-brand-700 underline underline-offset-2";

  return (
    <>
      <PageHero
        title="Cookie Policy"
        intro={`How the ${site.name} website uses cookies and similar technologies.`}
        crumbs={[{ label: "Cookie Policy" }]}
      />

      <div className={`${container} py-16 sm:py-20`}>
        <div className="max-w-3xl space-y-12 text-lg">
          <p className="text-base text-ink-500">Last updated: {LAST_UPDATED}</p>

          <Block title="What cookies are">
            <p>
              Cookies are small text files that a website stores on your device. They are often used to remember
              preferences or to measure how visitors use a website.
            </p>
          </Block>

          <Block title="How we use cookies">
            <p>
              This website does not use advertising, analytics or tracking cookies, and it does not set any cookies of
              its own. You can browse the website and send us an inquiry without any cookies being stored for those
              purposes.
            </p>
            <p>
              Our hosting provider may process technical information, such as your IP address, to deliver the website
              securely and protect it against misuse. This is described in our{" "}
              <Link href="/privacy-policy" className={inline}>
                Privacy Policy
              </Link>
              .
            </p>
          </Block>

          <Block title="Third-party websites">
            <p>
              If you follow a link from this website to another site, such as our social media profiles, that site may
              set its own cookies. Please check its cookie policy for details.
            </p>
          </Block>

          <Block title="Managing cookies">
            <p>
              Most browsers let you view, block and delete cookies through their settings. Blocking cookies will not
              affect your use of this website.
            </p>
          </Block>

          <Block title="Changes to this policy">
            <p>
              If we introduce cookies or tracking in future, we will update this policy and, where required, ask for
              your consent first. Questions can be sent to{" "}
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
