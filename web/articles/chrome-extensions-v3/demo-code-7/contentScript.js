// 确认是我们要监听的网站，这里用本地测试地址
if (document.URL.includes('http://127.0.0.1:8898/pages')) {
    listenTask();
}

/**
 * 监听任务是否建立
 */
function listenTask () {
    const value = 'true';
    const taskListDataInput = document.getElementById('taskListDataInput');
    if (taskListDataInput) {
        // 是否已绑定过事件
        const isBinded = taskListDataInput.getAttribute('chrome-extension');
        if (!isBinded) {
            createTaskList(taskListDataInput);
        }
        taskListDataInput.setAttribute('chrome-extension', value);
    }
    // 轮训
    setTimeout(() => {
        listenTask();
    }, 300);
}

/**
 * 新建任务队列
 */
function createTaskList(taskListDataInput) {
    const value = taskListDataInput.value;
    const list = JSON.parse(value);
    
    // 推送消息
    chrome.runtime.sendMessage({
        name: 'taskList',
        data: list
    });
    // 保存数据
    chrome.storage.sync.set({
        'taskList': value
    });
}

// function injectedFunction() {
//     document.body.style.backgroundColor = 'orange';
// }

// injectedFunction();

// window.injectedFunction = injectedFunction;
// debugger
// const checkBillesBtn = document.getElementById('checkBillesBtn');

// setTimeout(() => {
//     const checkBillesBtn = document.getElementById('checkBillesBtn');
//     checkBillesBtn.addEventListener('click', () => {
//         injectedFunction();
//     });
// }, 5000);
// chrome.tabs
// let [tab] = chrome.tabs.query({
//     active: true,
//     currentWindow: true
// });
// debugger
// chrome.scripting.executeScript({
//     target: {
//         tabId: tab.id
//     },
//     function() {
//         // document.body.style.backgroundColor = 'red';
//         // // 如果页面中有单选按钮，可以用下面的代码控制其选中
//         // const doms = document.getElementsByClassName('el-radio__original');
//         // for (let i = 0; i < doms.length; i++) {
//         //     const item = doms[i];
//         //     if (item.value === 'female') {
//         //         item.checked = true;
//         //     }
//         //     else if (item.value === 'male') {
//         //         item.checked = false;
//         //     }
//         // }
//         window.injectedFunction = injectedFunction;
//     },
// });