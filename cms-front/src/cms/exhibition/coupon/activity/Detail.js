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
    function ExhibitionCouponActivityDetail() {
        BaseAction.apply(this, arguments);
    }

    ExhibitionCouponActivityDetail.prototype.modelType = require('./DetailModel');
    ExhibitionCouponActivityDetail.prototype.viewType = require('./DetailView');

    function statusSelect(e) {
        var me = this;
        me.model.statExhibitionChannel({
            'exhibition_coupon_activity_id': e.exhibition_coupon_activity_id,
            'status': e.status
        }).then(function(data){
            me.view.vue.channels = data;
        });
    }


    /**
     * @protected
     * @override
     */
    ExhibitionCouponActivityDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('statusSelect', statusSelect, this);
    };

    require('er/util').inherits(ExhibitionCouponActivityDetail, BaseAction);
    return ExhibitionCouponActivityDetail;
});
