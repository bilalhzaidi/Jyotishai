# 🚀 QUICK START GUIDE - Jyotishai SaaS

## Current Status
✅ **Backend Ready** - Python FastAPI backend can run
✅ **Database Ready** - PostgreSQL configured
✅ **Environment Ready** - All configs in place
⏳ **Frontend Pending** - Node.js dependencies need installation

## 🔥 Start Backend NOW (Works!)

```bash
cd /root/jyotishai-saas
source venv/bin/activate
export DATABASE_URL="postgresql://jyotishai:jyotishai123@localhost:5432/jyotishai_saas"
python main.py
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

## 📦 Complete Frontend Setup

The Node.js installation is taking time due to large dependencies. Run this manually:

```bash
cd /root/jyotishai-saas

# Option 1: Use npm with force
npm install --force

# Option 2: Use yarn (might be faster)
yarn install

# Option 3: Install only production deps
npm install --production
```

Once installed, run frontend:
```bash
npm run dev
```

Frontend will be available at: http://localhost:3000

## 🎯 Required API Keys

Add these to `.env.local` before production use:
- `OPENAI_API_KEY` - For AI-powered astrology analysis
- `FASTPAY_MERCHANT_ID` - For Pakistan payment processing
- `FASTPAY_MERCHANT_KEY` - FastPay credentials
- `STRIPE_SECRET_KEY` - For international payments (optional)

## 🛠️ Production Deployment

1. **Install PM2 for process management:**
   ```bash
   npm install -g pm2
   ```

2. **Start services with PM2:**
   ```bash
   # Backend
   pm2 start "source venv/bin/activate && python main.py" --name jyotishai-backend
   
   # Frontend (after npm install completes)
   pm2 start "npm run start" --name jyotishai-frontend
   
   # Save PM2 config
   pm2 save
   pm2 startup
   ```

3. **Setup Nginx (optional):**
   ```bash
   sudo cp /tmp/jyotishai.conf /etc/nginx/sites-available/
   sudo ln -s /etc/nginx/sites-available/jyotishai.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## 🔍 Troubleshooting

**If npm install fails:**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json

# Try with different registry
npm install --registry https://registry.npmjs.org/
```

**If Python backend won't start:**
```bash
# Install missing dependencies
source venv/bin/activate
pip install flatlib pyswisseph python-docx reportlab
```

**Check service status:**
```bash
# Backend
curl http://localhost:8000/health

# Database
sudo -u postgres psql -c "SELECT 1" jyotishai_saas
```

## 📞 Support Files

- `deploy.sh` - Full automation script
- `start.sh` - Quick start script
- `test_backend.py` - Backend test script
- `DEPLOYMENT_STATUS.md` - Detailed status

---

**The backend is ready to run!** Frontend just needs `npm install` to complete.