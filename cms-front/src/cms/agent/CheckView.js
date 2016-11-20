/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./check.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AgentCheckView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AgentCheckView.prototype.template = 'TPL_agent_check';

    /**
     * @inheritDoc
     */
    AgentCheckView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    AgentCheckView.prototype.uiEvents = {};

    require('er/util').inherits(AgentCheckView, FormView);
    return AgentCheckView;
});
