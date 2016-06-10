/**
 * Created by zhaoxiaoqiang on 16/4/7.
 */

/**
 * 子页面重新修改父页面iframe高度
 *
 * param {string} iframeId 承载当前页面的 iframe 的 id(注：必须是 id)
 * @param {Number} delayTime [可选]延迟时间
 */
function resizeParentIframe(iframeId, delayTime) {

    if (delayTime >= 0) {
        setTimeout(_, delayTime);
    }
    else {
        _();
    }

    function _() {

        var realHeight = 0;
        // Mozilla, Safari,Chrome, ...
        if (
            navigator.userAgent.indexOf("Firefox") > 0
            || navigator.userAgent.indexOf("Mozilla") > 0
            || navigator.userAgent.indexOf("Safari") > 0
            || navigator.userAgent.indexOf("Chrome") > 0
        ) {
            realHeight = window.document.documentElement.offsetHeight + 35;
        }
        // IE
        else if (navigator.userAgent.indexOf("MSIE") > 0) {
            var bodyScrollHeight = window.document.body.scrollHeight + 21; //取得body的scrollHeight
            var elementScrollHeight = window.document.documentElement.scrollHeight + 1; //取得documentElement的scrollHeight
            realHeight = Math.max(bodyScrollHeight, elementScrollHeight); //取当中比较大的一个
        }
        //其他浏览器
        else {
            realHeight = window.document.body.scrollHeight + window.document.body.clientHeight + 1;
        }
        if (realHeight < 400) {
            realHeight = 400;
        }
        // 查看是否有跨域的情况，如果有需要事先解决否则无法操作父窗口中的任何东西
        if (window.parent.document !== document) {
            var iframe = window.parent.document.getElementById('iframe');
            if (iframe !== null) {
                // 横向滚动条出现时会多出15像素
                var scrollHeight = 0;
                if (document.documentElement.clientHeight < document.documentElement.offsetHeight) {
                    scrollHeight = 15;
                }
                iframe.height = realHeight + scrollHeight;
            }
        }
    }
}
var module = module || {};
module.exports = resizeParentIframe;