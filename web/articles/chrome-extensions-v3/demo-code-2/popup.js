const redBtn = document.getElementById("redBtn");
const greenBtn = document.getElementById("greenBtn");

redBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function() {
            document.body.style.backgroundColor = 'red';
            // 如果页面中有单选按钮，可以用下面的代码控制其选中
            const doms = document.getElementsByClassName('el-radio__original');
            for (let i = 0; i < doms.length; i++) {
                const item = doms[i];
                if (item.value === 'female') {
                    item.checked = true;
                }
                else if (item.value === 'male') {
                    item.checked = false;
                }
            }
        },
    });
});
greenBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function() {
            document.body.style.backgroundColor = 'green';
            const doms = document.getElementsByClassName('el-radio__original');
            for (let i = 0; i < doms.length; i++) {
                const item = doms[i];
                if (item.value === 'male') {
                    item.checked = true;
                }
                else if (item.value === 'female') {
                    item.checked = false;
                }
            }
        },
    });
});
