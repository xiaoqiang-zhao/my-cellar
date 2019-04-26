/**
 * 将设置回归到安装初始化状态
 */
const fs = require('fs');
const fsPromises = fs.promises;
const chalk = require('chalk');

const configPath = __dirname + '/../data/config.json';
const jobsPath = __dirname + '/../data/jobs.json';

module.exports = {

    async pipe(program) {
        if (program.reset){
            // 配置重置
            const configContent = JSON.stringify({
                isInited: false
            }, null, 2);

            await fsPromises.writeFile(configPath, configContent, {
                encoding: 'utf-8'
            });
            console.log(chalk.blue('配置重置成功'));

            // 任务重置
            const jobsContent = JSON.stringify({
                status: 0,
                jobList: []
            }, null, 2);
            await fsPromises.writeFile(jobsPath, jobsContent, {
                encoding: 'utf-8'
            });
            console.log(chalk.blue('上传任务重置成功'));
            console.log('--');
        }
    }
}