module.exports = {
  apps: [
    {
      name: 'jyotishai-backend',
      script: '/var/www/jyotishai-saas/venv/bin/python',
      args: '/var/www/jyotishai-saas/main.py',
      cwd: '/var/www/jyotishai-saas',
      env: {
        DATABASE_URL: 'postgresql://jyotishai:jyotishai123@localhost:5432/jyotishai_saas',
        PYTHONPATH: '/var/www/jyotishai-saas',
        PATH: '/var/www/jyotishai-saas/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
      },
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/www/jyotishai-saas/logs/backend-error.log',
      out_file: '/var/www/jyotishai-saas/logs/backend-out.log',
      merge_logs: true
    },
    {
      name: 'jyotishai-frontend',
      script: 'npm',
      args: 'run start',
      cwd: '/var/www/jyotishai-saas',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/www/jyotishai-saas/logs/frontend-error.log',
      out_file: '/var/www/jyotishai-saas/logs/frontend-out.log',
      merge_logs: true
    }
  ]
};