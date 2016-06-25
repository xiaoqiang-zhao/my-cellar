/**
 * Created by zhaoxiaoqiang on 16/6/22.
 */
var playerControl = (function () {
    var media = new Audio();

    // 清空所有播放进度
    var clearPlaybar = function () {
        var eles = document.querySelectorAll('.bba-telphone-record-voice-cur');
        for (var i = 0, o; o = eles[i]; i++) {
            o.style.width = '0%';
        }
    };

    media.addEventListener('timeupdate', function (event) {
        var timestamp = event.timeStamp;
        var cur = document.querySelector('.bba-telphone-record-voice-play');
        var totalTime = +cur.getAttribute('data-total');
        var startTime = cur.startTime;
        var bar = cur && cur.nextElementSibling;
        var now = (new Date()).getTime();
        var rate = (now - startTime) / (totalTime * 1000);

        if ((rate * 100) <= 100) {
            bar.style.width = rate * 100 + '%';
        } else {
            bar.style.width = '100%';
        }
    });
    media.addEventListener('ended', function () {
        var cur = document.querySelector('.bba-telphone-record-voice-play');
        cur.className = cur.className.replace(/bba-telphone-record-voice-play/g, 'bba-telphone-record-voice-pause');
        cur.startTime = null;
        var bar = cur && cur.nextElementSibling;
        bar && (bar.style.width = '0%');
    });

    return {
        play: function (url, el) {
            //el.startTime = (new Date()).getTime();
            //clearPlaybar();

            media.src = url;
            media.load();
            media.play();
        },
        stop: function (url, el) {
            media.pause();
        }
    };
})();

//
new Vue({
    el: '#app',
    data: {
        // 状态和临时数据
        hasData: false,
        selectedCall: [],
        isSelectedAllCall: false,
        isLoading: false,
        isDraw: false,

        // 交互数据
        phone: '13726695418',
        basicInfo: {},
        drawData: null,
        callList: []
    },
    computed: {
        //isSelectedAllCall: function () {
        //    // debugger;
        //    var result = this.selectedCall.length === this.callList.length;
        //    if (this.callList.length === 0) {
        //        result = false;
        //    }
        //    return result;
        //}
    },
    methods: {
        search: function () {
            var $data = this.$data;
            var phone = this.$data.phone;
            phone = $.trim(phone);
            // 电话号码验证
            if (phone === '') {
                return;
            }
            $data.isLoading = true;
            $data.isDraw = false;
            $data.hasData = false;
            $data.drawData = null;
            $.ajax({
                url: '/phone/getBasicInfoByPhoneNum.do',
                data: {
                    phone: phone
                },
                success: function (data) {
                    data = data.data;
                    $data.isLoading = false;
                    data.callList.forEach(function (item) {
                        item.foldStatus = false;
                        item.isPlaying = false;
                        item.foldText = '展开文本';
                    });
                    $data.callList = data.callList;
                    $data.basicInfo = data.basicInfo;

                    // 状态处理
                    $data.hasData = true;
                    $data.selectedCall = [];
                    $data.isSelectedAllCall = false;
                }
            });
        },
        selectAllCall: function () {
            var $data = this.$data;
            if ($data.isSelectedAllCall) {
                //$data.isSelectedAllCall = false;
                $data.selectedCall = [];
            }
            else {
                //$data.isSelectedAllCall = true;
                $data.selectedCall = [];
                $data.callList.forEach(function (item) {
                    $data.selectedCall.push(item.id);
                });
            }
        },
        generateDraw: function () {
            var $data = this.$data;
            if ($data.selectedCall.length === 0) {
                return;
            }
            $data.isDraw = true;
            $data.drawData = null;
            $.ajax({
                url: '/phone/getPortrait.do',
                data: {
                    phoneIds: this.$data.selectedCall.join()
                },
                success: function (data) {
                    $data.isDraw = false;
                    $data.drawData = data.data.portraitList;
                }
            });
            // 回到顶部
            $('body').animate({ scrollTop: 0 }, 200);
        },
        // 播放录音
        play: function (item) {
            // 正在播放，那就停止播放
            if (item.isPlaying) {
                item.media.pause();
            }
            // 开始播放或者继续播放
            else {
                // 先停止一切其他播放
                this.$data.callList.forEach(function (item) {
                    if (item.isPlaying) {
                        item.media.pause();
                    }
                });

                // 继续播放
                if (item.media) {
                    item.media.play();
                }
                // 开始播放
                else {
                    var media = new Audio();
                    item.media = media;
                    media.src = item.callUrl;
                    media.load();
                    media.play();
                    item.isPlaying = true;
                }
            }


            // playerControl.play(item.callUrl);
        },
        // 展开折叠文本状态切换
        foldUnfoldSwitch: function (item) {
            item.foldStatus = !item.foldStatus;
            item.foldText = item.foldStatus ? '收起文本' : '展开文本';
        }
    }

});
