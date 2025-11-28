import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCMSPages() {
  console.log('🌱 Seeding CMS pages...')

  // Get the admin user
  const adminUser = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' }
  })

  if (!adminUser) {
    console.error('❌ Admin user not found. Please run the main seed first.')
    return
  }

  // Create sample CMS pages
  const pages = [
    {
      title: 'About Our Company',
      slug: 'about',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Welcome to TechCorp Industries, your trusted partner in industrial excellence since 2003. We specialize in providing cutting-edge equipment and exceptional services that transform businesses across various industries.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'Our Mission' }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'To deliver innovative solutions that drive business growth while maintaining the highest standards of quality, reliability, and customer satisfaction.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'Why Choose Us' }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: '20+ years of industry experience' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: '24/7 customer support and maintenance' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Cutting-edge technology solutions' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Proven track record with 500+ satisfied clients' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      excerpt: 'Learn about TechCorp Industries - your trusted partner in industrial excellence since 2003.',
      metaTitle: 'About TechCorp Industries - Industrial Equipment & Services',
      metaDescription: 'Discover TechCorp Industries, a leading provider of industrial equipment and services since 2003. 20+ years experience, 500+ clients, 24/7 support.',
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(),
      createdById: adminUser.id,
      updatedById: adminUser.id
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Get in touch with our team of experts. We are here to help you find the right solutions for your industrial needs.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'Our Office' }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '123 Industrial Avenue\nTech City, TC 12345\nUnited States'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'Contact Information' }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Phone: +1 (555) 123-4567' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Email: info@techcorp.com' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Business Hours: Monday - Friday, 8:00 AM - 6:00 PM EST' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'Emergency Support' }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'For urgent technical support, call our 24/7 emergency line: +1 (555) 999-0000'
              }
            ]
          }
        ]
      },
      excerpt: 'Contact TechCorp Industries for expert industrial solutions. Call +1 (555) 123-4567 or visit our Tech City office.',
      metaTitle: 'Contact TechCorp Industries - Get Expert Industrial Solutions',
      metaDescription: 'Contact TechCorp Industries for industrial equipment and services. Call +1 (555) 123-4567, email info@techcorp.com, or visit our Tech City office.',
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(),
      createdById: adminUser.id,
      updatedById: adminUser.id
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This Privacy Policy describes how TechCorp Industries collects, uses, and protects your information when you visit our website or use our services.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'Information We Collect' }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'We may collect personal information such as your name, email address, phone number, and company details when you:'
              }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Submit an inquiry through our website' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Request a quote or consultation' }
                    ]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      { type: 'text', text: 'Subscribe to our newsletter' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              { type: 'text', text: 'How We Use Your Information' }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'We use your information to provide services, respond to inquiries, and improve our offerings. We do not sell or share your personal information with third parties without your consent.'
              }
            ]
          }
        ]
      },
      excerpt: 'Learn how TechCorp Industries protects your privacy and handles your personal information.',
      metaTitle: 'Privacy Policy - TechCorp Industries',
      metaDescription: 'Read TechCorp Industries privacy policy to understand how we collect, use, and protect your personal information.',
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(),
      createdById: adminUser.id,
      updatedById: adminUser.id
    }
  ]

  // Create pages
  for (const pageData of pages) {
    try {
      const existingPage = await prisma.page.findUnique({
        where: { slug: pageData.slug }
      })

      if (existingPage) {
        console.log(`📄 Page '${pageData.title}' already exists, skipping...`)
        continue
      }

      const page = await prisma.page.create({
        data: pageData
      })

      console.log(`✅ Created page: ${page.title} (/${page.slug})`)
    } catch (error) {
      console.error(`❌ Failed to create page '${pageData.title}':`, error)
    }
  }

  console.log('🎉 CMS pages seeded successfully!')
}

// Run if called directly
if (require.main === module) {
  seedCMSPages()
    .then(() => {
      console.log('✅ CMS seeding complete')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ CMS seeding failed:', error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export { seedCMSPages }