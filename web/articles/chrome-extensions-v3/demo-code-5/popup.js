
const btnAdd = document.getElementById('btnAdd');
const btnMinus = document.getElementById('btnMinus');
const btnOpenTab = document.getElementById('btnOpenTab');

btnAdd.addEventListener('click', async () => {
    chrome.storage.sync.get('total', ({total}) => {
        if (total === undefined) {
            total = 0;
        }
        total++;
        chrome.storage.sync.set({ total });
        if (total === 0) {
            total = '';
        }
        chrome.action.setBadgeText({
            text: total.toString()
        });
    });
});

btnMinus.addEventListener('click', async () => {
    chrome.storage.sync.get('total', ({total}) => {
        if (total === undefined) {
            total = 0;
        }
        total--;
        chrome.storage.sync.set({ total });
        if (total === 0) {
            total = '';
        }
        chrome.action.setBadgeText({
            text: total.toString()
        });
    });
});

btnOpenTab.addEventListener('click', async () => {
    chrome.tabs.create({
        url: 'https://www.zhihu.com',
        active: true
    }, () => {
        debugger
    });
});
