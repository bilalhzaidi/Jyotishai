module.exports = {
  apps: [
    {
      name: 'jyotishai-frontend',
      script: 'node',
      args: 'server.js',
      cwd: '/var/www/jyotishai-saas',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/www/jyotishai-saas/logs/frontend-error.log',
      out_file: '/var/www/jyotishai-saas/logs/frontend-out.log',
      merge_logs: true
    }
  ]
};