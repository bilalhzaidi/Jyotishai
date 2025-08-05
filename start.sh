#!/bin/bash

# Jyotishai SaaS Startup Script
echo "🚀 Starting Jyotishai SaaS Platform..."

# Activate Python virtual environment
echo "📦 Activating Python environment..."
source venv/bin/activate

# Set environment variables
export DATABASE_URL="postgresql://jyotishai:jyotishai123@localhost:5432/jyotishai_saas"
export NEXTAUTH_URL="http://localhost:3000"
export NEXTAUTH_SECRET="jyotishai-production-secret-key-minimum-32-characters-long-for-security"

# Start services
echo "🗄️ Starting FastAPI backend..."
cd /root/jyotishai-saas
python main.py &
BACKEND_PID=$!

echo "⚡ Backend started with PID: $BACKEND_PID"
echo "🌐 FastAPI backend running on: http://localhost:8000"
echo "📊 Next.js frontend will be available on: http://localhost:3000"
echo ""
echo "✅ Jyotishai SaaS Platform is ready! (Configured for FastPay Pakistan)"
echo "⚠️  Note: Frontend requires 'npm install' and 'npm run dev' to start"
echo ""
echo "To stop the backend: kill $BACKEND_PID"