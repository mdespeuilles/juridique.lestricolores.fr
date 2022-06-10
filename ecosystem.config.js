module.exports = {
  apps: [
    {
      name: 'juridique.lestricolores.fr',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
        STRIPE_KEY: 'pk_test_51Kb2odI7VDc1iyhhf8ijVHXKnaDu2Tr0J0GqIW0lWrH1SGIMHFDyh0u22U8q6g8AecN9CqhepggAAvSHYZtQ1Pc600EgjxU1az'
      }
    }
  ],

  deploy: {
    // "production" is the environment name (env_production)
    production: {
      user: 'ubuntu',
      host: ['52.47.131.55'],
      ref: 'origin/main',
      repo: 'git@github-front:mdespeuilles/juridique.lestricolores.fr.git',
      path: '/home/ubuntu/www/juridique.lestricolores.fr',
      'post-deploy': 'npm install && npm run build && /home/ubuntu/.npm-global/bin/pm2 reload ecosystem.config.js --env production'
    }
  }
}
