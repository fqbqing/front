/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');
    var u = require('underscore');
    var Deferred = require('er/Deferred');
    var constants = require('common/constants');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function GrouponAdd() {
        FormAction.apply(this, arguments);
    }

    GrouponAdd.prototype.modelType = require('./AddModel');
    GrouponAdd.prototype.viewType = require('./AddView');

    GrouponAdd.prototype.redirectAfterSubmit = function (result) {
        var url = '/groupon/page~id=' + result.id;
        this.redirect(url);
    };

    GrouponAdd.prototype.validate = function (submitData) {
        if (this.model.get('organization').agent_spread == constants.AGENT_SPREAD_YES || (this.model.get('formData').agentAwards && this.model.get('formData').agentAwards.length)) {
            var action = this.view.get('actionPanel').action;
            return Deferred.all(FormAction.prototype.validate.apply(this, arguments), action.validate()).promise;
        }
        return FormAction.prototype.validate.apply(this, arguments);
    };
  
    /**
     * @protected
     * @override
     */
    GrouponAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);
        // bind event handlers here
    };

    require('er/util').inherits(GrouponAdd, FormAction);
    return GrouponAdd;
});
