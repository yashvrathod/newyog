import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/about/about-content";

export default async function AboutPage() {
  // Try to fetch CMS content first, fallback to static content
  let cmsContent = null;
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/cms/pages/about`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (response.ok) {
      const result = await response.json();
      cmsContent = result.data;
    }
  } catch (error) {
    console.log("CMS content not available, using static content");
  }

  // If CMS content exists, use the dynamic renderer
  if (cmsContent) {
    const { CMSPageRenderer } = await import(
      "@/components/cms/cms-page-renderer"
    );
    return (
      <>
        <Header />
        <main className="">
          <CMSPageRenderer page={cmsContent} />
        </main>
        <Footer />
      </>
    );
  }

  // Fallback to static content
  return (
    <>
      <Header />
      <main className="">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
