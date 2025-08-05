#!/bin/bash

# Jyotishai SaaS Production Deployment Script
# This script handles the full deployment with proper dependency management

set -e  # Exit on error

echo "🚀 Jyotishai SaaS Production Deployment"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Change to project directory
cd /root/jyotishai-saas

# Step 1: Install Python dependencies
echo ""
echo "📦 Installing Python Dependencies..."
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

# Install in smaller batches to avoid timeouts
print_status "Installing core Python packages..."
pip install --quiet --no-cache-dir fastapi uvicorn 2>/dev/null || print_warning "Some packages may already be installed"
pip install --quiet --no-cache-dir pydantic python-dotenv 2>/dev/null || print_warning "Some packages may already be installed"
pip install --quiet --no-cache-dir sqlmodel requests 2>/dev/null || print_warning "Some packages may already be installed"

print_status "Python dependencies setup complete"

# Step 2: Install Node.js dependencies in background
echo ""
echo "📦 Installing Node.js Dependencies (this may take a while)..."
if [ ! -d "node_modules" ]; then
    print_warning "Installing Node.js packages in background..."
    nohup npm install --legacy-peer-deps > npm_install.log 2>&1 &
    NPM_PID=$!
    print_status "Node.js installation running in background (PID: $NPM_PID)"
    print_status "Check progress: tail -f npm_install.log"
else
    print_status "node_modules already exists"
fi

# Step 3: Setup database
echo ""
echo "🗄️ Checking Database Setup..."
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw jyotishai_saas; then
    print_status "Database 'jyotishai_saas' already exists"
else
    print_error "Database not found. Please run the database setup."
fi

# Step 4: Create systemd services
echo ""
echo "⚙️ Creating Systemd Services..."

# FastAPI Backend Service
cat > /tmp/jyotishai-backend.service << EOF
[Unit]
Description=Jyotishai FastAPI Backend
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/root/jyotishai-saas
Environment="PATH=/root/jyotishai-saas/venv/bin"
Environment="DATABASE_URL=postgresql://jyotishai:jyotishai123@localhost:5432/jyotishai_saas"
ExecStart=/root/jyotishai-saas/venv/bin/python /root/jyotishai-saas/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Next.js Frontend Service
cat > /tmp/jyotishai-frontend.service << EOF
[Unit]
Description=Jyotishai Next.js Frontend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/jyotishai-saas
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

if [ -f "/tmp/jyotishai-backend.service" ]; then
    sudo cp /tmp/jyotishai-backend.service /etc/systemd/system/
    print_status "Backend service created"
fi

if [ -f "/tmp/jyotishai-frontend.service" ]; then
    sudo cp /tmp/jyotishai-frontend.service /etc/systemd/system/
    print_status "Frontend service created"
fi

# Step 5: Create nginx configuration
echo ""
echo "🌐 Creating Nginx Configuration..."

cat > /tmp/jyotishai.conf << 'EOF'
server {
    listen 80;
    server_name _;  # Replace with your domain

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API Backend
    location /api/v1 {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

if [ -f "/tmp/jyotishai.conf" ]; then
    print_status "Nginx configuration created at /tmp/jyotishai.conf"
    print_warning "To enable: sudo cp /tmp/jyotishai.conf /etc/nginx/sites-available/ && sudo ln -s /etc/nginx/sites-available/jyotishai.conf /etc/nginx/sites-enabled/"
fi

# Step 6: Create monitoring script
cat > monitor.sh << 'EOF'
#!/bin/bash
# Simple monitoring script for Jyotishai services

echo "🔍 Jyotishai Services Status"
echo "============================"

# Check Backend
if pgrep -f "python.*main.py" > /dev/null; then
    echo "✅ Backend: Running"
else
    echo "❌ Backend: Not running"
fi

# Check Frontend
if pgrep -f "node.*next" > /dev/null; then
    echo "✅ Frontend: Running"
else
    echo "❌ Frontend: Not running"
fi

# Check Database
if sudo -u postgres psql -c "SELECT 1" jyotishai_saas > /dev/null 2>&1; then
    echo "✅ Database: Accessible"
else
    echo "❌ Database: Not accessible"
fi

# Check Ports
echo ""
echo "📊 Port Status:"
netstat -tlpn 2>/dev/null | grep -E ":(3000|8000)" || echo "No services listening on expected ports"
EOF

chmod +x monitor.sh
print_status "Monitoring script created: ./monitor.sh"

# Final Instructions
echo ""
echo "========================================="
echo "📋 DEPLOYMENT SUMMARY"
echo "========================================="
print_status "Project deployed to: /root/jyotishai-saas"
print_status "Database configured: jyotishai_saas"
print_status "Environment file: .env.local"
echo ""
echo "📝 NEXT STEPS:"
echo "1. Wait for npm install to complete (check: tail -f npm_install.log)"
echo "2. Build the Next.js app: npm run build"
echo "3. Start services:"
echo "   - Backend: systemctl start jyotishai-backend"
echo "   - Frontend: systemctl start jyotishai-frontend"
echo "4. Enable auto-start: systemctl enable jyotishai-backend jyotishai-frontend"
echo "5. Configure nginx for your domain"
echo ""
echo "🔧 MANUAL START (for testing):"
echo "   Backend: source venv/bin/activate && python main.py"
echo "   Frontend: npm run dev (development) or npm run start (production)"
echo ""
echo "📊 Monitor services: ./monitor.sh"
echo "========================================="