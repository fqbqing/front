/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListAction = require('bat-ria/mvc/ListAction');
    var $ = require('jquery');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function TuanList() {
        ListAction.apply(this, arguments);
    }

    TuanList.prototype.modelType = require('./ListModel');
    TuanList.prototype.viewType = require('./ListView');

    function addTuan() {
        this.redirect('/tuan/add');
    }

    function deleteTuan(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm({
                title: '删除团购',
                content: '确定要删除选中的团购吗？',
                width: 300
            }).then(function () {
                me.model.deleteTuan(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的团购');
        }
    }
    function commitTuan(e) {
        var me = this;
        me.model.commitTuan({
            id: e.id,
            status: e.status
        }).then(function(){
            me.reload();
        },function () {
            e.btn.disable();
            e.btn.setProperties({
                checked: !e.btn.checked
            });
            e.btn.enable();
        });

    }
    function offlineAggregate(e) {
        var me = this;

        me.view.waitConfirm('确定要关闭推广活动吗？').then(function () {
            me.model.offlineAggregate({
                related_id: e.related_id,
                activity_type: e.activity_type,
                online: e.online
            }).then(function(json){
                me.reload();
            });
        });
    }
    function onlineAggregate(e) {
        var me = this;
        me.view.waitConfirm('确定要开启推广活动吗？').then(function () {
            me.model.onlineAggregate({
                related_id: e.related_id,
                activity_type: e.activity_type,
                online: e.online
            }).then(function(json){
                me.reload();
            });
        });
    }
    function refreshAggregate(e) {
        var me = this;
        me.model.getFrequentLimit({
            related_id: e.tuan_id
        }).then(function(data){
            me.view.waitConfirm(data+'<br>确定要更新推广活动吗？').then(function () {
                me.model.refreshAggregate({
                    id: e.aggregate_id
                }).then(function(json){
                    me.reload();
                });
            });

        });

    }

    /**
     * @protected
     * @override
     */
    TuanList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addTuan', addTuan, this);
        this.view.on('deleteTuan', deleteTuan, this);
        this.view.on('commitTuan', commitTuan, this);
        this.view.on('offlineAggregate', offlineAggregate, this);
        this.view.on('onlineAggregate', onlineAggregate, this);
        this.view.on('refreshAggregate', refreshAggregate, this);

    };

    require('er/util').inherits(TuanList, ListAction);
    return TuanList;
});
