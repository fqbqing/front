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
    function ExhibitionCouponActivityList() {
        ListAction.apply(this, arguments);
    }

    ExhibitionCouponActivityList.prototype.modelType = require('./ListModel');
    ExhibitionCouponActivityList.prototype.viewType = require('./ListView');

    function shareExhibitionQrcode(e) {
        var me = this;
        me.model.shareExhibitionQrcode({
            id: e.id
        }).then(function(json){
            me.view.get('staticDg').show();
            me.view.get('staticDg').getBody().main.getElementsByClassName('cont-qrcode')[0].setAttribute('src',json);
            me.view.get('staticDg').getBody().main.getElementsByClassName('cont-title')[0].innerHTML = e.title;
        });
    }

    /**
     * @protected
     * @override
     */
    ExhibitionCouponActivityList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('shareExhibitionQrcode', shareExhibitionQrcode, this);
    };

    require('er/util').inherits(ExhibitionCouponActivityList, ListAction);
    return ExhibitionCouponActivityList;
});
