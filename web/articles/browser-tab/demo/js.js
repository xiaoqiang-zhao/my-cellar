/**
 * Created by zhaoxiaoqiang on 16/6/9.
 */
var tab = new Vue({
    el: '#tab',
    replace: false,
    data: {
        count: 3,
        activeId: null,
        tabs: [
        ]
    },
    methods: {
        openTab: function (options) {
            // 添加和切换 Tab
            if (options.id === undefined) {
                // 判断是否存在
                var isExist = this.$data.tabs.some(function (item) {
                    if (item.uid === options.uid) {
                        options = item;
                        return true;
                    }
                });
                // 新添加Tab项
                if (!isExist) {
                    options.id = this.$data.count++;
                    // this.$data.activeId = options.id;
                    this.$data.tabs.push(options);
                }
            }

            this.$data.activeId = options.id;
            // 自适应 iframe

            // 写 cookie
            var key = 'open2_jump_key=';
            $.cookie(key, options.uid);
        },
        closeTab: function (options, e) {
            var tabs = this.$data.tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].id === options.id) {
                    tabs.splice(i, 1);
                    // 当前是激活状态
                    if (options.id === this.activeId) {
                        // 向后
                        if (tabs[i] !== undefined) {
                            this.openTab(tabs[i]);
                        }
                        // 向前
                        else if (i > 0) {
                            this.openTab(tabs[i - 1]);
                        }
                    }
                    break;
                }
            }
            // 关闭不切换，所以阻止原生事件冒泡
            e.stopPropagation();
        },
        setCookie: function (name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();

            function Setcookie (name, value){

                //设置名称为name,值为value的Cookie
                var expdate = new Date();   //初始化时间
                expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
                document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString()+";";

                //即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
            }
        }
    },
    events: {}
});
window.openTab = function (options, cb) {
    tab.openTab(options);
    cb || cb(document.body);
};
$(window).bind('beforeunload', function () {
    // window.opener.closeWindowCb();
    window.opener.open2_zhitc_shop = undefined;//childrenWindow
});