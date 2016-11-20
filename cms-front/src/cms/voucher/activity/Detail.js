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
    function VoucherActivityDetail() {
        BaseAction.apply(this, arguments);
    }

    VoucherActivityDetail.prototype.modelType = require('./DetailModel');
    VoucherActivityDetail.prototype.viewType = require('./DetailView');

    function statusSelect(e) {
        var me = this;
        me.model.voucherChannelStatistics({
            'status': e.status
        }).then(function(data){
            me.view.vue.channels = data;
        });
    }

    /**
     * @protected
     * @override
     */
    VoucherActivityDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('statusSelect', statusSelect, this);

    };

    require('er/util').inherits(VoucherActivityDetail, BaseAction);
    return VoucherActivityDetail;
});
