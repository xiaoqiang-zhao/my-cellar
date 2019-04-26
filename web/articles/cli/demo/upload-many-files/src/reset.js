/**
 * 重置到初始化状态
 */
const fs = require('fs');
const fsPromises = fs.promises;
const chalk = require('chalk');

const log = require('./log');
const configPath = __dirname + '/../data/config.json';
const jobsPath = __dirname + '/../data/jobs.json';

module.exports = {

    /**
     * 重置到初始化状态
     *
     * @param {Object} program 命令行参数对象
     */
    async pipe(program) {
        if (program.reset){
            // 配置重置
            const configContent = JSON.stringify({
                isInited: false
            }, null, 2);

            await fsPromises.writeFile(configPath, configContent, {
                encoding: 'utf-8'
            });
            let text = '配置重置成功';
            console.log(chalk.green(text));
            log.trace(text);

            // 任务重置
            const jobsContent = JSON.stringify({
                status: 0,
                uploadedTotal: 0,
                jobList: []
            }, null, 2);
            await fsPromises.writeFile(jobsPath, jobsContent, {
                encoding: 'utf-8'
            });
            text = '上传任务重置成功';
            console.log(chalk.green(text));
            log.trace(text);
        }
    }
}
