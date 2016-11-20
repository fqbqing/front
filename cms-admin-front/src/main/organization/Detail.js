/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function OrganizationDetail() {
        BaseAction.apply(this, arguments);
    }

    OrganizationDetail.prototype.modelType = require('./DetailModel');
    OrganizationDetail.prototype.viewType = require('./DetailView');

    function updateOrganizationLevel(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '升级&续费',
            width: 500,
            needFoot: true,
            url: '/organization/level/edit~organization_id=' + e.organization_id
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.redirectAfterSubmit = function () {
                dialog.dispose();
                me.reload();
            };
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
    OrganizationDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('updateOrganizationLevel', updateOrganizationLevel, this);
    };

    require('er/util').inherits(OrganizationDetail, BaseAction);
    return OrganizationDetail;
});
