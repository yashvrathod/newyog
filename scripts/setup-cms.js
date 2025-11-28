#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up TechCorp CMS with Prisma...\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.error('❌ .env file not found. Please create it with your DATABASE_URL');
  process.exit(1);
}

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push database schema
  console.log('🗄️  Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  // Seed database
  console.log('🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('\n✅ CMS setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Login to admin: http://localhost:3000/admin');
  console.log('   Email: admin@techcorp.com');
  console.log('   Password: admin123');
  console.log('\n🔧 Useful commands:');
  console.log('- npm run db:studio    # Open Prisma Studio');
  console.log('- npm run db:generate  # Regenerate Prisma client');
  console.log('- npm run db:push      # Push schema changes');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n🔍 Troubleshooting:');
  console.log('1. Check your DATABASE_URL in .env');
  console.log('2. Ensure your database is accessible');
  console.log('3. Try running commands individually:');
  console.log('   - npx prisma generate');
  console.log('   - npx prisma db push');
  console.log('   - npm run db:seed');
  process.exit(1);
}