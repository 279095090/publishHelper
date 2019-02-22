const chalk = require('chalk');
const readline = require('readline');
const config = require('./config');
const proc = require('./process');
const  {info,success,error}  = require('./output');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>'
});

const cfg = config.getConfig();

rl.write(info('任务列表:'));
rl.write(info('序号\t名称\t描述'));
cfg.tasks.forEach((task, index) => {
    rl.write(info(`${index}\t${task.name||''}\t${task.desc||''}`));
});

info('请选择要执行的任务');
rl.question('', answer => {
    const no = Number(answer);
    if (isNaN(no) || no > cfg.tasks.length) {
        error('未找到此任务序号');
        questionExit()
    }else{
        info(`开始执行任务${answer}`);
        proc.run(cfg,no).then(questionExit);
    }
});

function questionExit(){
    info('点击回车退出');
    rl.question('', answer => {
        process.exit(0);
    });
    
}