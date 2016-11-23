# 算法导论二

> 第三章到第五章的读书笔记

## 数据结构

### 栈 - 队列 - 链表

栈和队列适合小数据量的处理 - 内存中就能放下的数据；链表适合大数据，在内存中放少量数据配合几个函数调用二级存储器就可以处理很大的数据，这三个就是基础数据类型。

### 散列表

散列表是队列的一个变种，也是一种小数据数据结构，不同之处是无序性。

### 二叉树

二叉树需要满足下面两个条件：
- 每个节点包含 key left right p 四个属性；
- left.key <= key <= right.key

符合特定规则的链表。在前端要研究链表需要先准备一个二级存储(硬盘上的东西，可以是数据库或文件等形式)模拟器，逼真一点可以用服务器配合Ajax实现，简单一点直接用一个数组或对象来模拟，我们先选择后者来实现：

    function getNode(key) {
        var list = {
            rootKey: '5',
            '5': {
                value: 5,
                leftKey: null,
                rightKey: null,
                parentKey: null
            }
        };

        // 不传参数返回根节点
        if (key === undefined) {
            key = list.rootKey;
        }

        var result = list[key];
        if (result === undefined) {
            result = null;
        }
        return result;
    }

使用一些前端技术实现二叉树的展示功能，查看[实例 1.html](/articles/algorithms-2/demo/1.html)。

![二叉树图片](/articles/algorithms-2/demo/1.png)

根据当前节点输出位于左节点和右节点的位置，遍历二叉树有3种方式：`中序` `前序` `后序`：

![遍历二叉树结果](/articles/algorithms-2/demo/2.png)

    // 遍历二叉树
    function order(node, result) {
        if (node !== null) {
            if (result.title === '前序') {
                result.list.push(node.value);
            }
            
            // 左子树
            if (node.leftKey !== null) {
                arguments.callee(getNode(node.leftKey), result);
            }
            
            if (result.title === '中序') {
                result.list.push(node.value);
            }

            // 右子树
            if (node.rightKey !== null) {
                arguments.callee(getNode(node.rightKey), result);
            }
            
            if (result.title === '后序') {
                result.list.push(node.value);
            }
        }
    }

[实例地址 2.html](/articles/algorithms-2/demo/2.html)

插入，一棵二叉树总能找到一个叶子节点来存放新节点，这里省去证明，直接给关键部分的代码(完整代码在 tree.js 中)：

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

[实例地址 3.html](/articles/algorithms-2/demo/3.html)

删除二叉树的节点比较麻烦，这里进一步封装，将二叉树的各项操作封装到一个类中。可以先初始化一颗二叉树：

    var initData = [5, 3, 7, 2, 4, 6.5, 6, 6.6, 9, 8, 10, 1, 3.5, 4.5, 4.6];
    var tree = new Tree(initData);

然后可以添加节点：
    
    tree.insertNode(value);

删除节点是根据 id 来删除的
    
    tree.deleteNode(id);

[实例地址 4.html](/articles/algorithms-2/demo/4.html)

### 红黑树
    
    