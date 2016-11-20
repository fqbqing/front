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
    function AgentCheck() {
        FormAction.apply(this, arguments);
    }

    AgentCheck.prototype.modelType = require('./CheckModel');
    AgentCheck.prototype.viewType = require('./CheckView');

    /**
     * @protected
     * @override
     */
    AgentCheck.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(AgentCheck, FormAction);
    return AgentCheck;
});
