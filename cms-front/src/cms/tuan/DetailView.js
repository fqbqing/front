/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./detail.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function TuanDetailView() {
        BaseView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    TuanDetailView.prototype.template = 'TPL_tuan_detail';

    TuanDetailView.prototype.enableVue = true;


    /**
     * @inheritDoc
     */
    TuanDetailView.prototype.uiProperties = {

    };

    TuanDetailView.prototype.getVueOptions = function () {
        return {
        };
    };

    /**
     * @inheritDoc
     */
    TuanDetailView.prototype.uiEvents = {
        'status_select:change': function (e) {
            this.fire('statusSelect',{
                tuan_id: this.model.get('tuan_id'),
                status: this.get('status_select').getValue()
            })
        },
        'cp:aftercopy': function () {
            this.showToast('复制成功');
        }
    };


    require('er/util').inherits(TuanDetailView, BaseView);
    return TuanDetailView;
});
