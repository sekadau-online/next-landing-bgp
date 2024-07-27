module.exports = {
  apps: [
    {
      name: 'bgpwestkal',
      error_file: "./next-landing-bgp/logs/web.err.log",
      out_file: "./next-landing-bgp/logs/web.out.log",
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      instances: 1, // Ubah ke dalam bentuk angka
      script: './node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1', // Menambahkan alamat IP di sini
      env: {
        NODE_ENV: "development",
        PORT: 3001 // Menentukan port di sini
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001 // Menentukan port di sini
      }
    }
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
