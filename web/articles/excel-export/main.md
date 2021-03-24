# excel 导出

> 常用功能。

## 依赖安装

```shell
npm install xlsx --save
```

## export-excel 详细代码

```js
import * as XLSX from "xlsx";

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

export default (data, fileName) => {
    if (!Array.isArray(data)) {
        data = [data];
    }

    const workBook = {
        Sheets: {},
        SheetNames: []
    };

    data.forEach(item => {
        const workSheet = XLSX.utils.aoa_to_sheet(item.data);
        workBook.Sheets[item.sheetName] = workSheet;
        workBook.SheetNames.push(item.sheetName);
    });

    const excelBuffer = XLSX.write(
        workBook,
        {
            bookType: 'xlsx',
            type: 'array'
        }
    );
    const fileData = new Blob(
        [excelBuffer],
        {
            type: fileType
        }
    );

    // 下载
    const aLink = document.createElement('a');
    const url = URL.createObjectURL(fileData);
    aLink.href = url;
    aLink.download = fileName || '统计数据';
    let event;
	if (window.MouseEvent) {
        event = new MouseEvent('click');
    }
	else {
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
    aLink.dispatchEvent(event);
};
```

## 调用方式

```js
import exportExcel from './export-excel';
// 单个 sheet
exportExcel({
    sheetName: 'sheet1',
    data: [
        ['表', '头', '内', '容'],
        [1, 2, 3, 4],
        ['中', '文', '字', '符'],
    ]
}, '文件名');
// 多个 sheet
exportExcel([
    {
        sheetName: 'sheet1',
        data: [
            ['表', '头', '内', '容'],
            [1, 2, 3, 4],
            ['中', '文', '字', '符'],
        ]
    },
    {
        sheetName: 'sheet2',
        data: [
            ['表', '头', '内', '容'],
            [1, 2, 3, 4],
            ['中', '文', '字', '符'],
        ]
    }
], '文件名');
```
