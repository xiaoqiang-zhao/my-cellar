
const container = document.getElementById('task-container');

const pullTaskListBtn = document.getElementById('pullTaskListBtn');


chrome.runtime.onMessage.addListener(request => {
    if (request.name === 'taskList') {
        let result = '';
        request.data.forEach(item => {
            item.status = '待执行';
            item.styleClass = 'todo';
            result += `
            <div class="item">
                ${item.companyName}
                <span class="${item.styleClass}">
                    ${item.status}
                </span>
            </div>
            `;
        });
        container.innerHTML = result;

        chrome.action.setBadgeText({
            text: request.data.length.toString()
        });
        chrome.tabs.create({
            url: 'https://www.zhihu.com',
            active: true
        }, () => {
            // debugger
            // 自动化执行
        });
    }
});

pullTaskListBtn.addEventListener('click', event => {
    // chrome.storage.sync.get('taskList', ({ taskList }) => {
    //     debugger
    //     // backgroundColor = taskList;
    // });
    debugger
    let [tab] = chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function() {
            debugger
            const taskListDataInput = document.getElementById('taskListDataInput');
            if (taskListDataInput) {
                debugger
                taskListDataInput.value;

                let result = '';
                request.data.forEach(item => {
                    item.status = '待执行';
                    item.styleClass = 'todo';
                    result += `
                    <div class="item">
                        ${item.companyName}
                        <span class="${item.styleClass}">
                            ${item.status}
                        </span>
                    </div>
                    `;
                });
                container.innerHTML = result;

                chrome.action.setBadgeText({
                    text: request.data.length.toString()
                });
                chrome.tabs.create({
                    url: 'https://www.zhihu.com',
                    active: true
                }, () => {
                    // debugger
                    // 自动化执行
                });
            }
        },
    });
});