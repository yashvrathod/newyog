import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <article className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
            <h1>Terms & Conditions</h1>
            <p className="lead">Last updated: January 2024</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using our services, you accept and agree to be bound by these Terms and Conditions and
              our Privacy Policy.
            </p>

            <h2>2. Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You are
              responsible for maintaining the confidentiality of your account.
            </p>

            <h2>3. Products and Services</h2>
            <p>
              All products and services are subject to availability. We reserve the right to modify or discontinue any
              product or service without notice.
            </p>

            <h2>4. Pricing and Payment</h2>
            <p>
              Prices are subject to change without notice. Payment must be made in full before delivery of products or
              commencement of services.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              All content, trademarks, and intellectual property on our platform are owned by us or our licensors and
              are protected by applicable laws.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising
              from your use of our services.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we
              operate.
            </p>

            <h2>8. Contact Information</h2>
            <p>For any questions regarding these Terms, please contact us at legal@company.com.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
