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
    function ImageList() {
        ListAction.apply(this, arguments);
    }

    ImageList.prototype.modelType = require('./ListModel');
    ImageList.prototype.viewType = require('./ListView');

    function addImage() {
        this.redirect('/image/add');
    }

    /**
     * @protected
     * @override
     */
    ImageList.prototype.initBehavior = function () {
        ListAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('addImage', addImage, this);
    };

    require('er/util').inherits(ImageList, ListAction);
    return ImageList;
});
