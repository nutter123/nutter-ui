var chalk = require('chalk')
var semver = require('semver') //语义版本控制工具
var packageConfig = require('../package.json')

function exec (cmd) { //执行cmd指令
  return require('child_process').execSync(cmd).toString().trim()//模块创建异步进程，执行shell命令
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),//获取node版本号，process是全局变量
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)//结束当前进程
  }
}
