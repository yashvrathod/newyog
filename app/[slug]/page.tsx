import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import prisma from "@/lib/prisma";
import { CMSPageRenderer } from "@/components/cms/cms-page-renderer";
import type { Page } from "@/lib/types";

// Generate static params for known pages
export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: {
        isPublished: true,
        status: "PUBLISHED",
      },
      select: {
        slug: true,
      },
    });

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Fetch page data
async function getPage(slug: string): Promise<Page | null> {
  try {
    const page = await prisma.page.findUnique({
      where: {
        slug,
        isPublished: true,
        status: "PUBLISHED",
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        parent: {
          select: { id: true, title: true, slug: true },
        },
        children: {
          select: { id: true, title: true, slug: true },
          where: { isPublished: true },
        },
      },
    });

    return page;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.excerpt,
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.excerpt,
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <CMSPageRenderer page={page} />
      </main>
      <Footer />
    </>
  );
}
