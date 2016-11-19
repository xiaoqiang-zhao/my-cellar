function Tree(initNumbers) {
    var list = {};
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
        // 删除后的候补节点
        var targetNodeReplace;

        // 确保找到了
        if (targetNode) {
            // 1、先把候补找好
            if (targetNode.leftKey === null && targetNode.rightKey === null) {
                targetNodeReplace = null;
            }
            else if (targetNode.leftKey === null && targetNode.rightKey !== null) {
                targetNodeReplace = this.getNode(targetNode.rightKey);
            }
            else if (targetNode.rightKey === null && targetNode.leftKey !== null) {
                targetNodeReplace = this.getNode(targetNode.leftKey);
            }
            // 最复杂的情况：左右子树都不为空
            else {
                // 在右子树中向左找没有左子树的节点(这样可以保证最小右大)
                targetNodeReplace = this.getNode(targetNode.rightKey);

                // 寻找替换节点
                while (targetNodeReplace.leftKey !== null) {
                    targetNodeReplace = this.getNode(targetNodeReplace.leftKey);
                }

                // 替换节点左子树修改
                targetNodeReplace.leftKey = targetNode.leftKey;
                this.getNode(targetNode.leftKey).parentKey = targetNodeReplace.id;

                // (删除倒数第二层不需要下面这些操作)
                if (targetNodeReplace.parentKey !== targetNode.id) {
                    // 替换节点右子树修改
                    var t = targetNodeReplace.rightKey;
                    targetNodeReplace.rightKey = targetNode.rightKey;
                    this.getNode(targetNode.rightKey).parentKey = targetNodeReplace.id;

                    // 将替换节点的父节点的左子树，修改为替换节点的右子树
                    var targetNodeReplaceParent = this.getNode(targetNodeReplace.parentKey);
                    targetNodeReplaceParent.leftKey = t;
                    if (t !== null) {
                        this.getNode(t).parentKey = targetNodeReplaceParent.id;
                    }
                }
            }

            // 2、再设置父节点的指向
            // 2.1、被删除的节点有父节点(删除的不是根节点）
            if (targetNode.parentKey !== null) {
                // 父节点
                var parentNode;
                parentNode = this.getNode(targetNode.parentKey);

                // 目标节点在左子树
                if (parentNode.leftKey === targetNode.id) {
                    parentNode.leftKey = targetNodeReplace === null ? null : targetNodeReplace.id;
                }
                // 目标节点在右子树
                else {
                    parentNode.rightKey = targetNodeReplace === null ? null : targetNodeReplace.id;
                }

                // 更新替换节点的父节点指向
                if (targetNodeReplace !== null) {
                    targetNodeReplace.parentKey = targetNode.parentKey;
                }
            }
            // 2.2、被删除的节点无父节点(删除的是根节点)
            else {
                list.rootKey = targetNodeReplace.id;
            }

            delete list[targetNode.id];
        }

        return targetNode;
    };

    // 提供对外数据接口，方便直接查看和操作数据(辅助属性)
    this.dataList = list;

    // 初始化
    if (Array.isArray(initNumbers)) {
        var me = this;
        initNumbers.forEach(function (number) {
            me.insertNode(number);
        });
    }
}