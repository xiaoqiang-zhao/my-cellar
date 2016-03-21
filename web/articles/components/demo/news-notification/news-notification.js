/**
 * @file 消息通知
 *
 * Created by zhaoxiaoqiang on 15/7/2.
 */

(function (global) {

    var hasInited = false;
    var dom = {};
    var titleHeight = 40;
    var userOption;
    var currentNews;
    var isEmpty;


    function trainByTurns() {
        var callee = arguments.callee;
        var spaceTime = userOption.spaceTime || 5000;
        setTimeout(function () {
            getNews(function (data) {
                initNewsDom(data);
                callee();
            });
        }, spaceTime);
    }

    /**
     * 初始化调戏通知
     *
     * @param {Object} option 初始化配置参数
     * @param {string} option.queryURL 获取消息的路径
     * @param {string} option.noticeReadedUrl 将信息标为已读的路径
     * @param {string} option.spaceTime 轮训间隔时间(单位:毫秒,可省略,默认5000ms)
     */
    function init(option) {
        if (hasInited === false) {
            userOption = option;
            getNews(initDom);
            // 开启轮训
            trainByTurns();
            hasInited = true;
        }
        else {
            console.log('消息通知已经初始化过了，请勿重复初始化。');
        }
    }

    /**
     * 获取消息
     *
     * @param {Function} setDom 页面操作的回调函数
     */
    function getNews(setDom) {
        $.ajax({
            url: userOption.queryURL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                currentNews = data.result;
                setDom(data);
            }
        });
    }

    /**
     * 通知后台消息已读
     *
     * @param {Object} option 初始化设置参数
     */
    function noticeReaded() {
        dom.btn.unbind('click').html('提交中...');
        var ids = [];
        for (var i = 0, len = currentNews.length; i < len; i++) {
            ids.push(currentNews[i].noticeId);
        }
        $.ajax({
            url: userOption.noticeReadedUrl,
            type: 'GET',
            dataType: 'json',
            data: {
                noticeIds: ids.join(',')
            },
            success: function (data) {
                emptyNewsList();
                foldSwitch();
                dom.titleNum.html('');
            }
        });
    }

    /**
     * 初始化消息通知模块的页面
     *
     * @param {Object} data 消息数据
     */
    function initDom(data) {
        var con = $('<div class="news-notification"></div>');
        var title = $('<div class="title"></div>');
        $('<span>消息通知</span>').appendTo(title);
        var titleNum = $('<span></span>').appendTo(title);
        var foldBtn = $('<div class="icon fold"><span></span></div>').appendTo(title);
        var ul = $('<ul><li class="empty">无未读消息</li></ul>');
        var btn = $('<div class="i-know"></div>');
        btn.hide();
        // 事件绑定
        foldBtn.click(function () {
            foldSwitch();
        });

        dom = {
            con: con,
            titleNum: titleNum,
            ul: ul,
            foldBtn: foldBtn,
            btn: btn
        };

        con.append(title).appendTo('body');
        con.height(titleHeight); // 默认折叠
        con.append(ul, btn);
        initNewsDom(data);
    }

    /**
     * 向下折叠/向上展开 信息通知窗口
     *
     * @param {boolean} isToUnfold 是否强制展开(有通知的时候条数可能多于当前条数造成看不全，通过此参数解决)
     */
    function foldSwitch(isToUnfold) {
        var foldClass = 'fold';
        var unfoldClass = 'unfold';
        // 展开
        if (dom.foldBtn.hasClass(foldClass) || isToUnfold === true) {
            dom.foldBtn.removeClass(foldClass).addClass(unfoldClass);
            var btnHeight = 0;
            if (dom.btn.is(':visible')) {
                btnHeight = dom.btn.outerHeight(true);
            }
            var height = dom.ul.outerHeight(true) + titleHeight + btnHeight;
            dom.con.animate({
                height: height
            });
        }
        // 折叠
        else {
            dom.foldBtn.removeClass(unfoldClass).addClass(foldClass);
            dom.con.animate({
                height: titleHeight
            });
        }

    }

    /**
     * 清空消息列表
     */
    function emptyNewsList() {
        var empty = '<li class="empty">无未读消息</li>';
        dom.ul.empty().append(empty);
        dom.btn.hide();
    }

    /**
     * 初始化消息的界面
     *
     * @param {Object} data 消息数据
     */
    function initNewsDom(data) {
        data = data.result;
        if (data.length > 0) {
            isEmpty = false;
            dom.ul.empty();
            dom.titleNum.html();
            for (var i = 0, len = data.length; i < len; i++) {
                var li = ''
                    + '<li>'
                    + data[i].content
                        // + '    2015-02-08 您好，截止到贵公司需要付款总额为：'
                        // + '    <span>2933.00</span>'
                        // + '    <div>点击 <a href="#"> 查看详情 </a></div>'
                    + '</li>';
                dom.ul.append(li);
            }
            dom.titleNum.html('（' + len + '）');
            dom.btn.show().html('我知道了');
            dom.btn.unbind('click').click(noticeReaded);
            // 有新消息强制展开
            foldSwitch(true);
        }
        else {
            // 优化，减少对dom不必要的操作
            if (isEmpty === false) {
                emptyNewsList();
                dom.titleNum.html('');
                isEmpty = true;
            }
        }
    }

    // 返回静态类
    global.NewsNotification = {
        init: init
    };
})(window);

