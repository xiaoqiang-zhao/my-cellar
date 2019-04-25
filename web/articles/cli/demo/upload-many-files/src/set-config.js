/**
 * 设置配置
 */

const fsPromises = require('fs').promises;
const configField = [
    'serverUrl',
    'folderPath',
    'extname'
];

const configPath = __dirname + '/../data/config.json';

module.exports = {

    /**
     * 初始化，通过判断参数是否需要初始化
     *
     * @param {Object} program 命令行参数对象
     */
    async pipe(program) {
        // 初始化
        if (program.init) {
            let config = await this.initConfig(program);
            
            const content = JSON.stringify(config, null, 2);
            return fsPromises.writeFile(configPath, content, {
                encoding: 'utf-8'
            }).then(() => {
                console.log('初始化配置写入成功');
            }, error => {
                console.log('初始化配置写入失败', error);
            });
        }
    },

    /**
     * 生成配置对象
     *
     * @param {Object} program 命令行参数对象
     */
    async initConfig(program) {
        let config = await fsPromises.readFile(configPath);
        let configObject = JSON.parse(config);
        // 验证必填项 生成配置文件
        const result = configField.every(item => {
            if (program[item]) {
                configObject[item] = program[item];
                return true;
            }
            else {
                console.log(`参数 ${item} 为初始化必填参数`);
                return false;
            }
        });
        if (result) {

            // 检测文件是否存在
            await fsPromises.access(program.folderPath).then(() => {
                console.log(`文件夹路径 ${program.folderPath} 验证通过`);
            }, error => {
                console.log(`文件夹路径 ${program.folderPath} 不存在`);
            });

            configObject.isInited = true;

            return configObject;
        }

        return Promise.reject();
    }
}