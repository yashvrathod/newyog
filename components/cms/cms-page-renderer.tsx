"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import type { Page } from "@/lib/types"

interface CMSPageRendererProps {
  page: Page & {
    creator?: { id: string; name: string | null; email: string }
    parent?: { id: string; title: string; slug: string } | null
    children?: { id: string; title: string; slug: string }[]
  }
}

export function CMSPageRenderer({ page }: CMSPageRendererProps) {
  // Extract text content from structured content
  const renderContent = (content: any) => {
    if (!content) return null

    // If content is a string, render it directly
    if (typeof content === 'string') {
      return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    }

    // If content is structured (like from a rich text editor)
    if (content.content && Array.isArray(content.content)) {
      return (
        <div className="prose prose-lg max-w-none">
          {content.content.map((block: any, index: number) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className="mb-4 text-lg leading-relaxed">
                    {block.content?.map((item: any, itemIndex: number) => {
                      if (item.type === 'text') {
                        return <span key={itemIndex}>{item.text}</span>
                      }
                      return null
                    })}
                  </p>
                )
              case 'heading':
                const HeadingTag = `h${block.attrs?.level || 2}` as keyof JSX.IntrinsicElements
                return (
                  <HeadingTag key={index} className="font-bold tracking-tight mb-4">
                    {block.content?.map((item: any, itemIndex: number) => {
                      if (item.type === 'text') {
                        return <span key={itemIndex}>{item.text}</span>
                      }
                      return null
                    })}
                  </HeadingTag>
                )
              case 'bulletList':
                return (
                  <ul key={index} className="list-disc pl-6 mb-4">
                    {block.content?.map((listItem: any, listIndex: number) => (
                      <li key={listIndex} className="mb-2">
                        {listItem.content?.map((para: any, paraIndex: number) => (
                          <span key={paraIndex}>
                            {para.content?.map((item: any, itemIndex: number) => {
                              if (item.type === 'text') {
                                return <span key={itemIndex}>{item.text}</span>
                              }
                              return null
                            })}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                )
              case 'orderedList':
                return (
                  <ol key={index} className="list-decimal pl-6 mb-4">
                    {block.content?.map((listItem: any, listIndex: number) => (
                      <li key={listIndex} className="mb-2">
                        {listItem.content?.map((para: any, paraIndex: number) => (
                          <span key={paraIndex}>
                            {para.content?.map((item: any, itemIndex: number) => {
                              if (item.type === 'text') {
                                return <span key={itemIndex}>{item.text}</span>
                              }
                              return null
                            })}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ol>
                )
              case 'blockquote':
                return (
                  <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-lg mb-4">
                    {block.content?.map((item: any, itemIndex: number) => {
                      if (item.type === 'paragraph') {
                        return (
                          <p key={itemIndex}>
                            {item.content?.map((textItem: any, textIndex: number) => {
                              if (textItem.type === 'text') {
                                return <span key={textIndex}>{textItem.text}</span>
                              }
                              return null
                            })}
                          </p>
                        )
                      }
                      return null
                    })}
                  </blockquote>
                )
              default:
                return null
            }
          })}
        </div>
      )
    }

    // Fallback: render as plain text
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed">{JSON.stringify(content)}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {page.featuredImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={page.featuredImage} 
              alt={page.title}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
        )}
        
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Breadcrumb */}
            {page.parent && (
              <nav className="mb-4">
                <Badge variant="outline">
                  {page.parent.title} / {page.title}
                </Badge>
              </nav>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {page.title}
            </h1>

            {/* Excerpt */}
            {page.excerpt && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {page.excerpt}
              </p>
            )}

            {/* Meta information */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              {page.creator?.name && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By {page.creator.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated {new Date(page.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderContent(page.content)}
          </motion.div>
        </div>
      </section>

      {/* Child Pages Navigation */}
      {page.children && page.children.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">Related Pages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.children.map((child) => (
                <motion.a
                  key={child.id}
                  href={`/${child.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">{child.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn more about {child.title.toLowerCase()}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}