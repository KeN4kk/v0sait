module.exports = {
  apps: [{
    name: 'ken4kk-site',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/root/KeN4kk_AI/long_response_site',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_PATH: '/root/KeN4kk_AI/bot_data.db'
    }
  }]
}
