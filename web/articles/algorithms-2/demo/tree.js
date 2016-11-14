function Tree(initNumbers) {
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
        // 删除后的候补节点
        var targetNodeReplace;
        // 父节点
        var parentNode;

        // 确保找到了
        if (targetNode) {
            // 先把候补找好，(再设置父节点的指向)
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
                // 向左查找没有左子树的节点(这样可以保证最小右大)
                targetNodeReplace = targetNode;
                var targetNodeReplaceParent;
                do {
                    targetNodeReplaceParent = targetNodeReplace;
                    targetNodeReplace = this.getNode(targetNodeReplace.leftKey);
                } while (targetNodeReplace.leftKey !== null);

                targetNodeReplace.leftKey = targetNode.leftKey;
                this.getNode(targetNode.leftKey).parentKey = targetNodeReplace.id;

                var t = targetNodeReplace.rightKey;
                targetNodeReplace.rightKey = targetNode.rightKey;
                this.getNode(targetNode.rightKey).parentKey = targetNodeReplace.id;

                if (t !== null) {
                    targetNodeReplaceParent.leftKey = t;
                    this.getNode(t).parentKey = targetNodeReplaceParent.id;
                }

                // else {
                //     // var p = this.getNode(targetNodeReplace.parentKey);
                //     // targetNodeReplace.leftKey = p.id;
                //     // p.parentKey = targetNodeReplace.id;
                // }

                // 已经连接上
                var p = this.getNode(targetNodeReplace.parentKey);
                targetNodeReplace.leftKey = p.id;
                p.parentKey = targetNodeReplace.id;
            }

            // 删除的不是根节点
            if (targetNode.parentKey !== null) {
                parentNode = this.getNode(targetNode.parentKey);
                if (parentNode.leftKey === targetNode.id) {
                    parentNode.leftKey = targetNodeReplace === null ? null : targetNodeReplace.id;
                }
                else {
                    parentNode.rightKey = targetNodeReplace === null ? null : targetNodeReplace.id;
                }
            }

            delete list[targetNode.id];
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