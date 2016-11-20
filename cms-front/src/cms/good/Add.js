/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormAction = require('bat-ria/mvc/FormAction');

    var Deferred = require('er/Deferred');
    /**
     * Action构造函数
     *
     * @constructor
     */
    function GoodAdd() {
        FormAction.apply(this, arguments);
    }

    GoodAdd.prototype.modelType = require('./AddModel');
    GoodAdd.prototype.viewType = require('./AddView');

    function chooseTag() {
        var me = this;
        me.view.waitActionDialog({
            title: '选择标签',
            width: 800,
            needFoot: false,
            url: '/good/tag/chooser',
            actionOptions: {
                selectedTags: me.view.vue.tags
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            //dialog.getFoot().getChild('btnOk').on('click', function () {
            //    var action = dialog.getAction();
            //    //var node = action.view.getSelectedNode();
            //    dialog.dispose();
            //});
            //dialog.getFoot().getChild('btnCancel').on('click', function () {
            //    dialog.dispose();
            //});
        });
    }

    function chooseSpec() {
        var me = this;
        me.view.waitActionDialog({
            title: '选择规格',
            width: 600,
            needFoot: false,
            url: '/good/specification/chooser',
            actionOptions: {
                selectedSpecs: me.view.vue.specifications
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
        });
    }

    function chooseCategory() {
        var me = this;
        me.view.waitActionDialog({
            title: '选择商品分类',
            width: 800,
            needFoot: true,
            url: '/good/category/chooser',
            actionOptions: {
                selectType: 'single'
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            dialog.getFoot().getChild('btnOk').on('click', function () {
                var action = dialog.getAction();
                var items = action.getSelectedItems();
                if (items.length > 0) {
                    me.view.vue.category = items[0];
                    dialog.dispose();
                }
                else {
                    me.view.alert('还未选择任何分类');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }


    GoodAdd.prototype.afterValidate = function (data) {
        var error = [];
        var flag = false;
        if (!data.category_id) {
            error.push('商品分类不能为空');
        }
        if (!data.specification_ids) {
            error.push('商品规格不能为空');
        }
        if (!data.image_default_id) {
            this.handleLocalValidationErrors({
                image_default_id: '请上传封面图片'
            });
            flag = true;
        }
        if (!data.image_ids) {
            this.handleLocalValidationErrors({
                images: '请上传商品详情图片'
            });
            flag = true;
        }
        if (error.length > 0) {
            this.handleLocalValidationErrors(error.join('、'));
            return Deferred.rejected();
        }
        if (flag) {
            return Deferred.rejected();
        }
        return true;
    };

    /**
     * @protected
     * @override
     */
    GoodAdd.prototype.initBehavior = function () {
        FormAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('chooseTag', chooseTag, this);
        this.view.on('chooseSpec', chooseSpec, this);
        this.view.on('chooseCategory', chooseCategory, this);
    };

    require('er/util').inherits(GoodAdd, FormAction);
    return GoodAdd;
});
