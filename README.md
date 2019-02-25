# 说明  
## 由来  
在发版的时候遇到网络问题,git仓库和客户生产分别在不通的公司内网中,无法互通.每次发生产需要人工在跳板机上执行操作,这无疑加重了运维人力成本.所以写了这么一个基于ssh的任务调度助手,帮助运维人员从发版的事务中解救出来.当然这个主要是针对windows没有ssh客户端的问题,Linux可自编写shell命令,不存在这个问题.
## 使用说明  
这个助手主要基于任务Task,在Task中定义了一系列的Step来序列化执行命令,每个命令都有目标Server.而且在配置文件中提供了统一的Server配置项,可以简化Step配置.  
例:
```json
{
    "server": {
        "76": {
            "host": "10.238.225.76",
            "username": "qgl",
            "password": "123123123"
        }
    },
    "tasks": [{
        "name": "getFile",
        "desc": "获取文件",
        "steps": [{
                "name": "ls",
                "server": "76",
                "cmd": "ls"
            },
            {
                "server": {
                    "host": "10.238.225.76",
                    "username": "qgl",
                    "password": "123123123"
                },
                "cmd": "getfile",
                "sourcePath": "",
                "destPath": ""
            },
            {
                "server": "76",
                "cmd": "putfile",
                "sourcePath": "",
                "destPath": ""
            }
        ]
    }]
}
```
### Server
目标服务器,执行cmd的目标服务器
```
 "76": {    //标识
            "host": "10.238.225.76",    //IP地址
            "username": "qgl",          //用户名
            "password": "123123123"     //密码
        }
```
### Task
任务:一系列Step的集合
```json
"name": "getFile",      //任务名称
"desc": "获取文件",     //任务说明
"steps": [{...}]        //命令步骤
```
### Step
命令步骤
```json
{
    "name": "ls",   //步骤名称
    "server": "76", //目标服务器
    "cmd": "ls"     //使用命令
},
```
### 可用命令
#### getFile  
获取文件,这里有两个特别的参数
```json
{
    "sourcePath":"文件源地址--server上的文件地址",
    "destPath":"目标地址--本地文件地址"
}
```
#### putFile  
上传文件,这里有两个特别的参数
```josn
{
    "sourcePath":"文件源地址--本地文件地址",
    "destPath":"目标地址--server上的文件地址"
}
```
#### 其他  
其他命令例如 ls, ps 之类的不涉及到文件传送的命令都可以使用.

Author:fanerstar  
Email:fanerstar@gmail.com  
Date:2019-2-25  


