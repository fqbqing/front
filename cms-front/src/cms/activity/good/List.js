/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    var u = require('underscore');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function ActivityGoodList() {
        ListAction.apply(this, arguments);
    }

    ActivityGoodList.prototype.modelType = require('./ListModel');
    ActivityGoodList.prototype.viewType = require('./ListView');

    function addGood() {
        var me = this;
        me.view.waitActionDialog({
            title: '选择商品',
            width: 800,
            needFoot: true,
            url: '/good/chooser',
            actionOptions: {
                selectType: 'multi'
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var items = action.getSelectedItems();
                if (items.length > 0) {
                    me.model.addActivityGood(u.map(items, function (item) {
                        return item.id;
                    }), '2').then(function () {
                        dialog.dispose();
                        me.reload();
                    });
                }
                else {
                    me.view.alert('还未选择任何商品');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    function addCategory() {
        var me = this;
        me.view.waitActionDialog({
            title: '按分类添加商品',
            width: 800,
            needFoot: true,
            url: '/good/category/chooser',
            actionOptions: {
                selectType: 'multi'
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var items = action.getSelectedItems();
                if (items.length > 0) {
                    me.model.addActivityGood(u.map(items, function (item) {
                        return item.id;
                    }), '1').then(function () {
                        dialog.dispose();
                        me.reload();
                    });
                }
                else {
                    me.view.alert('还未选择任何分类');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    function deleteActivityGood(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的商品吗？').then(function () {
                me.model.deleteActivityGood(ids).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的商品');
        }
    }

    /**
     * @protected
     * @override
     */
    ActivityGoodList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addGood', addGood, this);
        this.view.on('addCategory', addCategory, this);
        this.view.on('deleteActivityGood', deleteActivityGood, this);
    };

    require('er/util').inherits(ActivityGoodList, ListAction);
    return ActivityGoodList;
});
