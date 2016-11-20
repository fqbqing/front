/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./values.tpl.html');

    var BaseView = require('bat-ria/mvc/BaseView');
    var u = require('underscore');

    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function GoodSpecificationValuesView() {
        BaseView.apply(this, arguments);
    }

    GoodSpecificationValuesView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    GoodSpecificationValuesView.prototype.template = 'TPL_good_specification_values';

    /**
     * @inheritDoc
     */
    GoodSpecificationValuesView.prototype.uiProperties = {

    };

    GoodSpecificationValuesView.prototype.getVueOptions = function () {
        var me = this;
        return {
            methods: {
                deleteSpecValue: u.bind(deleteSpecValue, me),
                updateSpecValue: u.bind(updateSpecValue, me)
            }
        };
    };

    /**
     * 删除取值
     *
     * @param {Object} item 待删除取值
     */
    function deleteSpecValue(item) {
        var vm = this.vue;
        var me = this;
        me.waitConfirm('确定要删除取值(' + item.name + ')吗?').then(function () {
            me.model.deleteSpecValue(item.id).then(function () {
                for (var i = 0; i < vm.specValues.length; i++) {
                    var tmp = vm.specValues[i];
                    if (tmp.id === item.id) {
                        vm.specValues.splice(i, 1);
                        break;
                    }
                }
            });
        });
    }

    /**
     * 更新取值
     */
    function updateSpecValue(item) {
        var me = this;
        if (item.name.length === 0) {
            return;
        }
        me.model.updateSpecValue({
            id: item.id,
            name: item.name,
            extra: item.extra
        }).then(function () {
            item.editing = false;
        });
    }

    /**
     * 创建新取值
     */
    function addSpecValue() {
        var vue = this.vue;
        var form = this.get('form');
        var data = form.getData();
        data.id = this.model.get('id');
        this.model.addSpecValue(data).then(function (ret) {
            vue.specValues.push({
                id: ret.id,
                name: data.name,
                extra: data.extra,
                editing: false
            });
            form.main.reset();
        });
    }
    /**
     * @inheritDoc
     */
    GoodSpecificationValuesView.prototype.uiEvents = {
        'form:submit': addSpecValue
    };

    require('er/util').inherits(GoodSpecificationValuesView, BaseView);
    return GoodSpecificationValuesView;
});
