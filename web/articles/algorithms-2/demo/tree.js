
function Tree (initNumbers) {
    list = {};
    var id = 1;
    this.getNode = function (key) {
        // 不传参数返回根节点
        if (key === undefined) {
            key = list.rootKey;
        }

        var result = list[key];
        if (result === undefined) {
            result = null;
        }
        return result;
    };

    this.insertNode = function (key) {
        var node = {
            id: id++,
            value: key,
            leftKey: null,
            rightKey: null,
            parentKey: null
        };

        var root = this.getNode();
        var x = root;
        var y = null; // x 的前一个状态，需要保存
        while (x !== null) {
            y = x;
            if (node.value < x.value) {
                x = x.leftKey === null ? null : list[x.leftKey];
            }
            else {
                x = x.rightKey === null ? null : list[x.rightKey];
            }
        }

        // 空树
        if (y === null) {
            list.rootKey = node.id;
        }
        // 设为左节点
        else if (node.value < y.value) {
            y.leftKey = node.id;
            node.parentKey = y.id;
        }
        // 设为右节点
        else {
            y.rightKey = node.id;
            node.parentKey = y.id;
        }

        list[node.id] = node;
    };

    this.deleteNode = function (key) {

        // 在右子树中找没有左子树的节点
        // 要删除的目标节点
        var targetNode = this.getNode(key);
        // 父节点
        var parentNode = null;
        // 确保找到了
        if (targetNode) {


            if (targetNode.leftKey === null && targetNode.rightKey === null) {
                delete list[key];
            }
            else if (targetNode.leftKey === null) {

            }

        }

        return targetNode;
    };

    // 初始化
    if (Array.isArray(initNumbers)) {
        var me = this;
        initNumbers.forEach(function (number) {
            me.insertNode(number);
        });
    }
}