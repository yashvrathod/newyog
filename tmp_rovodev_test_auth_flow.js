// Test the authentication flow
async function testAuth() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing authentication system...');
  
  try {
    // Test 1: Check server
    console.log('\n1️⃣ Testing server connection...');
    const sessionResponse = await fetch(`${baseUrl}/api/auth/session`);
    console.log(`Server response: ${sessionResponse.status} ${sessionResponse.statusText}`);
    
    if (sessionResponse.status === 500) {
      console.log('❌ Server error - likely database connection issue');
      return;
    }
    
    // Test 2: Try login with env credentials
    console.log('\n2️⃣ Testing login with admin@techcorp.com / admin123...');
    
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@techcorp.com',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('User:', loginData.user);
    } else {
      console.log(`❌ Login failed (${loginResponse.status}):`, loginData.error);
      
      if (loginData.error === 'Invalid credentials') {
        console.log('\n💡 This means:');
        console.log('- Either no admin user exists in database');
        console.log('- Or password doesn\'t match');
        console.log('- Or user is not active');
      }
      
      if (loginData.error === 'Database connection failed') {
        console.log('\n💡 Database connection issue detected');
      }
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Development server is not running');
      console.log('💡 Start it with: npm run dev');
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

testAuth();