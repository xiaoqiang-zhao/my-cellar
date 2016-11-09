/**
 * 根据 key 获取节点
 *
 * @param key {string} [可选]索引值，为空时获取根节点
 *
 * @return result {Object} 节点对象
 */
function getNode(key) {
    var list = {
        rootKey: '5',
        '5': {
            value: 5,
            leftKey: '3',
            rightKey: '7',
            parentKey: null
        },
        '3': {
            value: 3,
            leftKey: '2',
            rightKey: '4',
            parentKey: '5'
        },
        '7': {
            value: 7,
            leftKey: '6',
            rightKey: '8',
            parentKey: '5'
        },
        '2': {
            value: 2,
            leftKey: '1',
            rightKey: null,
            parentKey: '3'
        },
        '4': {
            value: 4,
            leftKey: null,
            rightKey: null,
            parentKey: '3'
        },
        '6': {
            value: 6,
            leftKey: null,
            rightKey: null,
            parentKey: '7'
        },
        '8': {
            value: 8,
            leftKey: null,
            rightKey: null,
            parentKey: '7'
        },
        '1': {
            value: 1,
            leftKey: null,
            rightKey: null,
            parentKey: '2'
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