module.exports = {
  apps: [{
    name: 'vod-server',
    script: './bin/www',
    watch: false, // 默认关闭watch 可替换为 ['src']
    ignore_watch: ['node_modules', 'logs'],
    out_file: '/logs/pm2-out.log', // 日志输出
    error_file: '/logs/pm2-error.log', // 错误日志
    max_memory_restart: '800M', // 超过多大内存自动重启，仅防止内存泄露有意义，需要根据自己的业务设置
    env: {
      NODE_ENV: 'production',
    },
    exec_mode: 'cluster', // 开启多线程模式，用于负载均衡
    instances: 'max', // 启用多少个实例，可用于负载均衡
    autorestart: true, // 程序崩溃后自动重启
  }],
};
