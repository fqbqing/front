/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function AccessUserAddView() {
        FormView.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    AccessUserAddView.prototype.template = 'TPL_access_user_add';

    /**
     * @inheritDoc
     */
    AccessUserAddView.prototype.uiProperties = {

    };

    /**
     * @inheritDoc
     */
    AccessUserAddView.prototype.uiEvents = {
        'addPrivilegeBtn:click':function(){
            this.fire('addPrivilege');
        }
    };

    require('er/util').inherits(AccessUserAddView, FormView);
    return AccessUserAddView;
});
