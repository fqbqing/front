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
    function ActivityShowList() {
        ListAction.apply(this, arguments);
    }

    ActivityShowList.prototype.modelType = require('./ListModel');
    ActivityShowList.prototype.viewType = require('./ListView');

    function addActivityShow() {
        this.redirect('/activity/show/add');
    }

    function deleteActivityShow(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的活动展示吗？').then(function () {
                me.model.deleteActivityShow(ids.join(',')).then(function () {
                    me.reload();
                });
            });
        }
        else {
            this.view.alert('请选择要删除的活动展示');
        }
    }
    /**
     * @protected
     * @override
     */
    ActivityShowList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addActivityShow', addActivityShow, this);
        this.view.on('deleteActivityShow', deleteActivityShow, this);
    };

    require('er/util').inherits(ActivityShowList, ListAction);
    return ActivityShowList;
});
