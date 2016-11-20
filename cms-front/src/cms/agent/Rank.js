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
    function AgentRank() {
        ListAction.apply(this, arguments);
    }

    AgentRank.prototype.modelType = require('./RankModel');
    AgentRank.prototype.viewType = require('./RankView');

    /**
     * @protected
     * @override
     */
    AgentRank.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
    };

    require('er/util').inherits(AgentRank, ListAction);
    return AgentRank;
});
