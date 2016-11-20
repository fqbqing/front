/**
 * Created by lifayu on 16/5/12.
 */

define(function (require) {

    var Vue = require('vue');
    var u = require('underscore');

    function indexOf(list, target) {
        var idx = -1;
        u.find(list, function (item, i) {
            if (target == item) {
                idx = i;
                return true;
            }
        });
        return idx;
    }

    var Brand = Vue.extend({
        replace: true,
        template: ''
            + '<div class="ui-vue-brand">'
            + '<ul class="ui-vue-brand-letter">'
            + '  <li v-for="item in datasource">'
            + '    <a href="javascript:void(0);" @click="changeLetter(item)" v-text="item.letter"></a>'
            + '  </li>'
            + '</ul>'
            + '<ul class="ui-vue-brand-item" v-for="it in datasource" v-show="it.selected">'
            + '    <li v-for="brand in it.brands" @click="changeBrand(brand)" :class="{active:brand.selected}"><span v-text="brand.name"></span></li>'
            + '</ul>'
            + '</div>',
        props: {
            mode: {
                type: String,
                default: function () {
                    return 'multi'; // single
                }
            },
            // 初始化id列表，该列表中的数据会被默认选中
            initialData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            datasource: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        created: function () {
            var vm = this;
            u.each(this.datasource, function (item, i) {
                Vue.set(item, 'selected', i === 0);
                u.each(item.brands, function (brand, j) {
                    Vue.set(brand, 'selected', indexOf(vm.initialData, brand.id) !== -1);
                });
            });
        },
        methods: {
            changeLetter: function (item) {
                var vm = this;
                u.each(this.datasource, function (it, i) {
                    it.selected = it.letter === item.letter;
                });
                vm.$dispatch('letterchange', item.letter);
            },
            changeBrand: function (brand) {
                var vm = this;
                if (vm.mode === 'multi') {
                    brand.selected = !brand.selected;
                }
                else {
                    u.each(vm.datasource, function (item, i) {
                        u.each(item.brands, function (b, j) {
                            b.selectd = false;
                        });
                    });
                    brand.selected = true;
                }
                vm.$dispatch('brandchange', brand);
            },
            /**
             * 获取选中的品牌列表
             * @return {Array}
             */
            getSelectedBrands: function () {
                var vm = this;
                var ret = [];
                u.each(vm.datasource, function (item, i) {
                    u.each(item.brands, function (b, j) {
                        if (b.selected) {
                            ret.push(b);
                        }
                    });
                });
                return ret;
            }
        }
    });

    Vue.component('brand', Brand);

    return Brand;
});
