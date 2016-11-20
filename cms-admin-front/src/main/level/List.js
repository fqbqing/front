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
    function LevelList() {
        ListAction.apply(this, arguments);
    }

    LevelList.prototype.modelType = require('./ListModel');
    LevelList.prototype.viewType = require('./ListView');

    function deleteLevel(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的级别吗？').then(function () {
                me.model.deleteLevel(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的级别');
        }
    }

    function addLevel(e) {
        var me = this;
        var name = e.name;
        if (name.length === 0) {
            me.view.alert('请填写级别名称');
            return;
        }
        me.model.addLevel(name).then(function () {
            me.reload();
        });
    }

    /**
     * @protected
     * @override
     */
    LevelList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteLevel', deleteLevel, this);
        this.view.on('addLevel', addLevel, this);
    };

    require('er/util').inherits(LevelList, ListAction);
    return LevelList;
});
