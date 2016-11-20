/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
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
    function GrouponDetailView() {
        BaseView.apply(this, arguments);
    }

    GrouponDetailView.prototype.enableVue = true;
    /**
     * @inheritDoc
     */
    GrouponDetailView.prototype.template = 'TPL_groupon_detail';

    /**
     * @inheritDoc
     */
    GrouponDetailView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    GrouponDetailView.prototype.uiEvents = {
        'cp:aftercopy': function () {
            this.showToast('复制成功');
        }
    };

    require('er/util').inherits(GrouponDetailView, BaseView);
    return GrouponDetailView;
});
