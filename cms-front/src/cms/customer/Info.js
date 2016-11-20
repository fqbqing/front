/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var u = require('underscore');
    var user = require('bat-ria/system/user');
    var visitor = user.visitor;
    /**
     * Action构造函数
     *
     * @constructor
     */
    function CustomerInfo() {
        BaseAction.apply(this, arguments);
    }

    CustomerInfo.prototype.modelType = require('./InfoModel');
    CustomerInfo.prototype.viewType = require('./InfoView');

    function updateRating(e) {
        var me = this;
        me.model.updateRating({
            rating: e.rating
        }).then(function () {
            me.reload();
        });
    }

    function updateName(e) {
        var me = this;
        me.model.updateName({
            name: e.name
        }).then(function () {
            me.reload();
        });
    }

    function updateTrack(e) {
        var me = this;
        me.model.updateTrack({
            track_id: e.track_id,
            content: e.content
        }).then(function () {
            me.reload();
        });
    }

    function deleteTrack(e) {
        var me = this;
        me.model.deleteTrack({
            track_id: e.track_id
        }).then(function () {
            me.reload();
        });
    }

    function addTrack(e) {
        var me = this;
        me.model.addTrack({
            content: e.content
        }).then(function () {
            me.reload();
        });
    }

    function forwardToPage(e) {
        var me = this;
        var query = {
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return me.model.getTrack(query).then(function (page) {
            /*this.model.set('trackList',data);*/
            me.view.refresh(page);
        });
    }

    function distribute(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '分配销售顾问',
            width: 800,
            needFoot: true,
            url: '/access/user/chooser~group_id=' + visitor.organization.sale_group_id
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length){
                    me.distributeCustomer({
                        id: e.id,
                        cur_user_company_id: e.cur_user_company_id,
                        user_company_id: u.pluck(items,'id')[0] //选中的销售顾问ID
                    });
                }else{
                    me.view.alert('您还未选择销售顾问！');
                }

            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    CustomerInfo.prototype.distributeCustomer = function (e) {
        var me = this;
        return this.model.distribute({
            id: e.id,
            cur_user_company_id: e.cur_user_company_id,
            user_company_id: e.user_company_id
        }).then(function (result) {
            me.reload();
        });
    };

    /**
     * @protected
     * @override
     */
    CustomerInfo.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updateRating', updateRating, this);
        this.view.on('updateName', updateName, this);
        this.view.on('updateTrack', updateTrack, this);
        this.view.on('deleteTrack', deleteTrack, this);
        this.view.on('addTrack', addTrack, this);
        this.view.on('pageChange', forwardToPage, this);
        this.view.on('pageSizeChange', forwardToPage, this);
        this.view.on('distribute', distribute, this);
    };

    require('er/util').inherits(CustomerInfo, BaseAction);
    return CustomerInfo;
});
