const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // API endpoints
  if (pathname.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (pathname === '/api/status') {
      res.end(JSON.stringify({
        status: 'operational',
        app: 'Jyotishai SaaS',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }));
      return;
    }
    
    if (pathname === '/api/features') {
      res.end(JSON.stringify({
        features: [
          'Vedic Birth Chart Calculation',
          'Planetary Position Analysis',
          'Dasha Period Calculations',
          'Compatibility Matching',
          'Muhurta Selection',
          'Transit Predictions'
        ]
      }));
      return;
    }
    
    // Handle POST API endpoints
    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        const params = new URLSearchParams(body);
        const data = {};
        for (const [key, value] of params) {
          data[key] = value;
        }
        
        // Generate Report API
        if (pathname === '/api/reports/create') {
          console.log('Report creation request:', data);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Generated - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .success-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            padding: 48px;
            border-radius: 24px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            text-align: center;
            max-width: 600px;
        }
        .success-icon { font-size: 4em; margin-bottom: 20px; }
        h1 { margin-bottom: 16px; }
        .details { 
            background: rgba(15, 23, 42, 0.4);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: left;
        }
        .detail-row { margin: 8px 0; }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="success-card">
        <div class="success-icon">✅</div>
        <h1>Report Generated Successfully!</h1>
        <p>Your astrological report has been created.</p>
        <div class="details">
            <div class="detail-row"><strong>Name:</strong> ${data.name || 'N/A'}</div>
            <div class="detail-row"><strong>Report Type:</strong> ${data.reportType || 'N/A'}</div>
            <div class="detail-row"><strong>Birth Date:</strong> ${data.birthDate || 'N/A'}</div>
            <div class="detail-row"><strong>Birth Time:</strong> ${data.birthTime || 'N/A'}</div>
            <div class="detail-row"><strong>Birth Place:</strong> ${data.birthPlace || 'N/A'}</div>
            <div class="detail-row"><strong>Report ID:</strong> RPT-${Date.now()}</div>
        </div>
        <a href="/dashboard" class="btn">Back to Dashboard</a>
        <a href="/reports/new" class="btn">Generate Another Report</a>
    </div>
</body>
</html>`);
          return;
        }
        
        // Schedule Consultation API
        if (pathname === '/api/consultations/create') {
          console.log('Consultation booking request:', data);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultation Booked - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .success-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            padding: 48px;
            border-radius: 24px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            text-align: center;
            max-width: 600px;
        }
        .success-icon { font-size: 4em; margin-bottom: 20px; }
        h1 { margin-bottom: 16px; }
        .details { 
            background: rgba(15, 23, 42, 0.4);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: left;
        }
        .detail-row { margin: 8px 0; }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="success-card">
        <div class="success-icon">📅</div>
        <h1>Consultation Booked Successfully!</h1>
        <p>Your consultation has been scheduled.</p>
        <div class="details">
            <div class="detail-row"><strong>Name:</strong> ${data.name || 'N/A'}</div>
            <div class="detail-row"><strong>Email:</strong> ${data.email || 'N/A'}</div>
            <div class="detail-row"><strong>Phone:</strong> ${data.phone || 'N/A'}</div>
            <div class="detail-row"><strong>Type:</strong> ${data.consultationType || 'N/A'}</div>
            <div class="detail-row"><strong>Duration:</strong> ${data.duration || 'N/A'} minutes</div>
            <div class="detail-row"><strong>Date:</strong> ${data.date || 'N/A'}</div>
            <div class="detail-row"><strong>Time:</strong> ${data.time || 'N/A'}</div>
            <div class="detail-row"><strong>Booking ID:</strong> CONS-${Date.now()}</div>
        </div>
        <p style="margin: 20px 0; color: #94a3b8;">You will receive a confirmation email with meeting details.</p>
        <a href="/dashboard" class="btn">Back to Dashboard</a>
        <a href="/consultations/book" class="btn">Book Another Session</a>
    </div>
</body>
</html>`);
          return;
        }
        
        // Compatibility Check API
        if (pathname === '/api/compatibility/check') {
          console.log('Compatibility check request:', data);
          const compatScore = Math.floor(Math.random() * 30) + 70; // Random score 70-100
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compatibility Results - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .success-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            padding: 48px;
            border-radius: 24px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            text-align: center;
            max-width: 700px;
        }
        .success-icon { font-size: 4em; margin-bottom: 20px; }
        h1 { margin-bottom: 16px; }
        .score-display {
            font-size: 3em;
            font-weight: bold;
            margin: 20px 0;
            background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .details { 
            background: rgba(15, 23, 42, 0.4);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: left;
        }
        .person-section {
            margin: 15px 0;
            padding: 15px;
            background: rgba(168, 85, 247, 0.1);
            border-radius: 8px;
        }
        .detail-row { margin: 8px 0; }
        .compatibility-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        .compat-item {
            background: rgba(15, 23, 42, 0.4);
            padding: 15px;
            border-radius: 8px;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="success-card">
        <div class="success-icon">💕</div>
        <h1>Compatibility Analysis Complete!</h1>
        <div class="score-display">${compatScore}% Match</div>
        
        <div class="details">
            <div class="person-section">
                <strong>First Person:</strong> ${data.name1 || 'N/A'}<br>
                Born: ${data.birthDate1 || 'N/A'} at ${data.birthTime1 || 'N/A'}<br>
                Place: ${data.birthPlace1 || 'N/A'}
            </div>
            <div class="person-section">
                <strong>Second Person:</strong> ${data.name2 || 'N/A'}<br>
                Born: ${data.birthDate2 || 'N/A'} at ${data.birthTime2 || 'N/A'}<br>
                Place: ${data.birthPlace2 || 'N/A'}
            </div>
        </div>
        
        <div class="compatibility-grid">
            <div class="compat-item">
                <strong>💖 Love:</strong> ${Math.floor(Math.random() * 20) + 75}%
            </div>
            <div class="compat-item">
                <strong>💬 Communication:</strong> ${Math.floor(Math.random() * 20) + 70}%
            </div>
            <div class="compat-item">
                <strong>📈 Growth:</strong> ${Math.floor(Math.random() * 25) + 65}%
            </div>
            <div class="compat-item">
                <strong>⭐ Overall:</strong> ${compatScore}%
            </div>
        </div>
        
        <p style="margin: 20px 0; color: #94a3b8;">Report ID: COMP-${Date.now()}</p>
        <a href="/dashboard" class="btn">Back to Dashboard</a>
        <a href="/compatibility/new" class="btn">Check Another Match</a>
    </div>
</body>
</html>`);
          return;
        }
      });
      return;
    }
    
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // Handle POST requests
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      if (pathname === '/signup') {
        try {
          const formData = new URLSearchParams(body);
          const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            experience: formData.get('experience')
          };
          
          // Simple validation
          if (!userData.email || !userData.password || userData.password !== userData.confirmPassword) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`
              <html><body style="font-family: Arial; text-align: center; margin-top: 100px;">
                <h2>❌ Registration Failed</h2>
                <p>Please check your details and try again.</p>
                <a href="/signup">← Go Back</a>
              </body></html>
            `);
            return;
          }
          
          // Success response (in real app, save to database)
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; text-align: center; margin-top: 100px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%); color: #f8fafc; min-height: 100vh;">
              <div style="background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%); backdrop-filter: blur(20px); padding: 48px; border-radius: 24px; max-width: 520px; margin: 0 auto; border: 1px solid rgba(148, 163, 184, 0.2); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);">
                <h2 style="margin-bottom: 20px; font-weight: 600; letter-spacing: -0.025em;">✅ Account Created Successfully!</h2>
                <p style="margin-bottom: 12px; opacity: 0.9;">Welcome to Jyotishai, ${userData.firstName}!</p>
                <p style="margin-bottom: 32px; opacity: 0.8; font-size: 0.95em;">Your account has been created with email: ${userData.email}</p>
                <a href="/login" style="color: #ffffff; text-decoration: none; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 16px 32px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3); display: inline-block; transition: all 0.3s ease;">Sign In Now →</a>
              </div>
            </body></html>
          `);
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h2>Server Error</h2><a href="/signup">Try Again</a>');
        }
        return;
      }
      
      if (pathname === '/login') {
        try {
          const formData = new URLSearchParams(body);
          const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
          };
          
          // Simple validation (in real app, check against database)
          if (!loginData.email || !loginData.password) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`
              <html><body style="font-family: Arial; text-align: center; margin-top: 100px;">
                <h2>❌ Login Failed</h2>
                <p>Invalid email or password.</p>
                <a href="/login">← Try Again</a>
              </body></html>
            `);
            return;
          }
          
          // Success response (in real app, verify credentials)
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif; text-align: center; margin-top: 100px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%); color: #f8fafc; min-height: 100vh;">
              <div style="background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%); backdrop-filter: blur(20px); padding: 48px; border-radius: 24px; max-width: 520px; margin: 0 auto; border: 1px solid rgba(148, 163, 184, 0.2); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);">
                <h2 style="margin-bottom: 20px; font-weight: 600; letter-spacing: -0.025em;">✅ Login Successful!</h2>
                <p style="margin-bottom: 12px; opacity: 0.9;">Welcome back to Jyotishai!</p>
                <p style="margin-bottom: 32px; opacity: 0.8; font-size: 0.95em;">Logged in as: ${loginData.email}</p>
                <a href="/dashboard" style="color: #ffffff; text-decoration: none; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 16px 32px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3); display: inline-block; transition: all 0.3s ease;">Go to Dashboard →</a>
              </div>
            </body></html>
          `);
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h2>Server Error</h2><a href="/login">Try Again</a>');
        }
        return;
      }
    });
    return;
  }

  // Login page
  if (pathname === '/login') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f8fafc;
        }
        .login-container {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 48px;
            border-radius: 24px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            width: 100%;
            max-width: 420px;
        }
        .logo { text-align: center; margin-bottom: 30px; font-size: 2em; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; }
        input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            background: rgba(248, 250, 252, 0.95);
            color: #0f172a;
            font-size: 0.95em;
            transition: all 0.3s ease;
        }
        input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .login-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: #ffffff;
            border: none;
            border-radius: 12px;
            font-size: 1.05em;
            font-weight: 600;
            letter-spacing: -0.025em;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }
        .login-btn:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        .back-link a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .back-link a:hover {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">✨ Jyotishai</div>
        <form method="POST" action="/login">
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit" class="login-btn">Sign In</button>
        </form>
        <div class="back-link">
            <a href="/signup">Don't have an account? Sign up</a><br><br>
            <a href="/">← Back to Home</a>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Signup page
  if (pathname === '/signup') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f8fafc;
        }
        .signup-container {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 48px;
            border-radius: 24px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            width: 100%;
            max-width: 480px;
        }
        .logo { text-align: center; margin-bottom: 30px; font-size: 2em; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; }
        input, select {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            background: rgba(248, 250, 252, 0.95);
            color: #0f172a;
            font-size: 0.95em;
            transition: all 0.3s ease;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .signup-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: #ffffff;
            border: none;
            border-radius: 12px;
            font-size: 1.05em;
            font-weight: 600;
            letter-spacing: -0.025em;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }
        .signup-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        .back-link a {
            color: #3b82f6;
            text-decoration: none;
            margin: 0 10px;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .back-link a:hover {
            color: #2563eb;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
    </style>
</head>
<body>
    <div class="signup-container">
        <div class="logo">✨ Jyotishai</div>
        <form method="POST" action="/signup">
            <div class="form-row">
                <div class="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" required>
                </div>
                <div class="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" required>
                </div>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" name="password" required>
            </div>
            <div class="form-group">
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" required>
            </div>
            <div class="form-group">
                <label>Experience Level:</label>
                <select name="experience" required>
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner - New to Vedic Astrology</option>
                    <option value="intermediate">Intermediate - Some knowledge</option>
                    <option value="advanced">Advanced - Professional/Expert</option>
                </select>
            </div>
            <button type="submit" class="signup-btn">Create Account</button>
        </form>
        <div class="back-link">
            <a href="/login">Already have an account? Sign in</a><br><br>
            <a href="/">← Back to Home</a>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Demo page
  if (pathname === '/demo') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 30px;
        }
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .demo-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%);
            backdrop-filter: blur(20px);
            padding: 24px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .demo-title { 
            color: #e2e8f0; 
            margin-bottom: 15px;
            font-weight: 600;
            letter-spacing: -0.025em;
        }
        .api-response {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.9em;
            margin-top: 10px;
        }
        .back-link {
            text-align: center;
            margin: 30px 0;
        }
        .back-link a {
            color: #3b82f6;
            text-decoration: none;
            font-size: 1.1em;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .back-link a:hover {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ Jyotishai Demo</h1>
            <p>Live API Demonstrations</p>
        </div>
        
        <div class="demo-grid">
            <div class="demo-card">
                <h3 class="demo-title">🪐 Planetary Positions</h3>
                <p>Current planetary positions in Vedic astrology format</p>
                <div class="api-response" id="planets"></div>
            </div>
            
            <div class="demo-card">
                <h3 class="demo-title">📊 Birth Chart</h3>
                <p>Sample Rasi chart with house placements</p>
                <div class="api-response" id="chart"></div>
            </div>
            
            <div class="demo-card">
                <h3 class="demo-title">⚡ System Status</h3>
                <p>Real-time API health monitoring</p>
                <div class="api-response" id="status"></div>
            </div>
        </div>
        
        <div class="back-link">
            <a href="/">← Back to Home</a>
        </div>
    </div>
    
    <script>
        // Load demo data
        fetch('/api/planets').then(r => r.json()).then(d => 
            document.getElementById('planets').textContent = JSON.stringify(d, null, 2)
        );
        fetch('/api/chart').then(r => r.json()).then(d => 
            document.getElementById('chart').textContent = JSON.stringify(d, null, 2)
        );
        fetch('/api/status').then(r => r.json()).then(d => 
            document.getElementById('status').textContent = JSON.stringify(d, null, 2)
        );
    </script>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Serve main page
  if (pathname === '/' || pathname === '/index.html') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jyotishai - Professional Vedic Astrology Software</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            text-align: center;
            padding: 40px 0;
            animation: fadeInDown 1s ease;
        }
        
        h1 {
            font-size: 3.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .tagline {
            font-size: 1.3em;
            opacity: 0.95;
            margin-bottom: 30px;
        }
        
        .status-badge {
            display: inline-block;
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            border: 1px solid rgba(16, 185, 129, 0.3);
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9em;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
            animation: pulse 3s infinite;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 50px 0;
        }
        
        .feature-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            animation: fadeInUp 1s ease forwards;
            opacity: 0;
        }
        
        .feature-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2);
            border-color: rgba(148, 163, 184, 0.3);
        }
        
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }
        
        .feature-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
        }
        
        .feature-title {
            font-size: 1.4em;
            margin-bottom: 12px;
            color: #e2e8f0;
            font-weight: 600;
            letter-spacing: -0.025em;
        }
        
        .feature-desc {
            line-height: 1.6;
            opacity: 0.9;
        }
        
        .cta-section {
            text-align: center;
            margin: 80px 0;
            padding: 48px;
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
            border-radius: 24px;
            border: 1px solid rgba(148, 163, 184, 0.1);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            animation: fadeIn 2s ease;
        }
        
        .cta-button {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 12px;
            font-size: 1.1em;
            font-weight: 600;
            letter-spacing: -0.025em;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin: 8px;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
            border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .cta-button:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
        
        footer {
            text-align: center;
            padding: 30px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            margin-top: 60px;
        }
        
        .tech-stack {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .tech-badge {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85em;
            border: 1px solid rgba(148, 163, 184, 0.1);
            color: #cbd5e1;
            font-weight: 500;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        @media (max-width: 768px) {
            h1 { font-size: 2.5em; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>✨ Jyotishai</h1>
            <p class="tagline">Professional Vedic Astrology Software Platform</p>
            <div class="status-badge">✅ System Operational • SSL Secured</div>
        </header>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">Birth Chart Analysis</h3>
                <p class="feature-desc">Generate comprehensive Vedic birth charts with accurate planetary positions and house placements using Swiss Ephemeris.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🪐</div>
                <h3 class="feature-title">Planetary Calculations</h3>
                <p class="feature-desc">Precise calculations of planetary positions, retrograde movements, and astronomical phenomena for any date and location.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3 class="feature-title">Dasha Periods</h3>
                <p class="feature-desc">Calculate Vimshottari, Ashtottari, and other dasha systems with sub-periods for detailed life event predictions.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">💑</div>
                <h3 class="feature-title">Compatibility Matching</h3>
                <p class="feature-desc">Advanced Kundali matching with Ashtakoota and Dashkoota systems for relationship compatibility analysis.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📅</div>
                <h3 class="feature-title">Muhurta Selection</h3>
                <p class="feature-desc">Find auspicious timings for important events using traditional Vedic astrology principles and Panchang calculations.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔮</div>
                <h3 class="feature-title">Transit Predictions</h3>
                <p class="feature-desc">Track planetary transits and their effects on natal charts for accurate timing of life events and opportunities.</p>
            </div>
        </div>
        
        <div class="cta-section">
            <h2>Ready to Explore Vedic Wisdom?</h2>
            <p style="margin: 20px 0; opacity: 0.9;">Experience the power of ancient Vedic astrology with modern technology</p>
            <a href="/signup" class="cta-button">Sign Up Free</a>
            <a href="/login" class="cta-button">Sign In</a>
            <a href="/demo" class="cta-button">View Demo</a>
        </div>
        
        <footer>
            <div class="tech-stack">
                <span class="tech-badge">Next.js</span>
                <span class="tech-badge">React</span>
                <span class="tech-badge">TypeScript</span>
                <span class="tech-badge">FastAPI</span>
                <span class="tech-badge">Swiss Ephemeris</span>
                <span class="tech-badge">PostgreSQL</span>
            </div>
            <p style="margin-top: 20px; opacity: 0.8;">
                Jyotishai SaaS © 2025 • Powered by Vedic Astrology Algorithms<br>
                <small>Secured with SSL/TLS • Hosted on High-Performance VPS</small>
            </p>
        </footer>
    </div>
    
    <script>
        // Add some interactivity
        fetch('/api/status')
            .then(res => res.json())
            .then(data => {
                console.log('API Status:', data);
            })
            .catch(err => console.error('API Error:', err));
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Dashboard page (authenticated route)
  if (pathname === '/dashboard') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
        }
        .navbar {
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            padding: 16px 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5em; font-weight: 600; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { color: #f8fafc; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #3b82f6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .dashboard-header { text-align: center; margin-bottom: 40px; }
        .dashboard-header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 40px; }
        .stat-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 24px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            text-align: center;
        }
        .stat-value { font-size: 2em; font-weight: 600; color: #3b82f6; margin-bottom: 8px; }
        .stat-label { opacity: 0.8; }
        .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .action-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .action-card:hover { transform: translateY(-4px); }
        .action-icon { font-size: 3em; margin-bottom: 16px; }
        .action-title { font-size: 1.3em; font-weight: 600; margin-bottom: 8px; }
        .action-description { opacity: 0.8; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 16px;
            transition: all 0.3s ease;
        }
        .btn:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">✨ Jyotishai</div>
            <div class="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/reports">Reports</a>
                <a href="/dashboard/settings">Settings</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="dashboard-header">
            <h1>Welcome to Your Dashboard</h1>
            <p>Logged in as: <strong>bilalhzaidi@gmail.com</strong></p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">12</div>
                <div class="stat-label">Reports Generated</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">3</div>
                <div class="stat-label">Consultations</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">8</div>
                <div class="stat-label">Compatibility Checks</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">4.8</div>
                <div class="stat-label">Average Rating</div>
            </div>
        </div>

        <div class="actions-grid">
            <div class="action-card">
                <div class="action-icon">📊</div>
                <div class="action-title">Generate New Report</div>
                <div class="action-description">Create a detailed astrological analysis</div>
                <a href="/reports/new" class="btn">Create Report</a>
            </div>
            <div class="action-card">
                <div class="action-icon">📅</div>
                <div class="action-title">Schedule Consultation</div>
                <div class="action-description">Book a session with our experts</div>
                <a href="/consultations/book" class="btn">Book Session</a>
            </div>
            <div class="action-card">
                <div class="action-icon">💕</div>
                <div class="action-title">Check Compatibility</div>
                <div class="action-description">Analyze relationship compatibility</div>
                <a href="/compatibility/new" class="btn">Check Match</a>
            </div>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Dashboard settings page
  if (pathname === '/dashboard/settings') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - Jyotishai Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
        }
        .navbar {
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            padding: 16px 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5em; font-weight: 600; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { color: #f8fafc; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #3b82f6; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .settings-header { text-align: center; margin-bottom: 40px; }
        .settings-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            margin-bottom: 24px;
        }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 8px;
            background: rgba(248, 250, 252, 0.95);
            color: #0f172a;
        }
        .btn {
            padding: 12px 24px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-secondary {
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">✨ Jyotishai</div>
            <div class="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/reports">Reports</a>
                <a href="/dashboard/settings">Settings</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="settings-header">
            <h1>Account Settings</h1>
            <p>Manage your profile and preferences</p>
        </div>

        <div class="settings-card">
            <h2>Profile Information</h2>
            <form>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="bilalhzaidi@gmail.com" readonly>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter your first name">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter your last name">
                </div>
                <div class="form-group">
                    <label>Birth Date</label>
                    <input type="date">
                </div>
                <div class="form-group">
                    <label>Birth Time</label>
                    <input type="time">
                </div>
                <div class="form-group">
                    <label>Birth Place</label>
                    <input type="text" placeholder="City, Country">
                </div>
                <button type="button" class="btn">Save Changes</button>
            </form>
        </div>

        <div class="settings-card">
            <h2>Subscription</h2>
            <p>Current Plan: <strong>Pro Plan - R199/month</strong></p>
            <p>Next billing: January 15, 2024</p>
            <button type="button" class="btn btn-secondary">Manage Subscription</button>
        </div>

        <div class="settings-card">
            <h2>Notifications</h2>
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> Email notifications
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" checked> Daily insights
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox"> Transit alerts
                </label>
            </div>
            <button type="button" class="btn">Save Preferences</button>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Generate New Report page
  if (pathname === '/reports/new') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate New Report - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
        }
        .navbar {
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            padding: 16px 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5em; font-weight: 600; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { color: #f8fafc; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #3b82f6; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .form-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .form-header { text-align: center; margin-bottom: 32px; }
        .form-header h1 { margin-bottom: 8px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.3);
            background: rgba(15, 23, 42, 0.6);
            color: #f8fafc;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
        }
        .btn:hover { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); }
        .back-link { display: inline-block; margin-bottom: 20px; color: #94a3b8; text-decoration: none; }
        .back-link:hover { color: #cbd5e1; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">✨ Jyotishai</div>
            <div class="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/settings">Settings</a>
                <a href="/api/auth/signout">Sign Out</a>
            </div>
        </div>
    </nav>
    <div class="container">
        <a href="/dashboard" class="back-link">← Back to Dashboard</a>
        <div class="form-card">
            <div class="form-header">
                <h1>📊 Generate New Report</h1>
                <p>Create a detailed astrological analysis</p>
            </div>
            <form action="/api/reports/create" method="POST">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="reportType">Report Type</label>
                        <select id="reportType" name="reportType" required>
                            <option value="">Select report type</option>
                            <option value="personality">Personality Analysis</option>
                            <option value="career">Career Guidance</option>
                            <option value="love">Love & Relationships</option>
                            <option value="health">Health Predictions</option>
                            <option value="finance">Financial Forecast</option>
                            <option value="comprehensive">Comprehensive Report</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="birthDate">Birth Date</label>
                        <input type="date" id="birthDate" name="birthDate" required>
                    </div>
                    <div class="form-group">
                        <label for="birthTime">Birth Time</label>
                        <input type="time" id="birthTime" name="birthTime" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="birthPlace">Birth Place</label>
                    <input type="text" id="birthPlace" name="birthPlace" placeholder="City, State/Province, Country" required>
                </div>
                <div class="form-group">
                    <label for="notes">Additional Notes (Optional)</label>
                    <textarea id="notes" name="notes" rows="4" placeholder="Any specific questions or areas of focus..."></textarea>
                </div>
                <button type="submit" class="btn">Generate Report</button>
            </form>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Schedule Consultation page
  if (pathname === '/consultations/book') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedule Consultation - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
        }
        .navbar {
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            padding: 16px 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5em; font-weight: 600; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { color: #f8fafc; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #10b981; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .form-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .form-header { text-align: center; margin-bottom: 32px; }
        .form-header h1 { margin-bottom: 8px; }
        .form-section { margin-bottom: 32px; }
        .section-title { font-size: 1.1em; font-weight: 600; margin-bottom: 16px; color: #cbd5e1; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.3);
            background: rgba(15, 23, 42, 0.6);
            color: #f8fafc;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
        }
        .btn:hover { background: linear-gradient(135deg, #059669 0%, #047857 100%); }
        .back-link { display: inline-block; margin-bottom: 20px; color: #94a3b8; text-decoration: none; }
        .back-link:hover { color: #cbd5e1; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">✨ Jyotishai</div>
            <div class="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/settings">Settings</a>
                <a href="/api/auth/signout">Sign Out</a>
            </div>
        </div>
    </nav>
    <div class="container">
        <a href="/dashboard" class="back-link">← Back to Dashboard</a>
        <div class="form-card">
            <div class="form-header">
                <h1>📅 Schedule Consultation</h1>
                <p>Book a personalized session with our expert astrologers</p>
            </div>
            <form action="/api/consultations/create" method="POST">
                <div class="form-section">
                    <h3 class="section-title">Personal Information</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3 class="section-title">Consultation Details</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="consultationType">Consultation Type</label>
                            <select id="consultationType" name="consultationType" required>
                                <option value="">Select type</option>
                                <option value="video">Video Call</option>
                                <option value="phone">Phone Call</option>
                                <option value="chat">Text Chat</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="duration">Session Duration</label>
                            <select id="duration" name="duration" required>
                                <option value="">Select duration</option>
                                <option value="30">30 minutes - $50</option>
                                <option value="60">60 minutes - $90</option>
                                <option value="90">90 minutes - $130</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="topic">Consultation Topic</label>
                        <select id="topic" name="topic" required>
                            <option value="">Select main topic</option>
                            <option value="general">General Reading</option>
                            <option value="career">Career & Business</option>
                            <option value="relationship">Love & Relationships</option>
                            <option value="health">Health & Wellness</option>
                            <option value="spiritual">Spiritual Growth</option>
                            <option value="family">Family Matters</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3 class="section-title">Schedule</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="date">Preferred Date</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="time">Preferred Time</label>
                            <select id="time" name="time" required>
                                <option value="">Select time slot</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                                <option value="17:00">05:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="questions">Specific Questions (Optional)</label>
                        <textarea id="questions" name="questions" rows="4" placeholder="Any specific questions or areas you'd like to focus on..."></textarea>
                    </div>
                </div>
                
                <button type="submit" class="btn">Book Consultation</button>
            </form>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Compatibility Check page
  if (pathname === '/compatibility/new') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Check Compatibility - Jyotishai</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%);
            min-height: 100vh;
            color: #f8fafc;
        }
        .navbar {
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            padding: 16px 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5em; font-weight: 600; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { color: #f8fafc; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #a855f7; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .form-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.8) 100%);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 16px;
            border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .form-header { text-align: center; margin-bottom: 32px; }
        .form-header h1 { margin-bottom: 8px; }
        .person-section {
            background: rgba(15, 23, 42, 0.4);
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 24px;
        }
        .section-title { font-size: 1.1em; font-weight: 600; margin-bottom: 16px; color: #cbd5e1; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.3);
            background: rgba(15, 23, 42, 0.6);
            color: #f8fafc;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn {
            background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
        }
        .btn:hover { background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%); }
        .back-link { display: inline-block; margin-bottom: 20px; color: #94a3b8; text-decoration: none; }
        .back-link:hover { color: #cbd5e1; }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 24px;
            padding: 20px;
            background: rgba(168, 85, 247, 0.1);
            border-radius: 12px;
        }
        .feature-item {
            text-align: center;
            padding: 12px;
        }
        .feature-icon { font-size: 2em; margin-bottom: 8px; }
        .feature-title { font-weight: 600; margin-bottom: 4px; }
        .feature-desc { font-size: 0.9em; color: #94a3b8; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">✨ Jyotishai</div>
            <div class="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/settings">Settings</a>
                <a href="/api/auth/signout">Sign Out</a>
            </div>
        </div>
    </nav>
    <div class="container">
        <a href="/dashboard" class="back-link">← Back to Dashboard</a>
        <div class="form-card">
            <div class="form-header">
                <h1>💕 Compatibility Analysis</h1>
                <p>Analyze relationship compatibility between two individuals</p>
            </div>
            <form action="/api/compatibility/check" method="POST">
                <div class="person-section">
                    <h3 class="section-title">👤 First Person's Details</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name1">Full Name</label>
                            <input type="text" id="name1" name="name1" required>
                        </div>
                        <div class="form-group">
                            <label for="birthDate1">Birth Date</label>
                            <input type="date" id="birthDate1" name="birthDate1" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="birthTime1">Birth Time</label>
                            <input type="time" id="birthTime1" name="birthTime1" required>
                        </div>
                        <div class="form-group">
                            <label for="birthPlace1">Birth Place</label>
                            <input type="text" id="birthPlace1" name="birthPlace1" placeholder="City, Country" required>
                        </div>
                    </div>
                </div>
                
                <div class="person-section">
                    <h3 class="section-title">👥 Second Person's Details</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name2">Full Name</label>
                            <input type="text" id="name2" name="name2" required>
                        </div>
                        <div class="form-group">
                            <label for="birthDate2">Birth Date</label>
                            <input type="date" id="birthDate2" name="birthDate2" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="birthTime2">Birth Time</label>
                            <input type="time" id="birthTime2" name="birthTime2" required>
                        </div>
                        <div class="form-group">
                            <label for="birthPlace2">Birth Place</label>
                            <input type="text" id="birthPlace2" name="birthPlace2" placeholder="City, Country" required>
                        </div>
                    </div>
                </div>
                
                <div class="features-grid">
                    <div class="feature-item">
                        <div class="feature-icon">💖</div>
                        <div class="feature-title">Love Compatibility</div>
                        <div class="feature-desc">Emotional connection</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">💬</div>
                        <div class="feature-title">Communication</div>
                        <div class="feature-desc">Understanding level</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">📈</div>
                        <div class="feature-title">Growth Potential</div>
                        <div class="feature-desc">Long-term prospects</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">⭐</div>
                        <div class="feature-title">Overall Score</div>
                        <div class="feature-desc">Compatibility rating</div>
                    </div>
                </div>
                
                <button type="submit" class="btn">Check Compatibility</button>
            </form>
        </div>
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 - Page Not Found</h1>');
});

server.listen(PORT, () => {
  console.log(`Jyotishai server running on port ${PORT}`);
  console.log(`API endpoints available at /api/status and /api/features`);
});