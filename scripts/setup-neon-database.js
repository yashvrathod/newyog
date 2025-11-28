#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Neon Database with Prisma ORM...\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found. Please create it with your DATABASE_URL');
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('DATABASE_URL') || envContent.includes('postgresql://username:password')) {
  console.log('⚠️  Please update your DATABASE_URL in .env with your actual Neon database URL');
  console.log('   Get it from: https://console.neon.tech/\n');
  return;
}

try {
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('\n🗄️  Pushing database schema...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
  
  console.log('\n🌱 Seeding database...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  
  console.log('\n🧪 Testing database connection...');
  execSync('npm run test:db', { stdio: 'inherit' });
  
  console.log('\n✅ Neon database setup complete!');
  console.log('   You can now run: npm run dev');
  
} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Make sure your DATABASE_URL is correct');
  console.log('2. Check your Neon database is active');
  console.log('3. Verify your internet connection');
}