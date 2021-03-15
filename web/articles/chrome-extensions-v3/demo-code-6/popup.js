
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
        setTimeout(() => {
            chrome.tabs.create({
                url: 'https://etax.sichuan.chinatax.gov.cn',
                active: true
            }, () => {
                // debugger
                // 自动化执行
            });
        }, 5000);
    }
});
