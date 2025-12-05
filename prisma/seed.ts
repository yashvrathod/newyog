import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = process.env.CMS_ADMIN_EMAIL || 'admin@techcorp.com';
  const adminPassword = process.env.CMS_ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  console.log('👤 Creating admin user...');

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Create some sample testimonials
  console.log('💬 Creating sample testimonials...');

  const testimonials = [
    {
      content: "Yog Computers has been our trusted technology partner for over 3 years. Their expertise in CCTV systems and electrical services has been instrumental in our business security and operations.",
      authorName: "Rajesh Kumar",
      authorTitle: "Operations Manager",
      authorCompany: "Tech Solutions Pvt Ltd",
      rating: 5,
      isFeatured: true,
      isActive: true,
      isVerified: true,
    },
    {
      content: "Their computer maintenance services are exceptional. The team responds quickly and resolves issues efficiently, minimizing our downtime significantly.",
      authorName: "Priya Sharma",
      authorTitle: "IT Head",
      authorCompany: "Digital Innovations Ltd",
      rating: 5,
      isFeatured: true,
      isActive: true,
      isVerified: true,
    },
    {
      content: "Professional electrical installation and reliable ongoing support. Their attention to safety standards gives us complete peace of mind.",
      authorName: "Amit Patel",
      authorTitle: "Facility Manager",
      authorCompany: "Manufacturing Corp",
      rating: 5,
      isFeatured: true,
      isActive: true,
      isVerified: true,
    }
  ];

  for (const testimonialData of testimonials) {
    await prisma.testimonial.upsert({
      where: {
        authorEmail: `${testimonialData.authorName.toLowerCase().replace(' ', '.')}@example.com`
      },
      update: {},
      create: {
        ...testimonialData,
        authorEmail: `${testimonialData.authorName.toLowerCase().replace(' ', '.')}@example.com`,
      },
    });
  }

  console.log('✅ Sample testimonials created');

  // Create some sample clients
  console.log('🏢 Creating sample clients...');

  const clients = [
    {
      companyName: "Tech Solutions Pvt Ltd",
      contactName: "Rajesh Kumar",
      email: "contact@techsolutions.com",
      phone: "+91-9876543210",
      industry: "Technology",
      size: "MEDIUM" as const,
      isFeatured: true,
      isActive: true,
      logo: "/techflow-modern-tech-company-logo-minimal.jpg",
    },
    {
      companyName: "Digital Innovations Ltd",
      contactName: "Priya Sharma",
      email: "info@digitalinnovations.com",
      phone: "+91-9876543211",
      industry: "Software",
      size: "LARGE" as const,
      isFeatured: true,
      isActive: true,
      logo: "/innovate-modern-company-logo-minimal.jpg",
    },
    {
      companyName: "Manufacturing Corp",
      contactName: "Amit Patel",
      email: "admin@manufacturingcorp.com",
      phone: "+91-9876543212",
      industry: "Manufacturing",
      size: "ENTERPRISE" as const,
      isFeatured: true,
      isActive: true,
      logo: "/apex-business-company-logo-minimal.jpg",
    }
  ];

  for (const clientData of clients) {
    await prisma.client.upsert({
      where: { email: clientData.email },
      update: {},
      create: clientData,
    });
  }

  console.log('✅ Sample clients created');

  // Create some basic settings
  console.log('⚙️ Creating basic settings...');

  const settings = [
    {
      key: 'site_name',
      value: process.env.CMS_SITE_NAME || 'Yog Computers',
      type: 'STRING' as const,
      category: 'general',
      description: 'Site name',
      isPublic: true,
    },
    {
      key: 'site_url',
      value: process.env.CMS_SITE_URL || 'http://localhost:3000',
      type: 'URL' as const,
      category: 'general',
      description: 'Site URL',
      isPublic: true,
    }
  ];

  for (const settingData of settings) {
    await prisma.setting.upsert({
      where: { key: settingData.key },
      update: {},
      create: settingData,
    });
  }

  console.log('✅ Basic settings created');

  console.log('🎉 Database seed completed successfully!');
  console.log(`📧 Admin login: ${adminEmail}`);
  console.log(`🔑 Admin password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });