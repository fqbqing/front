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
    function GoodProductList() {
        ListAction.apply(this, arguments);
    }

    GoodProductList.prototype.modelType = require('./ListModel');
    GoodProductList.prototype.viewType = require('./ListView');

    function addProduct() {
        var param = {};
        // 如果当前页面已经指定了商品ID，则添加货品的时候就可以不用再选择商品了
        if (this.model.get('good_id')) {
            param.good_id = this.model.get('good_id');
        }
        this.redirect(require('er/URL').withQuery('/good/product/add', param));
    }

    function deleteProduct(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的货品吗？').then(function () {
                me.model.deleteProduct(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的货品');
        }
    }

    function updateProduct(e) {
        var me = this;
        var data = {
            id: e.data.id
        };
        var field = e.data.field;
        var value = e.data.value;
        data[field] = value;
        me.model.updateProduct(data).then(function () {
            var row = e.table.datasource[e.rowIndex];
            row[field] = value;
            e.table.updateRowAt(e.rowIndex, row);
        });
    }

    /**
     * @protected
     * @override
     */
    GoodProductList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addProduct', addProduct, this);
        this.view.on('deleteProduct', deleteProduct, this);
        this.view.on('updateProduct', updateProduct, this);
    };

    require('er/util').inherits(GoodProductList, ListAction);
    return GoodProductList;
});
