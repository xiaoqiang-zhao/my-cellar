/*var flagH,flagW, relationInfo;
var graphKillFlag = false;*/

var graph = new joint.dia.Graph;

// Create a custom element.
// ------------------------
var sel;
var sel2;
joint.shapes.html = {};
joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        attrs: {
            rect: {
                stroke: 'none',
                'fill-opacity': 0
            }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});

// Create a custom view for that element that displays an HTML div above it.
// -------------------------------------------------------------------------

joint.shapes.html.ElementView = joint.dia.ElementView.extend({
    //自定义添加events事件
    events: {
        'mouseover': 'mouseoverEvent',
        'mouseout': 'mouseoutEvent'
    },
    mouseoverEvent: function(evt, x, y) {
        this.model.attr({
                rect: {
                    'stroke': FOCUS_COLOR,
                    'stroke-width': 5
                }
            })
            //获取与焦点任务相连的所有link
        var arrConnectLink = graph.getConnectedLinks(this.model, {
            inbound: true,
            outbound: true
        });

        for (var i = 0, len = arrConnectLink.length; i < len; i++) {
            arrConnectLink[i].attr({
                '.connection': {
                    stroke: FOCUS_COLOR
                }
            });
        }
    },
    mouseoutEvent: function(evt, x, y) {
        var eleTem = this.$box
            //当移开焦点任务时，若此任务不是从进入图形页面的入口任务，则去掉边框
        if (eleTem.find('.lineH3').attr('taskId') != FOCUS_TASKID) {
            this.model.attr({
                rect: {
                    //'stroke': FOCUS_COLOR,
                    'stroke-width': 0
                }
            })
        }

        var arrConnectLink = graph.getConnectedLinks(this.model, {
            inbound: true,
            outbound: true
        })

        for (var i = 0, len = arrConnectLink.length; i < len; i++) {
            arrConnectLink[i].attr({
                '.connection': {
                    stroke: '#000'
                }
            })
        }
    },

    //此处为任务的view html模板，一切骨架都在此处
    template: [
        '<div class="html-element">',
        '<button class="delete">详情</button>',
        '<div class="lineH"></div>',
        '<div class="lineH2"></div>',
        '<div class="lineH3"></div>',
        '</div>'
    ].join(''),

    initialize: function() {
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.$box = $(_.template(this.template)());

        var $_BOX = this.$box;
        var $THIS = this;

        //为详情按钮添加事件
        this.$box.find('.delete').on('click', function() {
            //$('.html-element').css('border','none');
            //$_BOX.css('border','1px solid red');
            //console.log($THIS.$el)
            /*  $THIS.model.attr({
                    rect:{
                        fill: 'red',
                        stroke: 'blue'
                    }
                })*/
            var str = $_BOX.find('.lineH').text();
            var n = str.indexOf(']');
            var id = str.substring(1, n);
            var name = str.substring(n + 1);

            var datas = JSON.parse($_BOX.find('.lineH2').attr('dataLog')).data;
            //展开datagrid列表
            viewDataVersionLogs(id, name, datas);
        });

        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);

        this.updateBox();
    },
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        if (FOCUS_FLAG) { //若是进入页面的入口任务，则为其添加边框
            this.model.attr({
                rect: {
                    'stroke': FOCUS_COLOR,
                    'stroke-width': 5
                }
            })
            FOCUS_FLAG = false;
        }
        sel2 = this.$box; //获取模板的jQuery对象
        expandPaper(this); //每一次添加元素，都重新计算画布宽高，并合理呈现画布
        return this;
    },

    updateBox: function() {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();
        this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
        });
    },
    removeBox: function(evt) {
        this.$box.remove(); //图形移除
    },
    pointerdown: function(evt) {
        joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
        sel = this.$box;
        var oEvent = event || evt;

        //通过单击，模拟右键事件(库默认不存在右键事件)
        if (oEvent.button == 2) {
            oEvent.preventDefault();
            $('#mmOperateTask').menu('show', {
                left: oEvent.pageX,
                top: oEvent.pageY
            });

            var taskObj = JSON.parse(sel.find('.lineH2').attr('dataLog'));

            var power = taskObj.permissible;
            var type = taskObj.type;

            if (type == 'group') {
                $('#instanceDetail,#kill,#refreshStation,#reDo').hide();
            } else {
                $('#instanceDetail').show();
                if (power == 'true') {
                    $('#kill,#refreshStation,#reDo').show();
                } else {
                    $('#kill,#refreshStation,#reDo').hide();
                }
            }
        }


    },
    pointermove: function(evt, x, y) {
        joint.dia.ElementView.prototype.pointermove.apply(this, arguments);

        expandPaper(this); //拖动任务，画布重新计算
    },
    pointerup: function(evt, x, y) {
        var oEvent = event || evt;
        if (oEvent.button == 2) {
            //鼠标右键点击后，并不会弹出右键菜单(莫名BUG)，因此自定义当鼠标按键抬起后，再展现菜单
            $('#mmOperateTask')[0].style.display = 'block';
        }
    }
});

// Create JointJS elements and add them to the graph as usual.

function createEle(x, y) {
    return new joint.shapes.html.Element({
        position: {
            x: x,
            y: y
        },
        size: {
            width: 180,
            height: 100
        }
    });
}

function createLink(el1, el2) {
    return new joint.dia.Link({
        source: {
            id: el1.id
        },
        target: {
            id: el2.id
        },

        attrs: {
            '.connection': {
                'stroke-width': 2,
                stroke: '#34495E'
            },
            '.marker-target': {
                fill: 'black',
                d: 'M 10 0 L 0 5 L 10 10 z'
            }
        }

    });
};

//此处是为了将对link的操作屏蔽掉，这样就不能将link从task上移开！
var myLink = joint.dia.LinkView.extend({
    pointerdown: function(evt) {
        return;
    }
});

//画布扩展函数
function expandPaper(el) {
    var boxLeft = el.$box[0].offsetLeft + el.$box[0].offsetWidth;
    var boxTop = el.$box[0].offsetTop + el.$box[0].offsetHeight;
    var boxWidth = $('#paper').width();
    var boxHeight = $('#paper').height();

    if (boxTop > boxHeight || boxLeft > boxWidth) {
        paper.fitToContent({
            gridWidth: Math.max(boxWidth, boxLeft),
            gridHeight: Math.max(boxHeight, boxTop),
        });
    } else {
        paper.fitToContent({
            gridWidth: boxWidth,
            gridHeight: boxHeight
        });
    }
}

//新方法画图，引用至任务配置页面
var paperH = document.body.clientHeight || document.documentElement.clientHeight;
var paperW = $(window).width();

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: paperW, //自动占满整个屏幕
    height: paperH,
    gridSize: 1, //这个代表移动时，是1px，1px进行移动
    model: graph,
    elementView: joint.shapes.html.ElementView,
    linkView: myLink,
    interactive: function(cellView) { //此方法可以屏蔽在link上点击，添加折线。
        if (cellView.model instanceof joint.dia.Link) {
            return {
                vertexAdd: false
            };
        }
        return true;
    }
});
