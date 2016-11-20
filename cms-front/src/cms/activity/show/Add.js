/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function ActivityShowAdd() {
        FormAction.apply(this, arguments);
    }

    ActivityShowAdd.prototype.modelType = require('./AddModel');
    ActivityShowAdd.prototype.viewType = require('./AddView');

    function chooseActivity(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '选择活动',
            width: 800,
            needFoot: true,
            url: '/activity/chooser',
            actionOptions: {

            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length > 0){
                    me.model.set("activity_id",items[0].id);
                    me.view.get('activity_name').setText(items[0].name);
                    dialog.dispose();
                }else{
                    me.view.alert("请选择一个活动！");
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });

        });
    }

    ActivityShowAdd.prototype.afterValidate = function (data) {
        var error = [];
        var flag = false;
        if (!data.activity_id) {
            error.push('活动名称不能为空');
        }
        if (!data.image) {
            this.handleLocalValidationErrors({
                image: '请上传活动展示图片'
            });
            flag = true;
        }
        if (error.length > 0) {
            this.handleLocalValidationErrors(error.join('、'));
            return Deferred.rejected();
        }
        if (flag) {
            return Deferred.rejected();
        }
        return true;
    };

    /**
     * @protected
     * @override
     */
    ActivityShowAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('chooseActivity', chooseActivity, this);
    };

    require('er/util').inherits(ActivityShowAdd, FormAction);
    return ActivityShowAdd;
});
