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
    function ActivityList() {
        ListAction.apply(this, arguments);
    }

    ActivityList.prototype.modelType = require('./ListModel');
    ActivityList.prototype.viewType = require('./ListView');

    function addActivity() {
        this.redirect('/activity/add');
    }

    function deleteActivity(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的活动吗？').then(function () {
                me.model.deleteActivity(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的活动');
        }
    }
    function orderStatusChange(){
        console.log("快点击显示吧");
    }

    /**
     * @protected
     * @override
     */
    ActivityList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addActivity', addActivity, this);
        this.view.on('deleteActivity', deleteActivity, this);
        this.view.on('orderStatusChange', orderStatusChange, this);
    };

    require('er/util').inherits(ActivityList, ListAction);
    return ActivityList;
});
