/**
 * Created by zhaoxiaoqiang on 16/4/7.
 */

/**
 * 子页面重新修改父页面iframe高度
 *
 * @param {Number} delayTime [可选]延迟时间
 */
function resizeParentIframe(delayTime) {

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
        if (window.parent.document !== document) {
            var iframe = window.parent.document.getElementById('iframe');
            if (iframe !== null) {

            }
            $("#iframe", window.parent.document).height(realHeight);
        }
    }
}

module.exports = resizeParentIframe;