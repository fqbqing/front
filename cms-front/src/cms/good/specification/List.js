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
    function GoodSpecificationList() {
        ListAction.apply(this, arguments);
    }

    GoodSpecificationList.prototype.modelType = require('./ListModel');
    GoodSpecificationList.prototype.viewType = require('./ListView');

    function deleteSpecification(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的规格吗？').then(function () {
                me.model.deleteSpecification(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的规格');
        }
    }

    function addSpecification(e) {
        var me = this;
        var name = e.name;
        if (name.length === 0) {
            me.view.alert('请填写规格名称');
            return;
        }
        me.model.addSpecification(name, e.spectype).then(function () {
            me.reload();
        });
    }

    function updateSpecification(e) {
        var me = this;
        me.model.updateSpecification(e.tag).then(function () {
            e.table.setCellText(
                e.tag.name,
                e.rowIndex,
                e.columnIndex
            );
        });
    }

    /**
     * @protected
     * @override
     */
    GoodSpecificationList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteSpecification', deleteSpecification, this);
        this.view.on('addSpecification', addSpecification, this);
        this.view.on('updateSpecification', updateSpecification, this);
    };

    require('er/util').inherits(GoodSpecificationList, ListAction);
    return GoodSpecificationList;
});
