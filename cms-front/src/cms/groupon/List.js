/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GrouponList() {
        ListAction.apply(this, arguments);
    }

    GrouponList.prototype.modelType = require('./ListModel');
    GrouponList.prototype.viewType = require('./ListView');


    function addGroupon() {
        this.redirect('/groupon/add');
    }

    function deleteGroupon(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm({
                title: '删除团购',
                content: '确定要删除选中的团购活动吗？',
                width: 400
            }).then(function () {
                me.model.deleteGroupon(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的团购');
        }
    }

    function commitGroupon(e) {
        var me = this;
        me.model.commitGroupon({
            id: e.id,
            status: e.status
        }).then(function(){
            me.view.showToast('操作成功');
            me.reload();
        },function () {
            e.btn.disable();
            e.btn.setProperties({
                checked: !e.btn.checked
            });
            e.btn.enable();
        });
    }

    /**
     * @protected
     * @override
     */
    GrouponList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addGroupon', addGroupon, this);
        this.view.on('commitGroupon', commitGroupon, this);
        this.view.on('deleteGroupon', deleteGroupon, this);
    };

    require('er/util').inherits(GrouponList, ListAction);
    return GrouponList;
});
