#!/usr/bin/env node

// Load environment variables
require('dotenv/config');

// Quick test to verify database connection and data
const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { Pool } = require('@neondatabase/serverless');

// Create Neon connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create Neon adapter for Prisma
const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['error']
});

async function testConnection() {
  console.log('🔍 Testing database connection...\n')

  try {
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')

    // Test data counts
    const [
      userCount,
      productCount,
      serviceCount,
      clientCount,
      testimonialCount,
      inquiryCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.service.count(),
      prisma.client.count(),
      prisma.testimonial.count(),
      prisma.inquiry.count()
    ])

    console.log('\n📊 Database Content:')
    console.log(`   Users: ${userCount}`)
    console.log(`   Products: ${productCount}`)
    console.log(`   Services: ${serviceCount}`)
    console.log(`   Clients: ${clientCount}`)
    console.log(`   Testimonials: ${testimonialCount}`)
    console.log(`   Inquiries: ${inquiryCount}`)

    // Test admin user exists
    const adminUser = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' }
    })

    if (adminUser) {
      console.log(`\n✅ Admin user found: ${adminUser.email}`)
    } else {
      console.log('\n❌ No admin user found - run seed script')
    }

    // Test featured content
    const featuredProducts = await prisma.product.count({ where: { isFeatured: true } })
    const featuredServices = await prisma.service.count({ where: { isFeatured: true } })
    const featuredClients = await prisma.client.count({ where: { isFeatured: true } })
    const featuredTestimonials = await prisma.testimonial.count({ where: { isFeatured: true } })

    console.log('\n⭐ Featured Content:')
    console.log(`   Featured Products: ${featuredProducts}`)
    console.log(`   Featured Services: ${featuredServices}`)
    console.log(`   Featured Clients: ${featuredClients}`)
    console.log(`   Featured Testimonials: ${featuredTestimonials}`)

    console.log('\n🎉 Database is ready!')
    console.log('\nNext steps:')
    console.log('1. Run: npm run dev')
    console.log('2. Visit: http://localhost:3000')
    console.log('3. Admin: http://localhost:3000/admin')

  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('1. Check your DATABASE_URL in .env')
    console.log('2. Run: npm run db:push')
    console.log('3. Run: npm run db:seed')
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()