const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage
} = require('./utils')

module.exports = {
  helpers: {
    if_or: function(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    build: {
      type: 'list',
      message: 'Vue build',
      choices: [
        {
          name: 'Runtime + Compiler: recommended for most users',
          value: 'standalone',
          short: 'standalone'
        },
        {
          name:
            'Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
          value: 'runtime',
          short: 'runtime'
        }
      ]
    },
    router: {
      type: 'confirm',
      message: 'Install vue-router?'
    },
    vuex: {
      type: 'confirm',
      message: 'Install vuex?'
    },
    elementUI:{
      type: 'confirm',
      message: 'Use element-UI in you project?'
    },
    moment:{
      type: 'confirm',
      message: 'Use moment in you project?'
    },
    axios:{
      type: 'confirm',
      message: 'Use axios in you project?'
    },
    echarts:{
      type: 'confirm',
      message: 'Use echarts in you project?'
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use CNPM',
          value: 'cnpm',
          short: 'cnpm'
        },
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm'
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no'
        }
      ]
    }
  },
  filters: {
    'src/router/**/*': 'router',
    'src/server/**/*': 'axios',
    'src/store/**/*': 'vuex',
    'src/components/table/**/*':'elementUI',
    'src/components/breadcrumb/**/*':'elementUI',
    'src/components/pagination/**/*':'elementUI',
    'src/components/layout/**/*':'elementUI',
    'src/components/echarts/**/*':'echarts',
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
}
