const fs = require('fs');
const path = require('path');


function getConfig() {
    const filepath = path.join(process.cwd(), 'tasks.json');
    console.log(`load ${filepath}`)
    try {
        fs.accessSync(filepath, fs.constants.F_OK | fs.constants.R_OK);
        return require(filepath);
    } catch (error) {
        console.error(`没有找到任务文件${filepath}`);
        throw error;
    }
}
exports.getConfig = getConfig