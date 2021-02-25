/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyleft 2020-2021.
 */

module.exports = {
  apps: [
    {
      name: 'My Word Cards',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
