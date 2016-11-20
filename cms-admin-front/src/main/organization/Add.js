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
    function OrganizationAdd() {
        FormAction.apply(this, arguments);
    }

    OrganizationAdd.prototype.modelType = require('./AddModel');
    OrganizationAdd.prototype.viewType = require('./AddView');


    OrganizationAdd.prototype.redirectAfterSubmit = function (result) {
        this.redirect('#/organization/list');
    };

    function distribute(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '车大卖联系人',
            width: 800,
            needFoot: true,
            url: '/staff/chooser'
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();

            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length){
                    //拿到item回填ID，name
                    me.view.get('staff_id').setValue(items[0].id);
                    me.view.get('staff_name').setText(items[0].name);
                    dialog.dispose();
                }else{
                    me.view.alert('您还未选择车大卖联系人！');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    function chooseCity(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '选择城市',
            width: 400,
            needFoot: true,
            url: '/location/tree'
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var tree = action.view.get('tree');
                var items = action.getSelectedItem();
                if(items){
                    //拿到item回填ID，name
                    if(action.isDistrict(items)){
                        me.view.get('location_id').setValue(items.id);
                        me.view.get('city_name').setText(items.path);
                        dialog.dispose();
                    }else{
                        me.view.alert('必须选到区级！');
                    }

                }else{
                    me.view.alert('您还未选择城市！');
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
    OrganizationAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('distribute', distribute, this);
        this.view.on('chooseCity', chooseCity, this);


    };

    require('er/util').inherits(OrganizationAdd, FormAction);
    return OrganizationAdd;
});
