/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./add.tpl.html');

    var FormView = require('bat-ria/mvc/FormView');

    var Deferred = require('er/Deferred');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodProductAddView() {
        FormView.apply(this, arguments);
    }

    GoodProductAddView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GoodProductAddView.prototype.template = 'TPL_good_product_add';

    /**
     * 获取当前表单需要提交的额外数据
     *
     * @return {Object} 表单数据
     */
    GoodProductAddView.prototype.getExtraFormData = function () {
        var me = this;
        var specs = [];
        u.each(this.vue.good.specifications, function (spec) {
            var el = me.get('spec_' + spec.id);
            var value = el.getValue();
            specs.push(value);
        });
        return {
            specification_values: specs.join(','),
            good_id: me.vue.good.id
        };
    };
    /**
     * @inheritDoc
     */
    GoodProductAddView.prototype.uiProperties = {

    };

    GoodProductAddView.prototype.getVueOptions = function () {
        return {
            data: {
                good: {}
            },
            methods: {}
        };
    };

    GoodProductAddView.prototype.fetchSpecValues = function (good) {
        var me = this;
        var queue = u.map(good.specifications, function (spec) {
            return me.model.getSpecValues(spec.id);
        });
        return Deferred.all(queue).then(function () {
            var values = [].slice.call(arguments);
            u.each(good.specifications, function (spec, i) {
                spec.values = values[i];
                //spec.values.unshift({
                //    id: ' ',
                //    name: '请选择规格'
                //});
                if (values[i].length) {
                    spec.value = values[i][0].id;
                }
            });
            return good;
        });
    };

    function chooseGood() {
        var me = this;
        me.waitActionDialog({
            title: '选择商品',
            width: 800,
            needFoot: true,
            url: '/good/chooser',
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
                    me.fetchSpecValues(items[0]).then(function (good){
                        me.vue.good = good;
                        dialog.dispose();
                    });
                }
                else {
                    me.alert('还未选择任何商品');
                }
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    /**
     * @inheritDoc
     */
    GoodProductAddView.prototype.uiEvents = {
        'chooseGood:click': chooseGood
    };

    GoodProductAddView.prototype.enterDocument = function () {
        FormView.prototype.enterDocument.apply(this, arguments);
        var me = this;
        if (me.model.get('good_id')) {
            me.fetchSpecValues(me.model.get('good')).then(function (good){
                me.vue.good = good;
            });
        }
    };

    require('er/util').inherits(GoodProductAddView, FormView);
    return GoodProductAddView;
});
