/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GoodCategoryList() {
        ListAction.apply(this, arguments);
    }

    GoodCategoryList.prototype.modelType = require('./ListModel');
    GoodCategoryList.prototype.viewType = require('./ListView');

    function deleteCategory(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的分类吗？').then(function () {
                me.model.deleteCategory(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的分类');
        }
    }

    function addCategory(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '创建商品分类',
            width: 600,
            needFoot: true,
            url: '/good/category/add',
            actionOptions: {
                parent_id: e.id
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                action.redirectAfterSubmit = function () {
                    dialog.dispose();
                    me.reload();
                };
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    function updateCategory(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '修改商品分类',
            width: 600,
            needFoot: true,
            url: '/good/category/add',
            actionOptions: {
                id: e.id
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                action.redirectAfterSubmit = function () {
                    dialog.dispose();
                    me.reload();
                };
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    /**
     * @protected
     * @override
     */
    GoodCategoryList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteCategory', deleteCategory, this);
        this.view.on('addCategory', addCategory, this);
        this.view.on('updateCategory', updateCategory, this);
    };

    require('er/util').inherits(GoodCategoryList, ListAction);
    return GoodCategoryList;
});
