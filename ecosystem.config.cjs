module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'dist/index.cjs',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/portfolio/error.log',
    out_file: '/var/log/portfolio/out.log',
    log_file: '/var/log/portfolio/combined.log',
    time: true
  }]
};
