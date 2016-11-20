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
    function GoodTagList() {
        ListAction.apply(this, arguments);
    }

    GoodTagList.prototype.modelType = require('./ListModel');
    GoodTagList.prototype.viewType = require('./ListView');

    function deleteTag(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的标签吗？').then(function () {
                me.model.deleteTag(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的标签');
        }
    }

    function addTag(e) {
        var me = this;
        var name = e.name;
        if (name.length === 0) {
            me.view.alert('请填写标签名称');
            return;
        }
        me.model.addTag(name).then(function () {
            me.reload();
        });
    }

    function updateTag(e) {
        var me = this;
        me.model.updateTag(e.tag).then(function () {
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
    GoodTagList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteTag', deleteTag, this);
        this.view.on('addTag', addTag, this);
        this.view.on('updateTag', updateTag, this);
    };

    require('er/util').inherits(GoodTagList, ListAction);
    return GoodTagList;
});
