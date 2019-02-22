const SSH2Utils = require('ssh2-utils');
const async = require('async');
const {info,success,error}  = require('./output');

const ssh = new SSH2Utils();

function getServer(step,servers){
    return typeof(step.server)==='string'?servers[step.server]:step.server;
}

function getfile(step,servers){
    const server = getServer(step,servers);
    return function(callback){
        ssh.getFile(server,step.sourcePath,step.destPath,function (err){
            if (err) error(err);
            else success(`${step.name}执行完成!`);
            callback(null,step.name);
        })
    }
}

function cmd(step,servers){
    const server = getServer(step,servers);
    return function(callback){
        ssh.exec(server,step.cmd,function (err, stdout, stderr){
            if (err) error(stderr);
            else{
                success(`${step.name}执行完成!`);
                console.log(stdout);
            }
            callback(null,step.name);
        })
    }
}

function putfile(step,servers){
    const server = getServer(step,servers);
    return function(callback){
        ssh.putFile(server,step.sourcePath,step.destPath,function (err){
            if (err)error(err);
            else success(`${step.name}执行完成!`);
            callback(null,step.name);
        })
    }
}

function buildStep(servers,step){
    switch(step.cmd){
        case "getfile":return getfile(step,servers);
        case "putfile":return putfile(step,servers);
        default:return cmd(step,servers);
    }    
}

function run({server,tasks},index){
    const task = tasks[index];
    var steps = task.steps.map(x=>buildStep(server,x));
    
    return new Promise(function(resolve){
        async.series(steps,function(err,results){
            if(err)console.log(err);
            if(results) success(`成功执行任务:\n${results.join('\n')}`);
            setTimeout(resolve);
            return;
        });
    });
}

exports.run =  run;