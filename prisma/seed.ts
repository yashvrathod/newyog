import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.CMS_ADMIN_PASSWORD || 'admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.CMS_ADMIN_EMAIL || 'admin@techcorp.com' },
    update: {},
    create: {
      email: process.env.CMS_ADMIN_EMAIL || 'admin@techcorp.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'generators' },
      update: {},
      create: {
        name: 'Generators',
        slug: 'generators',
        description: 'Industrial power generation equipment',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'material-handling' },
      update: {},
      create: {
        name: 'Material Handling',
        slug: 'material-handling',
        description: 'Equipment for moving and handling materials',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'machine-tools' },
      update: {},
      create: {
        name: 'Machine Tools',
        slug: 'machine-tools',
        description: 'Precision manufacturing equipment',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'maintenance' },
      update: {},
      create: {
        name: 'Maintenance',
        slug: 'maintenance',
        description: 'Equipment maintenance and support services',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'consulting' },
      update: {},
      create: {
        name: 'Consulting',
        slug: 'consulting',
        description: 'Technical and operational consulting services',
      },
    }),
  ])

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Industrial Generator Pro X500',
        slug: 'generator-pro-x500',
        description: 'High-performance industrial generator designed for demanding applications.',
        shortDescription: 'High-performance industrial generator for demanding applications',
        price: 24999.99,
        categoryId: categories[0].id,
        featuredImage: '/placeholder.svg?height=400&width=600',
        features: ['500kW Output', 'Fuel Efficient', '24/7 Operation', '5 Year Warranty'],
        specifications: {
          power: '500kW',
          fuel: 'Diesel',
          voltage: '480V',
          frequency: '60Hz',
        },
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
      },
      {
        name: 'Heavy-Duty Conveyor System',
        slug: 'conveyor-system-hd',
        description: 'Modular conveyor system built for heavy industrial use.',
        shortDescription: 'Modular heavy-duty conveyor for production lines',
        price: 15750.00,
        categoryId: categories[1].id,
        featuredImage: '/placeholder.svg?height=400&width=600',
        features: ['Modular Design', 'Variable Speed', 'Heavy Load Capacity', 'Easy Maintenance'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
        stockStatus: 'IN_STOCK',
      },
      {
        name: 'Precision CNC Lathe Model A',
        slug: 'cnc-lathe-model-a',
        description: 'Computer-controlled precision lathe for metalworking applications.',
        shortDescription: 'Precision CNC lathe for metalworking',
        price: 89500.00,
        categoryId: categories[2].id,
        featuredImage: '/placeholder.svg?height=400&width=600',
        features: ['Sub-micron Accuracy', 'Auto Tool Change', 'Digital Control', 'Coolant System'],
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: false,
        stockStatus: 'IN_STOCK',
      },
    ],
  })

  // Create services
  await prisma.service.createMany({
    data: [
      {
        name: 'Equipment Maintenance',
        slug: 'equipment-maintenance',
        description: 'Comprehensive preventive and corrective maintenance services.',
        shortDescription: 'Preventive and corrective maintenance for industrial equipment',
        icon: 'wrench',
        categoryId: categories[3].id,
        features: ['24/7 Support', 'Preventive Maintenance', 'Emergency Repairs', 'Parts Replacement'],
        priceRange: 'Starting at $500/month',
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'Technical Consulting',
        slug: 'technical-consulting',
        description: 'Expert consulting services for industrial operations optimization.',
        shortDescription: 'Expert consulting for operations optimization',
        icon: 'lightbulb',
        categoryId: categories[4].id,
        features: ['Process Analysis', 'Equipment Selection', 'Efficiency Optimization', 'ROI Assessment'],
        priceRange: '$200-500/hour',
        status: 'PUBLISHED',
        isActive: true,
        isFeatured: true,
      },
    ],
  })

  // Create clients
  await prisma.client.createMany({
    data: [
      {
        companyName: 'Acme Manufacturing',
        contactName: 'John Smith',
        email: 'john@acme.com',
        industry: 'Manufacturing',
        logo: '/placeholder.svg?height=80&width=200',
        isFeatured: true,
        isActive: true,
      },
      {
        companyName: 'TechForge Industries',
        contactName: 'Sarah Johnson',
        email: 'sarah@techforge.com',
        industry: 'Technology',
        logo: '/placeholder.svg?height=80&width=200',
        isFeatured: true,
        isActive: true,
      },
    ],
  })

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        content: 'TechCorp has been our trusted partner for over 15 years. Their equipment reliability and service excellence have been instrumental in our growth.',
        rating: 5,
        authorName: 'Robert Chen',
        authorTitle: 'Operations Director',
        authorCompany: 'Acme Manufacturing',
        isFeatured: true,
        isVerified: true,
      },
      {
        content: 'The maintenance team responds within hours, not days. That level of commitment has saved us countless hours of downtime.',
        rating: 5,
        authorName: 'Lisa Thompson',
        authorTitle: 'Plant Manager',
        authorCompany: 'Global Steel Corp',
        isFeatured: true,
        isVerified: true,
      },
    ],
  })

  // Create CMS settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'site_name',
        value: process.env.CMS_SITE_NAME || 'TechCorp CMS',
        type: 'STRING',
        category: 'general',
        description: 'Website name',
        isPublic: true,
      },
      {
        key: 'site_tagline',
        value: 'Excellence Since 2003',
        type: 'STRING',
        category: 'general',
        description: 'Website tagline',
        isPublic: true,
      },
      {
        key: 'contact_email',
        value: 'info@techcorp.com',
        type: 'EMAIL',
        category: 'contact',
        description: 'Primary contact email',
        isPublic: true,
      },
      {
        key: 'contact_phone',
        value: '+1 (555) 123-4567',
        type: 'STRING',
        category: 'contact',
        description: 'Primary contact phone',
        isPublic: true,
      },
      {
        key: 'contact_address',
        value: '123 Industrial Avenue, Tech City, TC 12345',
        type: 'TEXT',
        category: 'contact',
        description: 'Company address',
        isPublic: true,
      },
      {
        key: 'maintenance_mode',
        value: 'false',
        type: 'BOOLEAN',
        category: 'system',
        description: 'Enable maintenance mode',
        isPublic: false,
      },
      {
        key: 'posts_per_page',
        value: '10',
        type: 'NUMBER',
        category: 'content',
        description: 'Number of posts per page',
        isPublic: false,
      },
    ],
  })

  // Create sample pages
  await prisma.page.createMany({
    data: [
      {
        title: 'About Us',
        slug: 'about',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'TechCorp Industries has been a leader in industrial equipment and services since 2003. We provide comprehensive solutions for manufacturing, processing, and industrial operations.'
                }
              ]
            }
          ]
        },
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: new Date(),
        createdById: admin.id,
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
            }
          ]
        },
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: new Date(),
        createdById: admin.id,
      },
    ],
  })

  // Seed CMS pages
  const cmsPages = [
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
            content: [{ type: 'text', text: 'Our Mission' }]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'To deliver innovative solutions that drive business growth while maintaining the highest standards of quality, reliability, and customer satisfaction.'
              }
            ]
          }
        ]
      },
      excerpt: 'Learn about TechCorp Industries - your trusted partner in industrial excellence since 2003.',
      metaTitle: 'About TechCorp Industries - Industrial Equipment & Services',
      metaDescription: 'Discover TechCorp Industries, a leading provider of industrial equipment and services since 2003.',
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(),
      createdById: admin.id,
      updatedById: admin.id
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
            content: [{ type: 'text', text: 'Contact Information' }]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Phone: +1 (555) 123-4567' }]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Email: info@techcorp.com' }]
                  }
                ]
              }
            ]
          }
        ]
      },
      excerpt: 'Contact TechCorp Industries for expert industrial solutions.',
      metaTitle: 'Contact TechCorp Industries - Get Expert Industrial Solutions',
      metaDescription: 'Contact TechCorp Industries for industrial equipment and services. Call +1 (555) 123-4567 or email info@techcorp.com.',
      status: 'PUBLISHED',
      isPublished: true,
      publishedAt: new Date(),
      createdById: admin.id,
      updatedById: admin.id
    }
  ]

  for (const pageData of cmsPages) {
    await prisma.page.upsert({
      where: { slug: pageData.slug },
      update: {},
      create: pageData
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('📄 CMS pages created!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })