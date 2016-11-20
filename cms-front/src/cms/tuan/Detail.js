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
    function TuanDetail() {
        BaseAction.apply(this, arguments);
    }

    TuanDetail.prototype.modelType = require('./DetailModel');
    TuanDetail.prototype.viewType = require('./DetailView');

    function statusSelect(e) {
        var me = this;
        me.model.statTuanChannel({
            'tuan_id': e.tuan_id,
            'status': e.status
        }).then(function(data){
            me.view.vue.channels = data;
        });
    }

    /**
     * @protected
     * @override
     */
    TuanDetail.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('statusSelect', statusSelect, this);
    };

    require('er/util').inherits(TuanDetail, BaseAction);
    return TuanDetail;
});
