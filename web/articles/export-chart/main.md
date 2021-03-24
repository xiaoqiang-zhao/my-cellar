# 导出 echart 图

## 源码

```js
/**
 * @file 导出 echart 图
 */

export default (data) => {
    if (!Array.isArray(data)) {
        data = [data];
    }

    data.forEach(item => {
        // 下载
        const aLink = document.createElement('a');
        const url = item.chart.getDataURL();
        aLink.href = url;
        aLink.download = item.fileName || '图';
        let event;
        if (window.MouseEvent) {
            event = new MouseEvent('click');
        }
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window);
            // , 0, 0, 0, 0, 0, false, false, false, false, 0, null
        }
        aLink.dispatchEvent(event);
    });  
};
```

## 调用

```js
import exportChart from './export-chart';
// 单个导出
exportChart({
    chart: this.taskSourceChart,
    fileName: '任务来源机构.png'
});
// 多个导出
exportChart({
    chart: this.taskSourceChart2,
    fileName: '任务来源机构2.png'
});
```

this.taskSourceChart 的初始化如下

```js
import * as echarts from 'echarts';
echarts.init(this.$refs.task);
```
