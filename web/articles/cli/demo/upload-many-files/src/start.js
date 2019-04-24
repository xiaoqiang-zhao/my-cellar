/**
 * 启动上传
 */

const fsPromises = require('fs').promises;

module.exports = {

    /**
     * 上传文件
     *
     * @param {Object} program 命令行参数对象
     */
    async pipe(program) {
        if (program.start) {
            // 读取配置文件
            let configContent = await fsPromises.readFile('./data/config.json');
            configObject = JSON.parse(configContent);
            if (configObject.isInited) {
                await this.initUploadJobs(configObject);
                await this.startUploadFiles(configObject);
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
    initUploadJobs(config) {

    },

    /**
     * 开始上传文件
     *
     * @param {Object} config 配置对象
     */
    startUploadFiles(config) {
        // 扫描文件夹
    }
};