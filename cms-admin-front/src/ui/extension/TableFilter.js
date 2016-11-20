/**
 * 主要满足表格内条件过滤的需求，一般需求用搜索可以支持，
 * 但是一些枚举值让用户输入就不友好了，例如 状态
 *
 * @file table row filter
 * @author 张浩(zhanghao25@baidu.com)
 */

define(
    function (rquire) {
        var Extension = require('esui/Extension');
        var lib = require('esui/lib');
        var main = require('esui/main');
        var Table = require('esui/Table');
        var u = require('underscore');
        var etpl = rquire('etpl');


        function TableFilter() {
            Extension.apply(this, arguments);
        }

        /**
         * 指定扩展类型，始终为`"TableFilter"`
         *
         * @type {string}
         */
        TableFilter.prototype.type = 'TableFilter';


        var domTpl = [
            '<div class="${prefix}-filter-panel" data-index="${fieldIndex}">',
                '<label class="${prefix}-filter-head iconfont icon-downarrow">',
                '</label>',
                '<div class="${prefix}-filter-select">',
                    '<ul>',
                        '<!-- for: ${datasource} as ${item} -->',
                            '<li class="${item.style}" data-index="${fieldIndex}" data-value="${item.value}">',
                                '${item.name}',
                            '</li>',
                        '<!-- /for -->',
                    '</ul>',
                '</div>',
            '</div>'
        ];


        function getPanelDom(table, fieldIndex) {
            var head = getHeadDom(table);
            var panelDoms = head.querySelectorAll('.' + table.helper.getPrimaryClassName('filter-panel'));

            if (fieldIndex) {
                return u.find(panelDoms, function (dom) {
                    return lib.getAttribute(dom, 'data-index') - fieldIndex === 0;
                });
            }

            return panelDoms;
        }


        function getHeadDom(table) {
            return lib.g(table.getId('head'));
        }


        function showFilter(event) {
            var dom = event.currentTarget.querySelector('.' + this.helper.getPrimaryClassName('filter-select'));

            dom.style.visibility = 'visible';
        }


        function hideFilter(event) {
            var dom = event.target.querySelector('.' + this.helper.getPrimaryClassName('filter-select'));

            dom.style.visibility = '';
        }


        function selectItem(table, selectedItem) {
            var panelDom = getPanelDom(table, selectedItem.fieldIndex);

            // 隐藏panel下面筛选列表
            hideFilter.call(table, {target: panelDom});
            // 激活选中的项
            renderSelectedItem(table, selectedItem, panelDom);
            // 通知
            table.fire('filter', selectedItem);
        }


        function renderSelectedItem(table, selectedItem, panelDom) {
            var liDoms = panelDom.querySelectorAll('.' + table.helper.getPrimaryClassName('filter-select') + ' li');

            u.each(liDoms, function (li) {

                if (lib.getAttribute(li, 'data-value') === selectedItem.value) {
                    lib.addClass(li, 'active');
                }
                else {
                    lib.removeClass(li, 'active');
                }
            });
        }


        function init(e) {
            var me = this;
            var table = me.target;

            u.each(getPanelDom(table), function (dom) {
                lib.on(dom, 'click', u.bind(showFilter, table));
                lib.on(dom, 'mouseleave', u.bind(hideFilter, table));
            });

            var liDom = getHeadDom(table).querySelectorAll('li');

            u.each(liDom, function (li) {
                lib.on(li, 'click', function (event) {
                    var value = lib.getAttribute(event.target, 'data-value');
                    var fieldIndex = lib.getAttribute(event.target, 'data-index');

                    setFilterValue.call(table, fieldIndex, value);
                    event.stopPropagation();
                });
            });
        }


        function getFilterRawValue(fieldIndex) {
            var panelDom = getPanelDom(this, fieldIndex);
            var activeDom = panelDom.querySelector('li.active');

            return activeDom && {
                name: lib.getText(activeDom),
                value: lib.getAttribute(activeDom, 'data-value'),
                fieldIndex: lib.getAttribute(activeDom, 'data-index'),
                style: activeDom.className
            };
        }


        function getFilterValue(fieldIndex) {

            var selectedItem = getFilterRawValue.call(this, fieldIndex);

            return selectedItem && selectedItem.value;
        }


        function setFilterValue(fieldIndex, value) {

            if (getFilterValue.call(this, fieldIndex) === value) {
                return;
            }

            var selectedItem = u.find(this.fields[fieldIndex].filter.datasource, function (item) {
                return item.value === value;
            });

            if (!selectedItem) {
                return;
            }

            u.extend(selectedItem, {
                fieldIndex: fieldIndex
            });

            selectItem(this, selectedItem);
        }

        /**
         * 激活扩展
         *
         * @override
         */
        TableFilter.prototype.activate = function () {
            var target = this.target;

            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            // 保存一个备份，绘制完表头再用这个值重置，避免刷新时重新注入
            target.rawField = u.deepClone(target.fields);

            target.fields = u.map(target.rawField, function (field, fieldIndex) {
                // body...
                if (field.filter) {
                    u.each(field.filter.datasource, function (item) {
                        if (item.value === field.filter.value) {
                            item.style += ' active';
                        }
                    });

                    field.title += etpl.compile(domTpl.join(''))({
                        prefix: target.helper.getPrimaryClassName(),
                        datasource: field.filter.datasource || [],
                        fieldIndex: fieldIndex
                    });

                    field.minWidth = field.minWidth || 200;
                }

                return field;
            });

            // bind event
            target.on('afterrender', u.bind(init, this));

            // add class
            target.helper.addPartClasses('filter');

            // extern table function
            target.getFilterRawValue = getFilterRawValue;
            target.getFilterValue = getFilterValue;
            target.setFilterValue = setFilterValue;

            Extension.prototype.activate.apply(this, arguments);
        };

        /**
         * 取消扩展的激活状态
         *
         * @override
         */
        TableFilter.prototype.inactivate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            u.each(getPanelDom(target), function (dom) {
                lib.un(dom, 'click');
                lib.un(dom, 'mouseleave');
            });

            var liDom = getHeadDom(target).querySelectorAll('li');

            u.each(liDom, function (li) {
                lib.un(li, 'click');
            });

            Extension.prototype.inactivate.apply(this, arguments);
        };


        lib.inherits(TableFilter, Extension);
        main.registerExtension(TableFilter);

        return TableFilter;
    }
);
