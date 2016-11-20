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
    function MessageAdd() {
        FormAction.apply(this, arguments);
    }

    MessageAdd.prototype.modelType = require('./AddModel');
    MessageAdd.prototype.viewType = require('./AddView');

    MessageAdd.prototype.redirectAfterSubmit = function (result) {
        var topAction = require('er/controller').currentAction;
        topAction.fire('updatedMessage',result);
    };
    /**
     * @protected
     * @override
     */
    MessageAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(MessageAdd, FormAction);
    return MessageAdd;
});
