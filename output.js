const chalk = require('chalk');

exports.info = function (msg) {
    console.log(chalk.rgb(185,192,203)(msg))
}
exports.success = function (msg) {
    console.log(chalk.green(msg))
}
exports.error = function (msg) {
    console.log(chalk.red(msg))
}
exports.warn = function (msg) {
    console.log(chalk.yellow(msg))
}