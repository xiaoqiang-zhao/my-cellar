/**
 * @file 自动提交 git 脚本
 * @author xiaoqiang-zhao
 */

const spawn = require('child_process').spawn;
const options = {
    // 指定执行路径
    cwd: '/Users/zhaoxiaoqiang/code-github/my-cellar',
    // 为了可以直接使用 git 命令
    shell: true
};

// 任务定义
const taskList = [
    {
        // 提交文件
        files: [
            'web/articles/node-base/demo/git-auto.js'
        ],
        hours: 1,
        message: '添加 Demo: node-base / git 自动提交'
    }
];

/**
 * 执行 git add 任务
 *
 * @param {Object} taskConfig 任务配置
 */
async function gitAddTask(taskConfig) {
    return delayTask(taskConfig, resolve => {
        const commandStr = `git add ${taskConfig.files.join(' ')}`;
        const command = spawn(commandStr, options);
        console.log(`command: ${commandStr}, ${getCurrentDateStr()}`);
        command.on('exit', code => {
            if (code === 0) {
                console.log(`command success: ${commandStr}, ${getCurrentDateStr()}`);
                resolve();
            }
        });
    });
}

/**
 * 执行 git commit 任务
 *
 * @param {Object} taskConfig 任务配置
 */
async function gitCommitTask(taskConfig) {
    return new Promise((resolve, reject) => {
        const commandStr = `git commit -m "${taskConfig.message}"`;
        const command = spawn(commandStr, options);
        console.log(`command: ${commandStr}, ${getCurrentDateStr()}`);
        command.on('exit', code => {
            if (code === 0) {
                console.log(`command success: ${commandStr}, ${getCurrentDateStr()}`);
                resolve();
            }
        });
    });
}

/**
 * 执行 git push 任务
 *
 * @param {Object} taskConfig 任务配置
 */
async function gitPushTask(taskConfig) {
    return new Promise((resolve, reject) => {
        const commandStr = `git push`;
        const command = spawn(commandStr, options);
        console.log(`command: ${commandStr}, ${getCurrentDateStr()}`);
        command.on('exit', code => {
            if (code === 0) {
                console.log(`command success: ${commandStr}, ${getCurrentDateStr()}`);
                resolve();
            }
        });
    });
}

/**
 * 延时执行任务
 *
 * @param {Object} taskConfig 任务配置
 * @param {function} task 任务函数
 *
 * @return {Object} promise 对象
 */
function delayTask(taskConfig, task) {
    return new Promise((resolve, reject) => {
        // 时间，小时转毫秒
        const time = 1000 * 60 * 60 * taskConfig.hours;
        console.log(`任务开始倒计时执行: ${taskConfig.message}, ${getCurrentDateStr()}`);
        setTimeout(() => {
            task(resolve, reject);
        }, time);
    });
}

/**
 * 获取当前时间串
 */
function getCurrentDateStr() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return dateStr;    
}

/**
 * 执行 git 指令
 *
 * @param {Object} taskConfig 任务配置
 */
async function doGitCommand(taskConfig) {
    await gitAddTask(taskConfig);
    await gitCommitTask(taskConfig);
    await gitPushTask();
}

taskList.forEach((item, index) => {
    doGitCommand(item);
});

console.log('-----------------');
