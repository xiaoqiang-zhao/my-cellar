/**
 * 是否循环
 *
 * Created by zhaoxiaoqiang on 16/6/20.
 */

function isCircular(points) {
    var startPoint = getStartPoint(points);
    var result = recursion(startPoint, []);
    console.log(result);
    return result.isCircular;

    /**
     * 获取开始点
     * @param {Array} points 点集
     * @return {Object} startPoint 开始点
     */
    function getStartPoint(points) {
        var startPoint;
        points.some(function (item) {
            if (item.stencil.id === 'start') {
                startPoint = item;
                return true;
            }
        });
        return startPoint;
    }

    /**
     * 是否是结束点
     *
     * @param {Object} point 点对象
     * @return {boolean} 是否是结束点
     */
    function isEndPoint(point) {
        return point.stencil.id === 'end';
    }

    function cloneArray(array) {
        var newArray = [];
        array.forEach(function (item) {
           newArray.push(item);
        });
        return newArray;
    }

     function getPointById(points, id) {
        var result = null;

        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            if (point.resourceId === id) {
                result = point;
                break;
            }
        }

        return result;
    }

    /**
     * 递归函数
     * @param {object} point 当前点
     * @param {Array} pathIds 路径id
     *
     * @return {Object} {
     *                      {boolean} isCircular 是否循环
     *                      {Array} circularIds 循环点的id
     *                  }
     */
    function recursion(point, pathIds) {
        var result = {
            isCircular: false,
            circularIds: []
        };
        var selfFunction = arguments.callee;

        //
        if (!isEndPoint(point)) {
            point.outgoing.some(function (item) {
                var index = pathIds.indexOf(item.resourceId);
                // 无循环现象
                if (index === -1) {
                    var newPathIds = cloneArray(pathIds);
                    newPathIds.push(point.resourceId);
                    var nextPoint = getPointById(points, item.resourceId);
                    result = selfFunction(nextPoint, newPathIds);
                }
                // 有循环现象
                else {
                    pathIds.push(point.resourceId);
                    result = {
                        isCircular: true,
                        circularIds: pathIds.slice(index)
                    };
                }
                return result.isCircular;
            });
        }

        return result;
    }
}