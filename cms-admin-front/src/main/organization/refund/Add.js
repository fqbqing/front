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
    function OrganizationRefundAdd() {
        FormAction.apply(this, arguments);
    }

    OrganizationRefundAdd.prototype.modelType = require('./AddModel');
    OrganizationRefundAdd.prototype.viewType = require('./AddView');

    function chooseMarchers(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '选择退款负责人',
            width: 800,
            needFoot: true,
            url: '/organization/staff/list',
            actionOptions: {
                organization_id: me.model.get('organization_id')
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length){
                    me.view.get('user_company_id').setValue(items[0].id);
                    me.view.get('user_company_name').setText(items[0].name);
                    dialog.dispose();
                }
                else {
                    me.view.alert('还未选择任何人员');
                }
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
    OrganizationRefundAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('chooseMarchers', chooseMarchers, this);
    };

    require('er/util').inherits(OrganizationRefundAdd, FormAction);
    return OrganizationRefundAdd;
});
