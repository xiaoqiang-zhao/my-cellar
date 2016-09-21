<template>
    <button @click="openDialog">弹框</button>
    <dialog :show.sync="show" :title="title" :buttons="buttons" class="dialog-demo">
        <div>
            {{text}}
            这里可以是一个组件
            <component-table :config="tableConfig"></component-table>
        </div>
    </dialog>
</template>
<script>
import util from 'common/util';
import WarningText from 'components/WarningText';
import Dialog from 'components/Dialog';
import Table from 'components/Table';

export default {
    components: {
        'warning-text': WarningText,
        'dialog': Dialog,
        'component-table': Table
    },
    data: function () {

        var tableConfig = {

            id: 'id',
            // 有分页就配置此参数，无分页配置成 false 或者 删除此项
            page: {
                currentPage: 1,  // 默认第一页
                pageNumber: 10,  // 每页条数，默认10页
            },
            // 暂不实现，选中一项的时候出发事件
            onSelect: function (argument) {
                /* body... */
            },
            firstColumn: {
                type: 'checkbox', // 多选:checkbox 单选:radio 数字序号:number
                width: '30px',
                // 暂未实现
                checkedHandler: function(lineData) {

                }
            },
            dataColumns: [
                {
                    title: '方案名称',
                    filed: 'name',
                    width: '30%',
                    nowrap: true
                },
                {
                    title: '生效的店铺名称',
                    filed: 'shops',
                    formatter: function (value, index, row) {
                        // console.log('formatter shops');
                        var shopsNameList = [];
                        value.forEach(function (item) {
                            shopsNameList.push(item.name);
                        });
                        return shopsNameList.join('/');
                        //return '<span @click="test(row)">' + shopsNameList.join('/') + '</span>';
                    },
                    // 点击时触发的事件
                    clickHandler: function (lineData, index, columnConfig) {
                        // debugger;
                    }
                }
            ],
            // 最后一列，一般为操作列
            lastColumn: {
                buttonsConfig: [
                    {
                        text: '编辑',
                        // 按钮显示与否的逻辑状态
                        isShow: function (lineData, index, btnConfig) {
                            // var isShow = lineData.a === 'a';
                            // return isShow;

                            return true;
                        },
                        // 点击时触发的事件
                        clickHandler: function (lineData, index, btnConfig) {
                            alert('编辑按钮点击');
                        }
                    },
                    {
                        text: '改状态',
                        // 【可选参数】 处理显隐等逻辑
                        formatter: function (lineData, index, btnConfig) {

                        },
                        // 点击时触发的事件
                        clickHandler: function (lineData, index, btnConfig) {
                            alert('改状态按钮点击');
                        }
                    }
                ]
            },
            url: '/scheme',
            // 获取数据后进行处理  --  暂不实现
            afterAjax: function () {

            }
        };
        var that = this;
        return {
            show: false,
            text: '奴婢珊珊',
            title: '弹框标题',
            buttons: [
                {
                    text: '确定',
                    click: function (dialog) {
                        // debugger;
                        that.checkedDataIds;

                        dialog.closeDialog();
                    }
                }
            ],
            tableConfig: tableConfig,
            checkedDataIds: []
        };
    },

    methods: {
        openDialog: function () {
            this.show = true;
        },
        closeDialog: function () {
            this.show = false;
        }
    }
};
</script>

<style src="./index.less" lang="less"></style>
