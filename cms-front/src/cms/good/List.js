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
    function GoodList() {
        ListAction.apply(this, arguments);
    }

    GoodList.prototype.modelType = require('./ListModel');
    GoodList.prototype.viewType = require('./ListView');

    function addGood() {
        this.redirect('/good/add');
    }

    function deleteGood(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的商品吗？').then(function () {
                me.model.deleteGood(ids.join(',')).then(function () {
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
    GoodList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addGood', addGood, this);
        this.view.on('deleteGood', deleteGood, this);
    };

    require('er/util').inherits(GoodList, ListAction);
    return GoodList;
});
