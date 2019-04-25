/**
 * 启动上传
 */

const fsPromises = require('fs').promises;
var path = require('path');

const configPath = __dirname + '/../data/config.json';
const jobsPath = __dirname + '/../data/jobs.json';

module.exports = {

    /**
     * 上传文件
     *
     * @param {Object} program 命令行参数对象
     */
    async pipe(program) {
        if (program.start) {
            // 读取配置文件
            let configContent = await fsPromises.readFile(configPath);
            const config = JSON.parse(configContent);
            if (config.isInited) {
                await this.initUploadJobs(config);
                await this.startUploadFiles(config);
            }
            else {
                console.log('未完成初始化');
            }
        }
    },
    
    /**
     * 初始化上传任务
     *
     * @param {Object} config 配置对象
     */
    async initUploadJobs(config) {
        // 是否有中断的任务
        let jobsContent = await fsPromises.readFile(jobsPath);
        const jobs = JSON.parse(jobsContent);

        // status: 0 未开始，1 上传中，2 已完成
        if (jobs.status === 0) {
            jobs.jobList = [];
            await this.initJobsData(config.folderPath, jobs, config);
            await this.writeJobsFile(jobs, 1);
        }
        // 写文件
        // console.log('==', jobs);
    },

    /**
     * 初始化任务文件，方便断点续传和任务统计
     */
    async initJobsData(filePath, jobs, config) {
        await fsPromises.readdir(filePath).then(async files => {
            for (let index = 0; index < files.length; index++) {
                let filename = files[index];
                const filedir = path.join(filePath, filename);
                await fsPromises.stat(filedir).then(async stats => {
                    // 文件夹
                    if (stats.isDirectory()) {
                        await this.initJobsData(filedir, jobs, config);
                    }
                    // 文件
                    else {debugger
                        this.pushJobItem(jobs, filedir, config);
                    }
                });
            }
        });
    },

    /**
     * 
     * @param {Object} jobs 
     * @param {string} filedir 
     */
    pushJobItem(jobs, filedir, config) {
        const extnames = config.extname.split(',');
        const extname = path.extname(filedir);

        if (extnames.includes(extname)) {
            jobs.jobList.push({
                path: filedir,
                isUploaded: false
            });
        }
    },

    async writeJobsFile(jobs, status) {
        jobs.status = status;
        const content = JSON.stringify(jobs, null, 2);
        return fsPromises.writeFile(jobsPath, content, {
            encoding: 'utf-8'
        }).then(() => {
            console.log('上传任务准备成功');
        }, error => {
            console.log('上传任务准备失败', error);
        });
    },

    /**
     * 开始上传文件
     *
     * @param {Object} config 配置对象
     */
    async startUploadFiles(config) {
    }
};