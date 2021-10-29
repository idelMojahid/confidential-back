let node_args = '';
if (process.env.npm_lifecycle_script && process.env.npm_lifecycle_script.indexOf('--env development') !== -1) {
  node_args = ["--debug"];
}

module.exports = {
  apps: {
    name: `corporeal-api`,
    cwd: '/home/ubuntu/corporeal-api/current',
    watch_options: {
      // According to pm 2 documentation usePolling must be set to true to successfully watch files over nfs
      usePolling: true,
    },
    ignore_watch: ["node_modules"],
    script: 'dist/src/main.js',
    max_restarts: 10,
    min_uptime: '20000',
    node_args: node_args,
    instances: 'max',
    exec_mode: 'cluster_mode',
    error_file: `/home/ubuntu/pm2/logs/corporeal-api.err.log`,
    out_file: `/home/ubuntu/pm2/logs/corporeal-api.out.log`,
    combine_logs: true,
    env_development: { NODE_ENV: 'development', watch: true },
    env_production: { NODE_ENV: 'production', watch: false }
  }
};
