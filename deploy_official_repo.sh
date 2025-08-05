#!/bin/bash
set -e

# 1. Backup current deployment
echo "Backing up current deployment..."
tar czf /var/www/jyotishai-saas-backup-$(date +%F-%H%M).tar.gz /var/www/jyotishai-saas

# 2. Clone or update the official repo
cd /var/www/
if [ ! -d jyotishai-saas-official ]; then
  git clone https://github.com/bilalhzaidi/Jyotishai.git jyotishai-saas-official
else
  cd jyotishai-saas-official
  git pull
fi

# 3. Python backend setup
cd /var/www/jyotishai-saas-official
if [ ! -d venv ]; then
  python3 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 4. Node frontend setup
npm install

# 5. Prisma/DB setup (if needed)
if [ -d prisma ]; then
  npx prisma generate || true
  npx prisma migrate deploy || true
  npx prisma db push || true
  npx prisma db seed || true
fi

# 6. Build frontend
npm run build

# 7. Stop any running backend on 8002
pkill -f "uvicorn main:app" || true

# 8. Start backend (FastAPI)
nohup venv/bin/uvicorn main:app --host 0.0.0.0 --port 8002 > backend.log 2>&1 &

# 9. Start frontend (Next.js)
nohup npm start > frontend.log 2>&1 &

echo "Deployment complete!"
echo "Check backend: http://localhost:8002/api/status"
echo "Check frontend: http://localhost:3000/"
