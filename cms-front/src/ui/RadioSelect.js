/**
 * @file RadioSelect控件
 * @author Yijun Deng(dengyijun@baidu.com)
 */

define(function (require) {
    var u = require('underscore');
    var lib = require('esui/lib');
    var paint = require('esui/painters');
    var Control = require('esui/InputControl');
    var helper = require('esui/controlHelper');

    /**
     * RadioSelect控件
     *
     * @extends InputControl
     * @constructor
     * @param {Object} options options
     */
    function RadioSelect(options) {
        Control.apply(this, arguments);
    }

    /**
     * 控件类型，始终为`"RadioSelect"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    RadioSelect.prototype.type = 'RadioSelect';

    /**
     * baseclass，选中时的class，html模板
     *
     * @type {String}
     * @const
     */
    var CLAZZ = 'ui-radio-block';
    var CLASS_ITEM_HOVER = 'ui-radio-item-hover';
    var CLAZZ_SELECTED = 'ui-radio-selected';
    var CLAZZ_DISABLED = 'ui-radio-disabled';
    var TPL = '<li class="${baseClass} ${selectedClass} ${disabledClass} ${itemClass}"'
        + 'data-index="${index}" style="display:${display}">${name}</li>';

    var TPL_HOVER = '<li class="${baseClass} ${selectedClass} ${disabledClass} ${itemClass}"'
        + 'data-index="${index}" style="display:${display}">'
        + '<div class="${baseItemHoverClass} ${itemHoverClass}">${content}</div>'
        + '<div class="arrow-down" ><i></i></div>'
        + '${name}</li>';

    function getMainHTML(me) {
        var html = [];
        for (var i = 0; i < me.datasource.length; i++) {
            var item = me.datasource[i];
            var isSel = me.selectedIndex === i;
            var isShow = i >= me.startShow && i < me.startShow + me.showNum;

            if (item.hoverContent) {
                html.push(lib.format(TPL_HOVER, {
                    baseClass: CLAZZ,
                    selectedClass: isSel ? CLAZZ_SELECTED : '',
                    disabledClass: me.disabled || item.disabled ? CLAZZ_DISABLED : '',
                    itemClass: 'ui-radio-index' + i,
                    index: i,
                    name: me.unit ? item + me.unit : (item.name || item.text),
                    display: isShow ? 'block' : 'none',
                    baseItemHoverClass: CLASS_ITEM_HOVER,
                    itemHoverClass: CLASS_ITEM_HOVER + 'index' + i,
                    content: item.hoverContent
                }));
            }
            else {
                html.push(lib.format(TPL, {
                    baseClass: CLAZZ,
                    selectedClass: isSel ? CLAZZ_SELECTED : '',
                    disabledClass: me.disabled || item.disabled ? CLAZZ_DISABLED : '',
                    itemClass: 'ui-radio-index' + i,
                    index: i,
                    name: me.unit ? item + me.unit : (item.name || item.text),
                    display: isShow ? 'block' : 'none'
                }));
            }
        }
        return '<ul>' + html.join('') + '</ul>';
    }

    RadioSelect.prototype.initStructure = function () {
        this.main.innerHTML = '<ul>' + getMainHTML(this) + '</ul>';
        this.initChildren(this.main);
    };

    /**
     * 初始化参数
     *
     * @param {Object} options 构造函数传入的参数
     * @protected
     * @override
     */
    RadioSelect.prototype.initOptions = function (options) {
        var properties = {
            selectedIndex: 0,
            startShow    : 0,
            disabled      : 0
        };
        u.extend(properties, options);

        if (typeof properties.showNum === 'undefined') {
            properties.showNum = properties.datasource.length;
        }

        if (properties.value != null) {
            for (var i = 0; i < properties.datasource.length; i++) {
                var item = properties.datasource[i];
                if (item.value === properties.value) {
                    properties.selectedIndex = i;
                    break;
                }
            }
        }

        this.setProperties(properties);
    };

    /**
     * 取datasource第index项（或者选中项，无参数）
     *
     * @param {number=} index index
     * @return {Object}
     */
    RadioSelect.prototype.getItem = function (index) {
        return this.datasource[index || this.selectedIndex];
    };

    /**
     * 当前选中值
     *
     * @return {Object|string}
     */
    RadioSelect.prototype.getValue = function () {
        var item = this.getItem();
        return this.unit ? item : item.value;
    };

    /**
     * 获取值
     *
     * @override
     */
    RadioSelect.prototype.getRawValue = RadioSelect.prototype.getValue;

    /**
     * 设置选中项
     *
     * @param {number} index index
     * @param {Object} options options
     */
    RadioSelect.prototype.setSelectedIndex = function (index, options) {
        this.setProperties({selectedIndex: index});
        if (!this.isDisabled()) {
            this.fire('change', u.extend({
                index: index, item: this.getItem()
            }, options));
        }

    };

    /**
     * 根据指定值设置选中项
     *
     * @param {number|string|boolean} newValue 新的值
     * @param {Object} options options from setSelectedIndex
     */
    RadioSelect.prototype.setValue = function (newValue, options) {
        // find its index then set
        // 当前的 underscore 还没有 findIndex……
        var foundIndex = -1;
        u.find(this.datasource, function (item, index) {
            if (item.value === newValue) {
                foundIndex = index;
                return true;
            }
        });
        // 只有找到了才会去修改
        if (foundIndex > -1) {
            this.setSelectedIndex(foundIndex, options);
            Control.prototype.setValue.apply(this, arguments);
        }
    };

    /**
     * 点击事件
     *
     * @param {Event} e 触发事件的事件对象
     */
    function clickHandler(e) {
        var tar = e.target || e.srcElement;
        var index = parseInt(lib.getAttribute(tar, 'data-index'), 10);
        /* eslint-disabled*/
        if (true == this.datasource[index].disabled) {
            return;
        }
        /* eslint-enable*/
        if (index !== this.selectedIndex) {
            this.setSelectedIndex(index);
        }
    }

    RadioSelect.prototype.initEvents = function () {
        if (!this.disabled) {
            helper.addDOMEvent(this, this.main, 'click', clickHandler);
        }
    };

    /**
     * 设置从哪个radio开始，从而隐藏之前的和没有轮到的radio，顺便长度保护
     *
     * @param {number} start start
     * @return {boolean} 是否成功激发change事件
     */
    RadioSelect.prototype.setStartShow = function (start) {
        start = start < 0 ? 0 : start;
        var index = this.selectedIndex;
        if (index < start) {
            index = start;
        }
        else if (index >= start + this.showNum) {
            index = start + this.showNum - 1;
        }
        else {
            this.setProperties({startShow: start});
            return false;
        }

        this.setProperties({
            selectedIndex: index, startShow: start
        });
        this.fire('change', {
            index: index, item: this.getItem()
        });
        return true;
    };

    RadioSelect.prototype.repaint = paint.createRepaint(
        Control.prototype.repaint,
        {
            name : ['datasource', 'startShow', 'selectedIndex', 'showNum'],
            paint: function (me, datasource, startShow, selectedIndex, showNum) {
                me.selectedIndex = +selectedIndex;
                me.main.innerHTML = getMainHTML(me);
            }
        }
    );

    RadioSelect.prototype.updateDatasource = function (datasource) {
        if (!datasource) {
            datasource = this.datasource;
        }
        this.datasource = datasource;
        this.repaint();
    };

    lib.inherits(RadioSelect, Control);
    require('esui').register(RadioSelect);
    return RadioSelect;
});
