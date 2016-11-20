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
    function AggregateAd() {
        ListAction.apply(this, arguments);
    }

    AggregateAd.prototype.modelType = require('./AdModel');
    AggregateAd.prototype.viewType = require('./AdView');


    function deleteAdvertise(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的广告吗？').then(function () {
                me.model.deleteAdvertise(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的广告');
        }
    }


    function updateAdvertise(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '修改广告',
            width: 800,
            needFoot: true,
            url: '/aggregate/add~id=' + e.id,
            actionOptions:{
                province_id: me.model.get('province_id') ? me.model.get('province_id'): 2,
                place: me.model.get('place') ? me.model.get('place') : 1,
                platform: me.model.get('platform') ? me.model.get('platform') : 1
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.on('aftersubmit', function (e) {
                me.reload();
                dialog.dispose();
            });
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    function addAdvertise(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '添加广告',
            width: 800,
            needFoot: true,
            url: '/aggregate/add',
            actionOptions:{
                province_id: me.model.get('province_id') ? me.model.get('province_id'): 2,
                place: me.model.get('place') ? me.model.get('place') : 1,
                platform: me.model.get('platform') ? me.model.get('platform') : 1
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.on('aftersubmit', function (e) {
                me.reload();
                dialog.dispose();
            });
            dialog.getFoot().getChild('btnOk').on('click', function () {
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
    AggregateAd.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('deleteAdvertise', deleteAdvertise, this);
        this.view.on('updateAdvertise', updateAdvertise, this);
        this.view.on('addAdvertise', addAdvertise, this);


    };

    require('er/util').inherits(AggregateAd, ListAction);
    return AggregateAd;
});
