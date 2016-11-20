/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var Deferred = require('er/Deferred');
    var u = require('underscore');
    var constants = require('common/constants');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GrouponAward() {
        FormAction.apply(this, arguments);
    }

    GrouponAward.prototype.modelType = require('./AwardModel');
    GrouponAward.prototype.viewType = require('./AwardView');


    function chooseVoucher(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '配置优惠券',
            width: 800,
            needFoot: true,
            url: '/voucher/chooser~type=3'  // 选择经纪人优惠券
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var table = action.view.get('table');
                var items = table.getSelectedItems();
                if(items.length) {
                    if (items.length > 1) {
                        me.view.alert('只能选择一张优惠券！');
                    }else{
                        if(e.stage == constants.STAGE_SIGNUP){
                            me.view.vue.signupAwardVoucher = items[0];
                        }
                        else if(e.stage == constants.STAGE_DEAL) {
                            me.view.vue.dealAwardVoucher = items[0];
                        }
                        dialog.dispose();
                    }
                }
                else {
                    me.view.alert('您还未选择优惠券！');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    GrouponAward.prototype.validate = function () {
        this.view.disableSubmit();
        var actionformData = this.view.getFormData();
        var actionsubmitData = this.model.getSubmitData(actionformData);

        var flag = false;
        if(actionsubmitData.agent_awards){
            var signupAward = u.find(actionsubmitData.agent_awards,function (item) {
                return item.stage == constants.STAGE_SIGNUP;
            });
            var dealAward = u.find(actionsubmitData.agent_awards,function (item) {
                return item.stage == constants.STAGE_DEAL;
            });

            if (signupAward && signupAward.type == constants.AWARD_TYPE_VOUCHER && !signupAward.voucher_id) {
                this.view.vue.signupInvalid = true;
                flag = true;
            }
            if (dealAward && dealAward.type == constants.AWARD_TYPE_VOUCHER && !dealAward.voucher_id) {
                this.view.vue.dealInvalid = true;
                flag = true;
            }
            if (flag) {
                return Deferred.rejected();
            }
        }

        return FormAction.prototype.validate.apply(this, actionformData);
    };

    /**
     * @protected
     * @override
     */
    GrouponAward.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
        this.view.on('chooseVoucher', chooseVoucher, this);

    };

    require('er/util').inherits(GrouponAward, FormAction);
    return GrouponAward;
});
