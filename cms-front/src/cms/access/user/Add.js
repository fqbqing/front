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
    function AccessUserAdd() {
        FormAction.apply(this, arguments);
    }

    AccessUserAdd.prototype.modelType = require('./AddModel');
    AccessUserAdd.prototype.viewType = require('./AddView');
    AccessUserAdd.prototype.handleSubmitResult = function (result) {
        var toast = this.getToastMessage(result);
        if (toast) {
            this.view.showToast(toast);
        }
        this.fire('aftersubmit', {
            result: result
        });

    };
    function addPrivilege() {
        var me = this;
        me.view.waitActionDialog({
            title: '添加权限',
            width: 800,
            needFoot: true,
            url: '/access/privilege/chooser',
            actionOptions: {
                /*selectedTags: me.view.vue.tags*/
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            //dialog.getFoot().getChild('btnOk').on('click', function () {
            //    var action = dialog.getAction();
            //    //var node = action.view.getSelectedNode();
            //    dialog.dispose();
            //});
            dialog.getFoot().getChild('btnCancel').on('click', function () {
              dialog.dispose();
            });
        });
    }
    /**
     * @protected
     * @override
     */
    AccessUserAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addPrivilege', addPrivilege, this);

    };

    require('er/util').inherits(AccessUserAdd, FormAction);
    return AccessUserAdd;
});
