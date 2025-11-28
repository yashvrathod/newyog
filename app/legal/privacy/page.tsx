import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <article className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p className="lead">Last updated: January 2024</p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, make a purchase,
              contact us for support, or otherwise communicate with us.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions,
              send communications, and comply with legal obligations.
            </p>

            <h2>3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as described in this policy or with
              your consent.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also object to or
              restrict certain processing of your information.
            </p>

            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@company.com.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
